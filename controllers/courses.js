const courseRouter = require('express').Router()
const Course = require('../models/course.js')
const User = require('../models/user.js')

courseRouter.get('/', async (request, response) => {
    const course = await Course.find({}).populate('user', { name: 1 })
    response.status(200).json(course)
})

courseRouter.post('/', async (request, response) => {
    const user = await User.findOne({})
    const course = await new Course({
        ...request.body,
        hours: request.body.hours || 0,
        user: user.id
    }).save()
    response.status(201).json(course)
})

courseRouter.delete('/:id', async (request, response) => {
    await Course.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

courseRouter.put('/:id', async (request, response) => {
    const updatedCourse = await Course.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.status(200).json(updatedCourse)
})

module.exports = courseRouter