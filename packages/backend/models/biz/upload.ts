import { index, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { ulid } from 'ulid';
import { User } from './auth';
import { BaseWithCreatorAndTimestamp, BaseWithTimestamp } from '../base';

@index({ createBy: 1 })
@modelOptions({ schemaOptions: { collection: 'fileuploads' } })
export class FileUpload extends BaseWithCreatorAndTimestamp {
  // id from API
  @prop({ required: true, readonly: true, default: ulid })
  code: string;

  @prop({ readonly: true })
  type?: string;

  @prop({ readonly: true })
  fileName?: string;

  @prop({ readonly: true })
  url?: string;

  // admin default: true
  @prop({ default: false })
  isPublic?: boolean;
}

export class TypeUploadArray {
  @prop({})
  position: string;
  @prop({})
  req?: boolean;
  @prop({})
  urlFile?: string;
}

@index({ code: 1 })
@index({ name: 1 }, { unique: true })
@modelOptions({ schemaOptions: { collection: 'typeuploads' } })
export class TypeUpload extends BaseWithCreatorAndTimestamp {
  @prop({ required: true, readonly: true, default: ulid })
  code: string;

  @prop({ required: true })
  name: string;

  @prop({ type: TypeUploadArray, _id: false })
  type: TypeUploadArray[];
}