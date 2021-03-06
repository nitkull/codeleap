import { Context } from '@app/types';
import pick from 'lodash.pick';
import { User } from 'models';
import ApiService from 'moleculer-web';
import { ROLE_EVERYONE, SERVICE_AUTH } from 'utils/constants';

const { UnAuthorizedError, ERR_INVALID_TOKEN } = ApiService.Errors;
interface ClientRequest {
  originalUrl: string;
  method: string;
  headers: any;
}
/**
 * Authenticate the request
 *
 * @param {Context} ctx
 * @param {Object} route
 * @param {IncomingRequest} req
 * @returns {Promise}
 */
export async function authenticate(ctx: Context, _: any, req: ClientRequest) {
  let token;

  // Get JWT token from Authorization header
  if (!token) {
    const auth = req.headers['authorization'];
    if (auth && auth.startsWith('Bearer ')) token = auth.slice(7);
  }

  ctx.meta.roles = [ROLE_EVERYONE];
  let user!: User;

  if (token) {
    user = await ctx.call(`v1.${SERVICE_AUTH}.resolveToken`, { token });
    if (user) {
      this.logger.info('User authenticated via JWT.', {
        id: user._id
      });

      ctx.meta.user = pick(user, ['walletId']) as User;
      ctx.meta.token = token;
      ctx.meta.tenantId = `1`; // temporary fixed
      return ctx.meta.user;
    }
    return undefined;
  }
  return Promise.reject(new UnAuthorizedError(ERR_INVALID_TOKEN, { token }));
}
