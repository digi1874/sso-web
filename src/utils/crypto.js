import CryptoJS     from 'crypto-js'
import JSEncrypt    from 'jsencrypt'
import { isObject } from 'digi'
window.isObject = isObject

export const base64url = source => CryptoJS.enc.Base64.stringify(source).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')

export const base64urlToBase64 = str => {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  const pad = str.length % 4
  if (pad > 1) return str + new Array(5-pad).join('=')
  return str
}

export const jwtDecoded = (token, secret) => {
  const tokenSplit = token.split('.')
  const jwt = { header: tokenSplit[0], payload: tokenSplit[1], signature: tokenSplit[2] }
  if (tokenSplit.length !== 3 || base64url(CryptoJS.HmacSHA256(`${jwt.header}.${jwt.payload}`, secret)) !== jwt.signature) return jwt
  try { jwt.payloadData = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(base64urlToBase64(jwt.payload)))) } catch (err) { window.console.error(err)}
  return jwt
}

export const rsaEncrypt = (value, pubKey) => {
  const jsEncrypt = new JSEncrypt()

  if (isObject(value)) {
    value = JSON.stringify(value)
  }

  pubKey = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(pubKey))
  jsEncrypt.setPublicKey(pubKey)

  let res = ''
  const limitLen = 117
  for (let i = 0; i < value.length; i += limitLen) {
    const str = jsEncrypt.encrypt(value.slice(i, i + limitLen))
    if (!str) {
      return str
    }
    res += str
  }
  return res
}
