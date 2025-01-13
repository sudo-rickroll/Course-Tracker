const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const config = require('../utils/config.js')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response, next) =>{
    const { username, password } = request.body
    if(!(username && password)){
        next({
            name: 'ValidationError'
        })
    }
    const user = await User.findOne({ username })
    const tokenUser = {
        username: user?.username,
        name: user?.name
    }
    const authToken = await bcrypt.compare(password, user.passwordHash) ? jwt.sign(tokenUser, config.secret) : null
    if(!(user && authToken)){
        next({
            name: 'AuthenticationError'
        })
    }
    response.status(200).send({
        token: authToken,
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter
