const courseRouter = require('express').Router()
const Course = require('../models/course.js')
const User = require('../models/user.js')

courseRouter.get('/', async (request, response) => {
    const courses = await Course.find({}).populate('user', {id: 1, name: 1})
    response.status(200).json(courses)
})

courseRouter.post('/', async (request, response, next) => {
    if(!request.user){
        return next({
            name: 'AuthorizationError'
        })
    }
    const course = await new Course({
        ...request.body,
        hours: request.body.hours || 0,
        user: request.user,
        likes:0
    }).save()

    const user = await User.findById(request.user)
    user.courses = user.courses.concat(course._id)
    await user.save()
    response.status(201).json(course)
})

courseRouter.delete('/:id', async (request, response, next) => {
    if(request.user){
        const course = await Course.findById(request.params.id)
        if(!course){
            return next({
                name:'NotFoundError'
            })
        }
        if(course.user?.toString() === request.user) {
            await Course.findOneAndDelete(course)
            const user = await User.findById(request.user)
            user.courses = user.courses.filter(course => course._id.toString() !== request.params.id)
            await user.save()
            return response.status(204).end()
        }
        return next({
            name: 'AuthorizationError',
            message: 'Course can only be deleted by its creator'
        })
    }
    return next({
        name: 'JsonWebTokenError'
    })
})

courseRouter.put('/:id', async (request, response, next) => {
    if(request.user){
        const course = await Course.findById(request.params.id)
        if(!course){
            return next({
                name:'NotFoundError'
            })
        }
        if(course.user?.toString() === request.user) {
            const updatedCourse = await Course.findByIdAndUpdate(request.params.id, request.body, { new: true })
            return response.status(200).json(updatedCourse)
        }
        return next({
            name: 'AuthorizationError',
            message: 'Course details can only be updated by its creator'
        })
    }
    return next({
        name: 'JsonWebTokenError'
    })
})

courseRouter.patch('/:id', async (request, response, next) => {
    if(request.user && Object.keys(request.body).length === 0){
        const updatedCourse = await Course.findByIdAndUpdate(request.params.id, { $inc: { likes: 1 } }, { new: true })
        return response.status(200).json(updatedCourse)
    }
    return next({
        name: 'AuthorizationError',
        message: 'Log in to like a course!'
    })
})

module.exports = courseRouter