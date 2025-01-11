const _ = require('lodash')

const dummy = courses => 1
const totalHours = courses => courses.reduce((sum, item) => sum + item.hours, 0)
const favoriteCourse = courses => courses.find(course => course.hours === Math.max(...courses.map(course => course.hours)))

const mostBlogs = courses => {
    const occurances = _.countBy(courses, 'author')
    const frequentAuthor = _.maxBy(_.keys(occurances), key => occurances[key])
    return { author: frequentAuthor, blogs: occurances[frequentAuthor] }
}

const mostHours = courses => {
    const authorHours = _.map(_.groupBy(courses, 'author'), (authorCourses, author) => ({
        author,
        hours: _.sumBy(authorCourses, 'hours')
    }))
    return _.maxBy(authorHours, 'hours')
}

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


module.exports = {
    dummy,
    totalHours,
    favoriteCourse,
}