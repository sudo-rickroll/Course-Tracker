const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const config = require('../utils/config.js')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response, next) => {
    const { username, password } = request.body
    if(!(username && password)){
        next({
            name: 'ValidationError'
        })
    }
    const user = await User.findOne({ username })
    const tokenUser = {
        username: user?.username,
        id: user?._id.toString()
    }

    if(user && await bcrypt.compare(password, user?.passwordHash)){
        const authToken = jwt.sign(tokenUser, config.secret)
        response.status(200).send({
            token: authToken,
            id: user.id,
            name: user.name
        })
    } else{
        next({
            name: 'AuthenticationError'
        })
    }
})

module.exports = loginRouter
