import { Context, File } from '@app/types';
import { BadRequestError } from 'core/errors';
import { ExtraPutParams } from 'mixins/storage/S3.driver';
import moment from 'moment';
import sanitize from 'sanitize-filename';
import { SERVICE_AUTH } from 'utils/constants';

export function getStorageConfig(driver: string) {
  const {
    STORAGE_ENDPOINT,
    STORAGE_ACCESS_KEY,
    STORAGE_SECRET_KEY,
    STORAGE_DEFAULT_BUCKET_NAME,
    STORAGE_REGION
  } = process.env;
  return {
    default: driver,
    disks: {
      [driver]: {
        driver,
        key: STORAGE_ACCESS_KEY,
        secret: STORAGE_SECRET_KEY,
        endpoint: STORAGE_ENDPOINT,
        bucket: STORAGE_DEFAULT_BUCKET_NAME,
        region: STORAGE_REGION
      }
    }
  };
}

export function renameFileName(filename: string): string {
  return `${moment().format('YYYYMMDDhhmmss')}-${sanitize(filename)}`;
}

export async function getFileContents(ctx: Context<any>): Promise<Buffer> {
  const fileChunks = [];
  for await (const chunk of ctx.params) {
    fileChunks.push(chunk);
  }
  return Buffer.concat(fileChunks);
}

export function assertImages(fileInfo: File) {
  const { filename, mimetype } = fileInfo;
  const legalMimetypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (!legalMimetypes.includes(mimetype)) {
    return Promise.reject(
      new BadRequestError('This file type is not supported', {
        filename,
        mimetype
      })
    );
  }
  return true;
}

export function assertJsonFile(fileInfo: File) {
  const { filename, mimetype } = fileInfo;
  const legalMimetypes = ['application/octet-stream'];
  if (!legalMimetypes.includes(mimetype)) {
    return Promise.reject(
      new BadRequestError('This file type is not supported', {
        filename,
        mimetype
      })
    );
  }
  return true;
}

export function assertExcel(fileInfo: File) {
  const { filename, mimetype } = fileInfo;
  const legalMimetypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  if (!legalMimetypes.includes(mimetype)) {
    return Promise.reject(
      new BadRequestError('This file type is not supported', {
        filename,
        mimetype
      })
    );
  }
  return true;
}

/**
 * Create file name from context `hasedUserId-FileName`
 *
 * @param ctx {@app/types.Context}
 */
export async function createFilenameFromContext(ctx: Context<any>) {
  const {
    $fileInfo: { filename },
    userId
  } = ctx.meta;
  const hashedUsrId = await ctx.call(`${SERVICE_AUTH}.hash`, {
    key: `${userId}`
  });
  return `${hashedUsrId}-${renameFileName(filename)}`;
}

export function createUploadParams(
  mimetype?: string,
  permission: 'private' | 'public-read' = 'private'
): ExtraPutParams {
  const params: ExtraPutParams = { ACL: permission };
  if (mimetype) {
    params.ContentType = mimetype;
  }
  return params;
}
