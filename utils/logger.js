const info = (...params) => process.env.NODE_ENV==='prod' ? console.log(...params) : null

const error = (...params) => process.env.NODE_ENV==='prod' ? console.error(...params) : null

module.exports = {
    info,
    error
}