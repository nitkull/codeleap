
import { index, modelOptions, plugin, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { BaseModel, BaseWithCreatorAndTimestamp } from '../base';

const mongooseHidden = require('mongoose-hidden')();

@index({ unique: true })
@plugin(mongooseHidden)
@modelOptions({ schemaOptions: { collection: 'developers' } })
export class Developer extends BaseWithCreatorAndTimestamp {
  @prop({ required: true, maxlength: 100 })
  password: string;
  @prop({ required: true, maxlength: 100 })
  email: string;
  @prop({ required: true, maxlength: 100 })
  avatar: string;
  @prop({})
  disable: boolean;
  @prop()
  verified?: boolean;
  @prop({ maxlength: 64 })
  verificationToken?: string;
  @prop({})
  enableTFA?: boolean;
  @prop({})
  tfaKey?: string;
}
// export class Token extends BaseModel {
//   @prop({ required: true })
//   userId: ObjectId | string;

//   @prop({ required: true })
//   token: string;

//   @prop({ default: Date.now })
//   when: number;
// }