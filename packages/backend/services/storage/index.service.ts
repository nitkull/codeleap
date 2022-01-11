import { File, ServiceMetadata, UploadServiceMetadata } from '@app/types';
import { DocumentType } from '@typegoose/typegoose';
import { assertImages, renameFileName } from 'core/utils/storage';
import FileType from 'file-type';
import { CacheCleaner } from 'mixins/cache.cleaner.mixin';
import { ConfigMixin } from 'mixins/config.mixin';
import { MongooseMixin, MongooseServiceSchema } from 'mixins/mongoose.mixin';
import { StorageMixin } from 'mixins/storage.mixin';
import { AWSS3, ExtraPutParams } from 'mixins/storage/S3.driver';
import { FileUpload } from 'models/biz/upload';
import { Context } from 'moleculer';
import { Action, Service } from 'moleculer-decorators';
import { Readable } from 'stream';
import { BaseService } from 'utils/BaseService';
import { ROLE_ADMIN, SERVICE_AUTH, SERVICE_STORAGE } from 'utils/constants';
import disks from './config';

const { STORAGE_CDN } = process.env;

interface StorageService
  extends BaseService,
    MongooseServiceSchema<FileUpload> {}

type AssertFunc = (file: File) => boolean | Promise<any>;

@Service({
  name: `v1.${SERVICE_STORAGE}`,
  mixins: [
    MongooseMixin(FileUpload) as any,
    CacheCleaner([`cache.clean.${SERVICE_STORAGE}`]),
    ConfigMixin(['site.**', 'users.**']),
    StorageMixin(false) as any
  ],
  settings: {
    defaultStorage: 'dos3',
    storageConfig: {
      default: 'dos3',
      disks: {
        dos3: disks.disks.spaces
      }
    },
    rest: true,
    idField: '_id'
  },
  actions: {
    create: false,
    update: false
  }
})
class StorageService extends BaseService {
  private storage!: AWSS3;

  async saveFile(
    ctx: Context<any, UploadServiceMetadata>,
    assertFunc?: AssertFunc
  ): Promise<DocumentType<FileUpload>> {
    const { userId } = ctx.meta;
    const { filename, mimetype, encoding } = ctx.meta as any;
    const fileTypeStream = await FileType.stream(ctx.params as Readable);

    if (assertFunc) {
      const asserted = assertFunc({
        filename,
        encoding,
        mimetype: fileTypeStream.fileType?.mime || mimetype
      });
      if (asserted !== true) return asserted;
    }

    const params: ExtraPutParams = {
      ACL: 'public-read',
      ContentType: mimetype
    };
    const hashedUsrId: string = await this.broker.call(
      `v1.${SERVICE_AUTH}.hash`,
      {
        key: `${userId}`
      }
    );
    const fileNameUpload = `${hashedUsrId}-${renameFileName(filename)}`;
    const res: any = await this.storage.put(
      fileNameUpload,
      fileTypeStream,
      params
    );
    let filePath = '';
    if (res.raw.key) {
      filePath = STORAGE_CDN.concat(`/${res.raw.key}`);
    } else {
      filePath = STORAGE_CDN.concat(`/${res.raw.Key}`);
    }
    return this.adapter.insert({
      fileName: filename,
      url: filePath,
      type: mimetype,
      createBy: ctx.meta.userId,
      updateBy: ctx.meta.userId
    });
  }

  @Action()
  async actUpload(ctx: Context<any, UploadServiceMetadata>) {
    return this.saveFile(ctx, assertImages);
  }

  @Action({
    params: { code: 'string' },
    rest: 'GET /code/:code'
  })
  async findByCode(
    ctx: Context<{ code: string }, ServiceMetadata>
  ): Promise<FileUpload> {
    if (!ctx.params.code) return null;
    return this.adapter.findOne({ code: ctx.params.code });
  }

  @Action({
    params: { id: 'string' },
    rest: 'POST /id:id'
  })
  async removeById(
    ctx: Context<{ id: string }, ServiceMetadata>
  ): Promise<FileUpload> {
    if (!ctx.params.id) return null;
    return this.adapter.removeById({ _id: ctx.params.id });
  }

  @Action({
    rest: 'GET /'
  })
  async list(ctx: Context<any, ServiceMetadata>) {
    const params = this.sanitizeParams(ctx, ctx.params);
    const { query = {} } = params;
    params.query = query;
    return this._list(ctx, params);
  }
}

export = StorageService;
