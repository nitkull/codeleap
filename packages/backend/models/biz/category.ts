import { index, modelOptions, plugin, prop } from '@typegoose/typegoose';
import { BaseModel, BaseWithCreatorAndTimestamp } from '../base';

const mongooseHidden = require('mongoose-hidden')();

@index({ unique: true })
@plugin(mongooseHidden)
@modelOptions({ schemaOptions: { collection: 'category' } })
export class Category extends BaseWithCreatorAndTimestamp {
  @prop({ maxlength: 100 })
  categoryId?: string;
  @prop({ maxlength: 100 })
  name?: string;
  @prop({ maxlength: 100 })
  code: string;
  @prop({ maxlength: 100 })
  parentCode: string;
  @prop({ maxlength: 100 })
  platfrom: string;
}
