const router = require('express').Router()
const Course = require('../models/course.js')

router.get('/', (request, response, next) => {
    Course.find({})
        .then(data => {
            response.status(200).json(data)
        })
        .catch(error => next(error))
})

router.post('/', (request, response, next) => {
    new Course(request.body).save()
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error))

})

module.exports = router