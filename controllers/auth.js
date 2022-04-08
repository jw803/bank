import ioc from "../lib/IOC.js";
import * as SERVICETYPE from "../ioc/constants.js";
import paulRes from "../lib/bankRes.js";

const service = ioc.use(SERVICETYPE.AUTH);

export const login = async (ctx, next) => {

  let { email, password } = ctx.request.body;
  const result = await service.login(email, password);
  ctx.body = result;
};


export const signAgreement = async (ctx, next) => {
  const userId = parseInt(ctx.request.params.id, 10)
  const result = await service.signAgreement(userId);
  ctx.body = paulRes.return(result);
};