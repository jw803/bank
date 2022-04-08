import * as Types from './constants.js'
import * as SmartBusError from './index.js'

const errorFactory = (type) => {
  switch (type) {
    case Types.FORBIDDEN:
      return new SmartBusError.ForbiddenError()
    case Types.WRONGEMAIL:
      return new SmartBusError.WrongEmailForOTPError()
    case Types.OTPALREADYUSED:
      return new SmartBusError.OTPAlreadyUsedError()
    case Types.OTPEXPIRED:
      return new SmartBusError.OTPExpiredError()
    case Types.OTPERROR:
      return new SmartBusError.OTPError()
    case Types.USERNOTEXIST:
      return new SmartBusError.UserNotExistError()
    case Types.AGREEMENTNOTSIGNED:
      return new SmartBusError.AgreementNotSignError()
    default:
      break;
  }
}

export default errorFactory