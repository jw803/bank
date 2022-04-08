import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import errorFactory from '../errors/errorFactory.js'
import * as ErrorConst from '../errors/constants.js'

const algor = 'sha512'
const privateKey = 'smartbus/system/design'
const expiresTime = 60 * 60 * 2

export function encrypt(password) {
  const salt = crypto.randomBytes(32).toString('hex')
  return {
    password: crypto.pbkdf2Sync(password, salt, 100000, 64, algor).toString('hex'),
    password_salt: salt
  }
}

export function verifyPassword(data, user) {
  console.log(crypto.pbkdf2Sync(data.password, user.password_salt, 100000, 64, algor).toString('hex'));
  if (user.password !== crypto.pbkdf2Sync(data.password, user.password_salt, 100000, 64, algor).toString('hex')) {
    throw errorFactory(ErrorConst.USERNOTEXIST)
  }
}

export function createToken(id, email, agreement_signed, currency) {
  return jwt.sign({
      id,
      email,
      agreement_signed,
      currency
    }, privateKey, { expiresIn: expiresTime })
}

export function tokenVerify(token) {
  token = token.replace('Bearer ', '')
  const decoded = jwt.verify(token, privateKey)
  return decoded
}

