import { Context } from '@app/types';
import { ConfigMixin } from 'mixins/config.mixin';
import { Errors } from 'moleculer';
import { Service, Action } from 'moleculer-decorators';
import { BaseService } from 'utils/BaseService';
import { SERVICE_AUTH } from 'utils/constants';
import createHashIds from 'utils/hashids';

const { MoleculerClientError } = Errors;
const name = SERVICE_AUTH;
const hashIds = createHashIds(name, 10);
@Service({
  name: SERVICE_AUTH,
  version: 1,
  settings: {},
  mixins: [ConfigMixin(['site.**', 'users.**']) as any]
})
class AuthService extends BaseService {
  @Action({
    params: { key: 'string' },
    cache: { keys: ['key'], ttl: 60 * 60 * 24 * 30 } // cache 30 days
  })
  hash(ctx: Context<{ key: string }>) {
    return hashIds.encodeHex(ctx.params.key);
  }
}

export = AuthService;
