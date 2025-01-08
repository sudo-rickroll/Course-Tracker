require('dotenv').config()
const fs = require('fs')

const mongodb_uri = process.env.MONGODB_URI || fs.readFileSync('/etc/secrets/MONGODB_URI', 'utf8').trim()
const port = process.env.PORT

module.exports = {
    mongodb_uri,
    port
}