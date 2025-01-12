const router = require('express').Router()
const Course = require('../models/course.js')

router.get('/', async (request, response) => {
    const course = await Course.find({})
    response.status(200).json(course)
})

router.post('/', async (request, response) => {
    const course = await new Course({
        ...request.body,
        hours: request.body.hours || 0
    }).save()
    response.status(201).json(course)
})

router.delete('/:id', async (request, response) => {
    await Course.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

router.put('/:id', async (request, response) => {
    const updatedCourse = await Course.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.status(200).json(updatedCourse)
})

module.exports = router