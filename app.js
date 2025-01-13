const express = require('express')
require('express-async-errors')
const middleware = require('./utils/middleware.js')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login.js')
const userRouter = require('./controllers/users.js')
const courseRouter = require('./controllers/courses.js')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')

const app = express()

mongoose.connect(config.mongodb_uri).then(() => logger.info('Connected to database')).catch(error => logger.error(`Error: ${error.message}`))
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.enableCors())
process.env.NODE_ENV!=='test'? app.use(middleware.requestLogger()) : null

app.use('/api/login/', loginRouter)
app.use('/api/users/', userRouter)
app.use('/api/courses/', courseRouter)

app.use(middleware.unknownHandler)
app.use(middleware.errorHandler)


module.exports = app



