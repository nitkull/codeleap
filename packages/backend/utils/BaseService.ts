import { Context, FileType, UploadResponse } from '@app/types';
import { Service } from 'moleculer';

export class BaseService extends Service {
  clean: () => void;

  entityChanged: (type: string, json: any, ctx: Context) => Promise<any>;

  clearCache: () => Promise<any>;

  forceCleanCache: (keys: string[] | string) => void;

  delCache: (keys: string[] | string) => void;

  nextval: (seqNm: string) => number;

  encodeHex: (entityId: number) => string;

  decodeHex: (code: string) => number;

  invalidateGraphQLSchema: () => void;

  uploadFile: (
    ctx: Context<any>,
    type: FileType,
    toDir?: string,
    permission?: 'private' | 'public-read'
  ) => Promise<UploadResponse>;
}
