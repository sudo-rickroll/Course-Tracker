const User = require('../models/user.js')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const config = require('../utils/config.js')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('courses')
    response.status(200).json(users)

})

userRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    response.status(200).json(user)
})

userRouter.post('/', async (request, response, next) => {
    const { name, username, password } = request.body

    if(!password){
        next({
            name: 'ValidationError'
        })
        return
    }
    else if(password.length < 3){
        next({
            name: 'PasswordLengthError'
        })
        return
    }

    const passwordHash = await bcrypt.hash(password, Number(config.passwordSaltRounds))

    await (new User({ name, username, passwordHash })).save()

    response.status(201).send(`User ${username} created successfully`)

})

userRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = userRouter