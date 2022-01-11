import { ServiceMetadata } from '@app/types';
import { ConfigMixin } from 'mixins/config.mixin';
import { MongooseMixin, MongooseServiceSchema } from 'mixins/mongoose.mixin';
import { Breeds } from 'models';
import { Context } from 'moleculer';
import { Action, Service } from 'moleculer-decorators';
import { BaseService } from 'utils/BaseService';
import { SERVICE_BREEDS } from './../../utils/constants';
import { BreedsItemParams } from './validators/index.validator';

interface BreedsService extends BaseService, MongooseServiceSchema<Breeds> {}

@Service({
  name: SERVICE_BREEDS,
  version: 1,
  mixins: [MongooseMixin(Breeds) as any, ConfigMixin(['site.**', 'breeds.**'])]
})
class BreedsService extends BaseService implements BreedsService {
  @Action({
    params: BreedsItemParams,
    rest: 'GET /'
  })
  async list(ctx: Context<any, ServiceMetadata>) {
    const params = this.sanitizeParams(ctx, ctx.params);
    console.log('params:', params);
    const { query = {} } = params;
    params.query = query;
    return this._list(ctx, params);
  }

  @Action({
    params: { breed_name: { type: 'string' } },
    rest: 'GET /getBreedsByName'
  })
  async getBreedsByName(ctx: Context<{ breed_name: string }, ServiceMetadata>) {
    const { breed_name } = ctx.params;
    return await this.adapter.findOne({
      name: breed_name
    });
  }
}

export = BreedsService;
