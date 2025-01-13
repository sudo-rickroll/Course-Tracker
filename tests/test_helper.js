const Course = require('../models/course.js')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

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

const users = [
    {
        'username': 'anonymous1',
        'password': 'anonymous123',
        'name': 'Anonymous A'
    },
    {
        'username': 'anonymous2',
        'password': 'anonymous456',
        'name': 'Anonymous B'
    }
]

const invalidUsers = [{
    'username': 'anonymous1',
    'name': 'Anonymous A'
},
{
    'username': 'anonymous1',
    'password': 'abc',
    'name': 'Anonymous A'
}]

const createCourses = async () => await Course.insertMany(courses)

const createUsers = async () => {
    const usersToBeSaved = await Promise.all(users.map(async user => {
        return {
            username: user.username,
            name: user.name,
            passwordHash: await bcrypt.hash(user.password, 10)
        }
    }))
    await User.insertMany(usersToBeSaved)
}

const deleteAllCourses = async () => await Course.deleteMany({})

const deleteAllUsers = async () => await User.deleteMany({})

const findAllCourses = async () => {
    const addedCourses = await Course.find({})
    return addedCourses
}

const findAllUsers = async () => {
    const addedUsers = await User.find({})
    return addedUsers
}

const findCourseById = async id => await Course.findById(id)

const findUserById = async id => await User.findById(id)

module.exports = {
    courses,
    users,
    invalidUsers,
    createCourses,
    createUsers,
    deleteAllCourses,
    deleteAllUsers,
    findAllCourses,
    findAllUsers,
    findCourseById,
    findUserById
}