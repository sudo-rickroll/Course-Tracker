const Course = require('../models/course.js')

const courses = [
    {
        title: 'Full stack open',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/en/',
        hours: 40
    },
    {
        title: 'The odin project',
        author: 'Erik Trautman',
        url: 'https://www.theodinproject.com/',
        hours: 30
    },
    {
        title: 'EVA V3',
        author: 'Rohan Shravan',
        url: 'https://theschoolof.ai/',
        hours: 45
    },
    {
        title: 'ERA V3',
        author: 'Rohan Shravan',
        url: 'https://theschoolof.ai/',
        hours: 40
    }
]

const createCourses = async () => {
    const course1 = new Course(courses[0])
    const savedCourse = await course1.save()
    return [savedCourse.toJSON()]
}

const deleteAllCourses = async () => {
    await Course.deleteMany({})
}

const findAllCourses = async () => {
    const addedCourses = await Course.find({})
    return addedCourses.map(course => course.toJSON())
}

module.exports = {
    courses,
    createCourses,
    deleteAllCourses,
    findAllCourses
}