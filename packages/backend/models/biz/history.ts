import { index, modelOptions, plugin, prop } from '@typegoose/typegoose';
import { double, float } from 'aws-sdk/clients/lightsail';
import { ObjectId } from 'mongodb';
import {
  BaseModel,
  BaseWithCreatorAndTimestamp,
  BaseWithTimestamp
} from '../base';

const mongooseHidden = require('mongoose-hidden')();

export enum HISTORY_STATUS {
  SUCCESS = 'success',
  FAIL = 'fail'
}

export enum HISTORY_TYPE {
  TRADE_BOT = 'trade_bot',
  ISSUE_NFT = 'issue_nft',
  STAKE = 'stake'
}
@index({ unique: true })
@plugin(mongooseHidden)
@modelOptions({ schemaOptions: { collection: 'history' } })
export class History extends BaseWithTimestamp {
  @prop({ type: ObjectId, required: true })
  ItemId: ObjectId | string;

  @prop({
    enum: HISTORY_STATUS,
    type: String,
    required: false,
    default: HISTORY_STATUS.FAIL
  })
  status?: HISTORY_STATUS;

  @prop({
    enum: HISTORY_TYPE,
    type: String,
    required: true
  })
  type?: HISTORY_TYPE;

  @prop({ maxlength: 50 })
  assetId: string;

  @prop({ maxlength: 50 })
  classId: string;

  @prop({ maxlength: 50 })
  color: string;

  @prop({ maxlength: 50 })
  instanceId: string;

  @prop({})
  amount: double;

  @prop({})
  rate: float;

  @prop({ maxlength: 100 })
  txId: string;
}
