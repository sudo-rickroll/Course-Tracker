require('dotenv').config()
const fs = require('fs')

const mongodb_uri = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : (process.env.MONGODB_URI_PROD || fs.readFileSync('/etc/secrets/MONGODB_URI', 'utf8').trim())
const port = process.env.PORT
const passwordSaltRounds = process.env.SALT_ROUNDS
const secret = process.env.secret

module.exports = {
    mongodb_uri,
    port,
    passwordSaltRounds,
    secret
}