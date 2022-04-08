import ioc from "../lib/IOC.js";
import * as SERVICETYPE from "../ioc/constants.js";
import paulRes from "../lib/bankRes.js";
import errorFactory from "../errors/errorFactory.js";
import * as errorConst from '../errors/constants.js'

const service = ioc.use(SERVICETYPE.MUTUALFUND);

export const get_mutual_list = async (ctx, next) => {
  const { currency } = ctx.request.query
  if (!ctx.user.agreement_signed) throw errorFactory(errorConst.AGREEMENTNOTSIGNED)
  const result = await service.getMutualFundList(currency);
  ctx.body = paulRes.return(result);
};

export const buyMutualFund = async(ctx, next) => {
  const { userId, mutualFundId, tradeDate, expense_usd, isAfterClosingHours } = ctx.request.body
  const result = await service.buyMutualFund(userId, mutualFundId, tradeDate, expense_usd, isAfterClosingHours);
  ctx.body = paulRes.return(result);
}