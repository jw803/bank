import moment from "moment-timezone";
import otpGenerator from "otp-generator";
import transporter, * as mailTool from "../lib/mail.js";
import errorFactory from "../errors/errorFactory.js";
import * as ErrorConst from "../errors/constants.js";
import * as auth from "../lib/auth.js";

export default class Auth {
  constructor(_db_user, _db_OTP) {
    this._db_user = _db_user;
    this._db_OTP = _db_OTP;
  }

  async login(email, password) {
    const user = await this._db_user.find(email);
    if (!user) throw errorFactory(ErrorConst.USERNOTEXIST);
    auth.verifyPassword({ email, password }, user);

    if (user.status === "inactive") throw errorFactory(ErrorConst.FORBIDDEN);

    return {
      decode: {
        id: user.id,
        email,
        agreement_signed: user.agreement_signed,
        currency: user.currency
      },
      token: auth.createToken(user.id, email, user.agreement_signed, user.currency)
    }
  }

  async signAgreement(userId) {
    await this._db_user.signAgreement(userId)
    return null
  }
}
