const { test, describe, beforeEach, after } = require('node:test')
const test_helper = require('./test_helper.js')
const assert = require('assert')
const mongoose = require('mongoose')
const app = require('../app.js')
const supertest = require('supertest')
const api = supertest(app)

beforeEach(async () => {
    await test_helper.deleteAllUsers()
    await test_helper.createUsers()
})
describe('User GET API tests', () => {
    test('Response status', async () => {
        await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
    })
    test('Response content', async () => {
        const apiFetchedUsers = await api.get('/api/users')
        const mongoFetchedUsers = await test_helper.findAllUsers()
        assert.strictEqual(apiFetchedUsers.body.length, mongoFetchedUsers.length)
    })
})

describe('User POST Api tests', () => {
    test('Missing password', async () => {
        await api.post('/api/users').send(test_helper.invalidUsers[0]).expect(400).expect(/cannot be empty/)
    })
})

after(async () => {
    await test_helper.deleteAllUsers()
    await mongoose.connection.close()
})