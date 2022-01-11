import { index, modelOptions, plugin, prop } from '@typegoose/typegoose';
import { BaseModel, BaseWithCreatorAndTimestamp } from '../base';

const mongooseHidden = require('mongoose-hidden')();

@index({ unique: true })
@plugin(mongooseHidden)
@modelOptions({ schemaOptions: { collection: 'breeds' } })
export class IMAGE {
  @prop({})
  height: number;
  @prop({})
  id: string;
  @prop({})
  url: string;
  @prop({})
  width: number;
}

export class WEIGHT {
  @prop({})
  imperial: string;
  @prop({})
  metric: string;
}

export class Breeds extends BaseWithCreatorAndTimestamp {
  @prop({})
  adaptability: number;
  @prop({})
  affection_level: number;
  @prop({})
  alt_names: string;
  @prop({})
  child_friendly: number;
  @prop({})
  country_code: string;
  @prop({})
  country_codes: string;
  @prop({})
  description: string;
  @prop({})
  dog_friendly: number;
  @prop({})
  energy_level: number;
  @prop({})
  experimental: number;
  @prop({})
  grooming: number;
  @prop({})
  hairless: number;
  @prop({})
  health_issues: number;
  @prop({})
  hypoallergenic: number;
  @prop({})
  id: string;
  @prop({ type: IMAGE, _id: false, readonly: true })
  image?: IMAGE;
  @prop({})
  indoor: number;
  @prop({})
  intelligence: number;
  @prop({})
  life_span: string;
  @prop({})
  name: string;
  @prop({})
  natural: number;
  @prop({})
  origin: string;
  @prop({})
  rare: number;
  @prop({})
  reference_image_id: string;
  @prop({})
  rex: number;
  @prop({})
  shedding_level: number;
  @prop({})
  short_legs: number;
  @prop({})
  social_needs: number;
  @prop({})
  stranger_friendly: number;
  @prop({})
  suppressed_tail: number;
  @prop({})
  temperament: string;
  @prop({})
  vetstreet_url: string;
  @prop({})
  vocalisation: number;
  @prop({ type: WEIGHT, _id: false, readonly: true })
  weight?: WEIGHT;
  @prop({})
  wikipedia_url: string;
}
