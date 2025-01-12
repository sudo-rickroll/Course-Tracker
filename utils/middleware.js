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
        status: 501,
        error: 'Unknown endpoint'
    })
}

const errorHandler = (error, request, response, next) => {
    logger.error('Error: ', error.error || error.message)
    if(error.name === 'ValidationError'){
        response.status(400).end()
        return
    }
    if(error.status === 501){
        response.status(501).send({
            error: error.message || 'Endpoint not recognised'
        })
        return
    }
    response.status(500).end()
    next(error)
}

module.exports = {
    enableCors,
    requestLogger,
    unknownHandler,
    errorHandler
}
