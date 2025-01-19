const logger = require('./logger')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config.js')
const jwt = require('jsonwebtoken')

const enableCors = () => cors()

const requestLogger = () => {
    morgan.token('origin', function (request, response) { return JSON.stringify(request.headers.origin) })
    return morgan(':method :url :status :res[content-length] - :response-time ms :origin')
}

const tokenExtractor = async (request, response, next) => {
    const token = request.headers?.authorization?.split('Bearer ')[1] || null
    request['token'] = token
    next()
}

const userExtractor = async (request, response, next) => {
    const user = jwt.verify(request.token, config.secret)
    request['user'] = user?.id || null
    next()
}

const unknownHandler = (request, response, next) => {
    next({
        name: 'UnknownEndpointError'
    })
}

const errorHandler = (error, request, response, next) => {
    logger.error('Error: ', error.error || error.message)
    switch(error.name){
    case('ValidationError'):
        return response.status(400).send('Fields marked required cannot be empty')

    case('PasswordLengthError'):
        return response.status(400).send('Password cannot be less than 3 characters long')

    case('AuthenticationError'):
        return response.status(400).send('Username or Password incorrect')

    case('AuthorizationError'):
        return response.status(400).send('This user does not have the privileges to perform this action')

    case('JsonWebTokenError'):
        return response.status(400).send('Invalid session')

    case('MongoServerError'):
        return response.status(400).send('Username must be unique')

    case('NotFoundError'):
        return response.status(404).send('Resource not found')

    case('UnknownEndpointError'):
        return response.status(501).send('Endpoint not recognised')

    default:
        response.status(500).end()
        next(error)
    }
}

module.exports = {
    enableCors,
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownHandler,
    errorHandler
}
