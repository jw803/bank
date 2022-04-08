import _db_user from '../models/user.js'
import _db_OTP from '../models/OTP.js'
import _db_mutualFund from '../models/mutualFund.js'
import _db_order from '../models/order.js'
import _db_navHistory from '../models/nav_history.js'
import _db_currency_exchange from '../models/currency_exchange_rate.js'
import authService from '../services/auth.js'
import mutualFundService from '../services/mutualFund.js'
import * as Types from './constants.js'

// inject db instance to service
export default function Register(ioc) {
  ioc.bind(Types.AUTH, () => new authService(_db_user, _db_OTP))
  ioc.bind(Types.MUTUALFUND, () => new mutualFundService(_db_mutualFund, _db_user, _db_order, _db_navHistory, _db_currency_exchange))
}