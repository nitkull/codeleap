import { index, modelOptions, plugin, prop } from '@typegoose/typegoose';
import { BaseModel, BaseWithCreatorAndTimestamp } from '../base';

const mongooseHidden = require('mongoose-hidden')();

@index({ unique: true })
@plugin(mongooseHidden)
@modelOptions({ schemaOptions: { collection: 'market-prices' } })
export class MarketPrices extends BaseWithCreatorAndTimestamp {
  @prop({ maxlength: 100 })
  name: string;
  @prop()
  avgPrice: number;
  @prop({ maxlength: 100 })
  platfrom: string;
}
