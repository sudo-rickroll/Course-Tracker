const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const { beforeEach, describe, test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const test_helper = require('./test_helper.js')


describe('Login and action sequence', () => {
    let token = ''

    beforeEach(async () => {
        await test_helper.deleteAllUsers()
        token = await test_helper.getToken()
    })
    test('Create user', async () => {
        await test_helper.deleteAllUsers()
        await api.post('/api/users').send(test_helper.users[1]).expect(201)
    })
    test('Login User', async () => {
        const userAuth = await api.post('/api/login').send({
            username: test_helper.users[0].username,
            password: test_helper.users[0].password
        }).expect(200)
        assert('username' in userAuth.body)
    })
    test('Create course succeeds', async () => {
        await api.post('/api/courses').set('Authorization', `Bearer ${token}`).send({
            title: `Test Course with ${test_helper.users[0].username}`,
            url: 'http://localhost:3001/'
        }).expect(201)
    })
    test('Create course fails without token', async () => {
        await api.post('/api/courses').send({
            title: `Test Course with ${test_helper.users[0].username}`,
            url: 'http://localhost:3001/'
        }).expect(400)
    })
    test('Get courses succeeds', async () => {
        const apiCourses = await api.get('/api/courses').set('Authorization', `Bearer ${token}`).expect(200)
        const mongoCourses = await test_helper.findAllCourses()
        assert.strictEqual(apiCourses.body.length, mongoCourses.length)
    })
    test('Get courses fails', async () => {
        await api.get('/api/courses').expect(400)
    })
    test('Delete course succeeds if user is owner', async () => {
        const user = test_helper.decodeToken(token)
        const course = await test_helper.createACourse({
            title: `Test Course with ${test_helper.users[0].username}`,
            url: 'http://localhost:3001/',
            user: user.id
        })
        await api.delete(`/api/courses/${course.id.toString()}`).set('Authorization', `Bearer ${token}`).expect(204)
    })
    test('Delete course fails if user is not the owner', async () => {
        const user = test_helper.decodeToken(token)
        const course = await test_helper.findACourse({ user: { $ne: user.id } })
        await api.delete(`/api/courses/${course._id.toString()}`).set('Authorization', `Bearer ${token}`).expect(400)
    })
})

after(async () => {
    await test_helper.deleteAllUsers()
    await test_helper.deleteAllCourses()
    await mongoose.connection.close()
})