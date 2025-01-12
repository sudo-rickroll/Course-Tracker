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
    },
    {
        title: 'EMLOPS V1',
        author: 'Rohan Shravan',
        url: 'https://theschoolof.ai/'
    }
]

const createCourses = async () => await Course.insertMany(courses)

const deleteAllCourses = async () => await Course.deleteMany({})


const findAllCourses = async () => {
    const addedCourses = await Course.find({})
    return addedCourses
}

const findCourseById = async id => await Course.findById(id)

module.exports = {
    courses,
    createCourses,
    deleteAllCourses,
    findAllCourses,
    findCourseById
}