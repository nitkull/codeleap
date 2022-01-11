import { Context, FileType, UploadResponse } from '@app/types';
import { Storage, StorageManager } from '@slynova/flydrive';
import {
  assertImages,
  assertJsonFile,
  createFilenameFromContext,
  createUploadParams,
  getFileContents
} from 'core/utils/storage';
import mkdir from 'mkdirp';
import { ServiceSchema } from 'moleculer';
import { AWSS3 } from './storage/S3.driver';

export interface IStorage {
  disk(name: string): Storage;
}
export function StorageMixin(createRoot: boolean = false): ServiceSchema {
  const serviceSchema: ServiceSchema = {
    name: 'storage',
    settings: {
      STORAGE_ROOT: './upload',
      storageConfig: {}
    },
    actions: {},
    methods: {
      /**
       *
       * Get a disk storage
       *
       * @param {String} name - the disk name
       *
       * @Returns {Object} - A storage instance with the associated driver
       */
      disk(name): Storage {
        return name ? this.storage.disk(name) : this.storage.disk();
      },
      // /**
      //  * Add new Driver
      //  *
      //  * @param {String} name - The driver name
      //  * @param {Object|function} driver - driver contructor function
      //  * @param {Object?} config - Thre configuration to use for the driver construction function
      //  *
      //  * @Returns {Void}
      //  */
      // extends(name, driver) {
      //   this.storage.extend(name, driver);
      // }
      async uploadFile(
        ctx: Context<any>,
        type: FileType,
        toDir: string = 'files',
        permission: 'private' | 'public-read'
      ): Promise<UploadResponse> {
        const { $fileInfo } = ctx.meta;
        // 01. Get File contents
        const fileData = await getFileContents(ctx);
        // 02. Make sure the file is allowed
        switch (type) {
          case 'image':
            await assertImages($fileInfo);
            break;
          case 'geojson':
            await assertJsonFile($fileInfo);
            break;
          default:
            break;
        }
        // 03. Create file name
        const fileName = await createFilenameFromContext(ctx);
        // 04. Create Params
        const params = createUploadParams($fileInfo.mimetype, permission);
        // 04. Upload file
        const uploaded: any = await this.storage.put(
          `${toDir}/${fileName}`,
          fileData,
          params
        );
        const { STORAGE_CDN } = process.env;
        if (STORAGE_CDN) {
          const cdn = STORAGE_CDN.replace(/\/$/, '');
          uploaded.raw.Location = `${cdn}/${uploaded.raw.Key}`;
        }
        return {
          file: $fileInfo,
          ...uploaded
        };
      }
    },
    async created() {
      // Create data folder
      this.settings.STORAGE_ROOT = this.settings.STORAGE_ROOT || '';
      this.settings.STORAGE_ROOT = this.settings.STORAGE_ROOT.replace(
        /(\/$)|(\\$)/,
        ''
      );
      if (!this.settings.storageConfig) {
        this.settings.storageConfig = {
          default: 'local',
          disks: {
            local: {
              driver: 'local',
              root: this.settings.STORAGE_ROOT
            }
          }
        };
      }
      this.settings.storageConfig.disks = Object.assign(
        {
          local: {
            driver: 'local',
            root: this.settings.STORAGE_ROOT
          }
        },
        this.settings.storageConfig.disks
      );
      this.settings.storageConfig.disks.local = Object.assign(
        {
          driver: 'local',
          root: this.settings.STORAGE_ROOT
        },
        this.settings.storageConfig.disks.local
      );
      // if a root was already defined in config
      this.settings.STORAGE_ROOT = this.settings.storageConfig.disks.local.root;
      this.settings.storageConfig.default =
        this.settings.defaultStorage || 'local';
      this.settings.defaultStorage = this.settings.storageConfig.default;
      if (createRoot) {
        mkdir.sync(this.settings.STORAGE_ROOT);
      }
      const storage = new StorageManager(this.settings.storageConfig);
      // Add one more driver
      storage.extend('dos3', () => {
        return new AWSS3(this.settings.storageConfig.disks['dos3']);
      });
      this.storage = storage.disk();
      // register custom drivers definition
      this.settings.storageConfig.customDrivers = Object.assign(
        {},
        this.settings.storageConfig.customDrivers
      );
      for (const name in this.settings.storageConfig.customDrivers) {
        this.extends(name, this.settings.storageConfig.customDrivers[name]);
      }
    }
  };
  return serviceSchema;
}
