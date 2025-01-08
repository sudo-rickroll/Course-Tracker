const logger = require('./logger')
const cors = require('cors')
const morgan = require('morgan')

const enableCors = () => cors()

const requestLogger = () => {
    morgan.token('content', function (request, response) { return JSON.stringify(request.body) })
    return morgan(':method :url :status :res[content-length] - :response-time ms :content')
}

const unknownHandler = (request, response, next) => {
    next({
        status: 404,
        error: 'Unknown endpoint'
    })
}

const errorHandler = (error, request, response) => {
    logger.error(error.error || error.message)
    if(error.status === 404){
        response.status(404).send({
            error: error.message || 'Resource not found'
        })
        return
    }
    response.status(500).end()
}

module.exports = {
    enableCors,
    requestLogger,
    unknownHandler,
    errorHandler
}
