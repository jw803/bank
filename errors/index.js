export default class SmartBusError extends Error {
    constructor(message) {
        let errMessage
        if (message instanceof Object) {
            errMessage = JSON.stringify(message, null, 4)
        } else {
            errMessage = message
        }
        super(errMessage)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ForbiddenError extends SmartBusError {
    httpStatus = 403;
    constructor(message = '未經過OTP驗證，不得更動密碼') {
        super(message)
    }
}

export class WrongEmailForOTPError extends SmartBusError {
    httpStatus = 200;
    constructor(message = '電子信箱地址與OTP的資訊不符') {
        super(message)
    }
}

export class OTPAlreadyUsedError extends SmartBusError {
    httpStatus = 200;
    constructor(message = 'OTP已被重複認證') {
        super(message)
    }
}

export class OTPExpiredError extends SmartBusError {
    httpStatus = 200;
    constructor(message = 'OTP已過期') {
        super(message)
    }
}

export class OTPError extends SmartBusError {
    httpStatus = 200;
    constructor(message = '錯誤的OTP') {
        super(message)
    }
}

export class UserNotExistError extends SmartBusError {
    httpStatus = 200;
    constructor(message = '使用者帳號或密碼錯誤') {
        super(message)
    }
}

export class FirstLoginError extends SmartBusError {
    httpStatus = 200;
    constructor(message = '第一次登入，請重設密碼') {
        super(message)
    }
}

export class AgreementNotSignError extends SmartBusError {
    httpStatus = 200;
    constructor(message = '未簽署同意書') {
        super(message)
    }
}

export class LackOfBalanceError extends SmartBusError {
    httpStatus = 200;
    constructor(message = '餘額不足') {
        super(message)
    }
}

