import { log } from 'console'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
import { readFileSync } from 'fs'
import minimist from 'minimist'
import { argv } from 'process'

const { fuzz, dec, enc, _ } = minimist(argv.slice(2))
// --key=value
const loop = async (url) => {
  const words = readFileSync('./small.txt', { encoding: 'utf-8' })

  for (const word of words.split('\n').slice(100, 110)/* slice is to make it faster for testing*/) {
    const res = await fetch(`${url}/${word}`)
    if (res.status < 300) {
      log(res.status)
      log(word)
    }
  }
}

const encrypt = (password) => {
  const iv = randomBytes(16)
  const key = randomBytes(32)
  const cipher = createCipheriv('aes-256-gcm', key ,iv)
  const encrypted = cipher.update(password.toString() , 'utf8', 'base64url') + cipher.final('base64url')
  const tag = cipher.getAuthTag()
  const secrets = [key, iv, tag].map(secret => secret.toString('base64url'))

  return `\nCOPY THIS:\n${[encrypted, ...secrets].join('%%')}`
}

const decrypt = (secrets) => {
  const [cipher, key, iv, tag] = secrets.split('%%').map((secret, i) => i ? Buffer.from(secret, 'base64url') : secret)
  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)

  return '\nSECRET:\n' + decipher.update(cipher, 'base64url', 'utf8') + decipher.final('utf8')
}

enc && log(encrypt(enc))
dec && log(decrypt(dec))
fuzz && loop(fuzz)