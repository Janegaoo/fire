/*
 * @Author: Jane
 * @Date: 2020-05-28 16:20:17
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-26 14:58:47
 * @Descripttion:
 */
import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('9336365521W5F092BB5909E8E033BC69');
const iv = CryptoJS.enc.Hex.parse('dc0da04af8fee58593442bf834b30739');

const keyHex = CryptoJS.enc.Utf8.parse('HZtech@2014~2019');
const ivHex = CryptoJS.enc.Utf8.parse('A-16-Byte-String');

function Encrypt(plainText, flag) {
  if (flag === 1) {
    const encrypted = CryptoJS.AES.encrypt(plainText, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }
  const encrypted = CryptoJS.AES.encrypt(
    plainText,
    key,
    {
      iv,
      padding: CryptoJS.pad.Pkcs7,
    },
  );
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

function Decrypt(cipherText, flag) {
  let decrypted = null;
  if (flag === 1) {
    decrypted = CryptoJS.AES.decrypt(cipherText, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  } else {
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(cipherText),
    });
    decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      key,
      { iv },
    );
  }
  // console.log(cipherText);
  // console.log(CryptoJS.enc.Utf8);
  // console.log(decrypted.toString(CryptoJS.enc.Utf8).toString());
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function getBase64(str) {
  const s = CryptoJS.enc.Utf8.parse(str);
  const base64 = CryptoJS.enc.Base64.stringify(s);
  return base64;
}

function parseBase64(base64) {
  const words = CryptoJS.enc.Base64.parse(base64);
  const parseStr = words.toString(CryptoJS.enc.Utf8);
  return parseStr;
}

export default {
  Encrypt,
  Decrypt,
  getBase64,
  parseBase64,
};
