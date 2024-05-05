import { log } from 'console'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
import { readFileSync } from 'fs'
import minimist from 'minimist'
import { argv } from 'process'

const { fuzz, decr, encr, _ } = minimist(argv.slice(2))
// --key=value
const loop = async (url) => {
  const words = readFileSync('./small.txt', { encoding: 'utf-8' })

  for (const word of words.split('\n').slice(100, 110)) {
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
  const encrypted = cipher.update(password.toString() , 'utf8', 'base64') + cipher.final('base64')
  const tag = cipher.getAuthTag()
  
  return encrypted + ' ' + [key, iv, tag].map(secret => secret.toString('base64')).join(' ')
}

const decrypt = (cipher, secrets) => {
  const [key, iv, tag] = secrets.map(secret => Buffer.from(secret, 'base64'))
  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  return decipher.update(cipher, 'base64', 'utf8') + decipher.final('utf8')
}

encr && log(encrypt(encr))
decr && _ && log(decrypt(decr, _).toString('utf-8'))
fuzz && loop(fuzz)