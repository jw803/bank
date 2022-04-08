import BusServiceError from '../errors/index.js'
import bankRes from '../lib/bankRes.js';
import { tokenVerify } from '../lib/auth.js'

export default async function authHandler(ctx, next) {
  try {
    const toekn = ctx.request.headers['authorization']
    const decode = tokenVerify(toekn)
    ctx.user = decode
    await next()
  } catch (err) {
    if (err instanceof BusServiceError) {
      // customized error
      ctx.status = err.httpStatus;
      ctx.body = bankRes.return(err.message, err.httpStatus);
    } else {
      // server internal error
      ctx.status = 500;
      ctx.body = bankRes.return(err.message, 500);
    }
  }
}