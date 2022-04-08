import BusServiceError from '../errors/index.js'
import bankRes from '../lib/bankRes.js';

export default async function errorHandler(ctx, next) {
  try {
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