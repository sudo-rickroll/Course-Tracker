require('express-sync-errors')
const router = require('express').Router()
const Course = require('../models/course.js')

router.get('/', async (request, response) => {
    const course = await Course.find({})
    response.status(200).json(course)
})

router.post('/', async (request, response) => {
    const course = await new Course(request.body).save()
    response.status(201).json(course)
})

module.exports = router