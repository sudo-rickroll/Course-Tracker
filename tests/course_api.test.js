const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app.js')
const test_helper = require('./test_helper.js')
const mongoose = require('mongoose')
const api = supertest(app)

const courses = test_helper.courses

beforeEach(async () => {
    await test_helper.deleteAllCourses()
    await test_helper.createCourses()
})

describe('Main test module', () => {
    test('list_helper_test', async function(){
        const course = await test_helper.createCourses()
        console.log(course)
    })
})

describe('API Tests', () => {
    test.only('GET API Response Status', async () => {
        await api.get('/api/courses').expect(200).expect('Content-Type', /application\/json/)
    })
    test.only('GET API Request Data', async () => {
        const savedCourses = await api.get('/api/courses')
        const listCourses = await test_helper.findAllCourses()
        assert.strictEqual(savedCourses.body.length, listCourses.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})