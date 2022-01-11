import { index, modelOptions, plugin, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { BaseModel, BaseWithCreatorAndTimestamp } from '../base';

const mongooseHidden = require('mongoose-hidden')();

export class TwoFactorAuth {
  @prop()
  enabled?: boolean;
  @prop()
  secret: string;
}

export enum LANGUAGE {
  EN = 'en',
  CN = 'cn'
}

export enum CURRENCY {
  USD = 'usd',
  CNY = 'cny'
}

@index({ unique: true })
@plugin(mongooseHidden)
@modelOptions({ schemaOptions: { collection: 'users' } })
export class User extends BaseWithCreatorAndTimestamp {
  @prop({ required: true, maxlength: 100 })
  walletId: string;
  @prop({ maxlength: 100 })
  email?: string;
  @prop({ maxlength: 50 })
  name?: string;
  @prop({ readonly: true })
  avatar?: string;
  @prop()
  verified?: boolean;
  @prop({ maxlength: 64 })
  verificationToken?: string;

  @prop({
    enum: LANGUAGE,
    type: String,
    required: false,
    default: LANGUAGE.EN
  })
  language?: LANGUAGE;

  @prop({
    enum: CURRENCY,
    type: String,
    required: false,
    default: CURRENCY.USD
  })
  currency?: CURRENCY;
  @prop()
  steam?: Steam[];
}

export class Token extends BaseModel {
  @prop({ required: true })
  userId: ObjectId | string;

  @prop({ required: true })
  token: string;

  @prop({ default: Date.now })
  when: number;
}

export class Steam {
  @prop({})
  steamId: string;
  @prop({})
  steamTradeLink?: string;
}
