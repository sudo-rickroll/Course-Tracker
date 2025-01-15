const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app.js')
const test_helper = require('./test_helper.js')
const mongoose = require('mongoose')
const api = supertest(app)


describe('Helper test module', () => {

    test('list_helper_test', async function(){
        await test_helper.deleteAllCourses()
        const savedCourses = await test_helper.createCourses()
        assert.strictEqual(savedCourses.length, test_helper.courses.length)
    })
})

describe('Get API Tests', () => {
    beforeEach(async () => {
        await test_helper.deleteAllCourses()
        await test_helper.createCourses()
    })

    test('Response status', async () => {
        await api.get('/api/courses').expect(200).expect('Content-Type', /application\/json/)
    })
    test('Response data', async () => {
        const savedCourses = await api.get('/api/courses')
        const listCourses = await test_helper.findAllCourses()
        assert.strictEqual(savedCourses.body.length, listCourses.length)
    })
    test('Response data content', async () => {
        const savedCourses = await api.get('/api/courses')
        assert('id' in savedCourses.body[0] && !('_id' in savedCourses.body[0]))
    })
})

describe('Post API Requests', () => {
    beforeEach(async () => {
        await test_helper.deleteAllCourses()
        await test_helper.createCourses()
    })
    test('Response status', async () => {
        await api.post('/api/courses').send(test_helper.courses[1]).expect(201).expect('Content-Type', /application\/json/)
    })
    test('Data created successfully', async () => {
        const courses_before = await test_helper.findAllCourses()
        await api.post('/api/courses').send(test_helper.courses[1])
        const courses_after = await test_helper.findAllCourses()
        assert.strictEqual(courses_before.length + 1, courses_after.length)
    })
    test('Data created\'s content', async () => {
        const addedCourse = await api.post('/api/courses').send(test_helper.courses[1])
        assert.deepStrictEqual(addedCourse.body, { ...test_helper.courses[1], id: addedCourse.body.id })
    })
    test('Likes missing', async () => {
        const savedCourse = await api.post('/api/courses').send(test_helper.courses.find(course => course.title === 'EMLOPS V1' ))
        assert(savedCourse.body.hours === 0)
    })
    test('Missing required properties', async () => {
        await api.post('/api/courses').send({ author: 'Anonymous', hours: 45 }).expect(400)
    })
})

describe('Delete api requests', () => {
    beforeEach(async () => {
        await test_helper.deleteAllCourses()
        await test_helper.createCourses()
    })
    test('Response status', async () => {
        const courses = await api.get('/api/courses')
        await api.delete(`/api/courses/${courses.body[courses.body.length - 1].id}`).expect(204)
    })
    test('Remaining content after delete', async () => {
        const beforeDelete = await test_helper.findAllCourses()
        await api.delete(`/api/courses/${beforeDelete[beforeDelete.length - 1].id}`)
        const afterDelete = await test_helper.findAllCourses()
        assert.strictEqual(beforeDelete.length, afterDelete.length + 1)
    })

})

describe('Put api requests', () => {
    beforeEach(async () => {
        await test_helper.deleteAllCourses()
        await test_helper.createCourses()
    })
    test('Response status', async () => {
        const savedCourses = (await test_helper.findAllCourses()).map(course => course.toJSON())
        await api.put(`/api/courses/${savedCourses[savedCourses.length - 1].id}`).send(test_helper.courses[test_helper.courses.length - 2]).expect(200)
    })
    test('Response content', async () => {
        const savedCourses = (await test_helper.findAllCourses()).map(course => course.toJSON())
        await api.put(`/api/courses/${savedCourses[savedCourses.length - 1].id}`).send(test_helper.courses[test_helper.courses.length - 2])
        const updatedCourse = (await test_helper.findCourseById(savedCourses[savedCourses.length - 1].id)).toJSON()
        assert.deepStrictEqual(updatedCourse, { ...test_helper.courses[test_helper.courses.length - 2], id: updatedCourse.id })

    })
})

after(async () => {
    await mongoose.connection.close()
})