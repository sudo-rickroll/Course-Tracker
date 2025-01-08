const express = require('express')
const middleware = require('./utils/middleware.js')
const mongoose = require('mongoose')
const courseRouter = require('./controllers/courses.js')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')

const app = express()

mongoose.connect(config.mongodb_uri).then(() => logger.info('Connected to database')).catch(error => logger.error(`Error: ${error.message}`))
app.use(express.json());
app.use(express.static('dist'))
app.use(middleware.enableCors())
app.use(middleware.requestLogger())

app.use('/api/courses/', courseRouter)

app.use(middleware.unknownHandler)
app.use(middleware.errorHandler)


module.exports = app



