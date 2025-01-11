const { describe, test } = require('node:test')
const assert = require('node:assert')
const tests = require('../utils/list_helper.js')

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
    }
]
describe('dummy module test', () => {
    test('dummy model test case', () => {
        assert.strictEqual(tests.dummy([]), 1)
    })
    test('total hours test case', () => {
        assert.strictEqual(tests.totalHours(courses), 70)
    })
    test('favorite course', () => {
        assert.deepStrictEqual(tests.favoriteCourse(courses),     {
            title: 'Full stack open',
            author: 'Matti Luukkainen',
            url: 'https://fullstackopen.com/en/',
            hours: 40
        })
    })
})