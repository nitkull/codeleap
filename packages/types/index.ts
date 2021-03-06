import moleculer from 'moleculer';

export type ServiceMetadata = {
  tenantId?: string;
  userId?: string;
  roles: string[];
  token: string;
  user: any;
  $fileInfo: File;
  $statusCode?: number;
  $statusMessage?: string;
  $responseType?: string;
  $responseHeaders?: Record<string, string>;
  $location?: string;
};

export type UploadServiceMetadata = ServiceMetadata & File;

export class Context<T = unknown> extends moleculer.Context<T, ServiceMetadata> {}

export interface GraphQLInput<T> {
  input: {
    [key: string]: T;
  };
}

export interface ObjectParams<T> {
  [key: string]: T;
}

export interface MenuItem {
  name: string;
  link: string;
  icon: string;
}

export type FileType = 'image' | 'video' | 'pdf' | 'json' | 'geojson';

export interface File {
  filename: string;
  encoding: string;
  mimetype: string;
}

export interface S3File {
  ETag: string;
  Location: string;
  key: string;
  Key: string;
  Bucket: string;
}

export interface UploadResponse {
  file: File;
  raw: S3File;
}

export type ClassType<T> = new (...args: any) => T;
