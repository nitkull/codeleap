import { index, modelOptions, plugin, prop } from '@typegoose/typegoose';
import { float, double } from 'aws-sdk/clients/lightsail';
import { ObjectId } from 'mongodb';
import { BaseModel, BaseWithCreatorAndTimestamp } from '../base';

const mongooseHidden = require('mongoose-hidden')();

export enum ITEM_STATUS {
  TRADE_BOT = 'deposited',
  ISSUE_NFT = 'minted',
  WITHDRAW = 'withdraw'
}

export enum TRANSACTIONS_STATUS {
  PENDING = 'pending',
  FAIL = 'fail',
  SUCCESS = 'success'
}

export class NFT {
  @prop()
  nftId?: string;
  @prop({
    enum: TRANSACTIONS_STATUS,
    type: String,
    required: false
  })
  status?: TRANSACTIONS_STATUS; // pending - fail - success
}

export class STAKE {
  @prop()
  stakeId?: string;
  @prop({
    enum: TRANSACTIONS_STATUS,
    type: String,
    required: false
  })
  status?: TRANSACTIONS_STATUS; // pending - fail - success
}
@index({ unique: true })
@modelOptions({ schemaOptions: { collection: 'items' } })
export class Item extends BaseModel {
  @prop({ required: true })
  platform?: string;

  @prop({ maxlength: 50 })
  name: string;

  @prop({ maxlength: 50 })
  platformUserId?: string;

  @prop({})
  price: double;

  @prop({ maxlength: 100 })
  rarelyName: string;

  @prop({ maxlength: 20 })
  color: string;

  @prop({})
  float: float;

  @prop({ maxlength: 300 })
  imageUrl: string;

  @prop({ required: true, maxlength: 50 })
  assetId: string;

  @prop({ required: true, maxlength: 50 })
  classId: string;

  @prop({ required: true, maxlength: 50 })
  instanceId: string;

  @prop()
  externalId: string;

  @prop({ maxlength: 50 })
  category: string;

  @prop({ maxlength: 50 })
  exterior: string;

  @prop({ maxlength: 50 })
  dNumber: string;

  @prop({ maxlength: 50 })
  rarelyColor: string;

  @prop({ maxlength: 50 })
  qualityName: string;

  @prop({ maxlength: 50 })
  type: string;

  @prop({ maxlength: 100 })
  walletId?: string;

  @prop({})
  withdrawAt: number;

  @prop({ type: NFT, _id: false, readonly: true })
  nft?: NFT;

  @prop({ type: STAKE, _id: false, readonly: true })
  stake?: STAKE;

  @prop()
  isStake?: boolean;

  @prop({
    enum: ITEM_STATUS,
    type: String,
    required: false
  })
  status?: ITEM_STATUS;

  @prop({})
  chainId: number;
}
export class ItemPrice {
  @prop()
  success?: string;
  @prop()
  lowestPrice?: string;
  @prop()
  medianPrice?: string;
}
