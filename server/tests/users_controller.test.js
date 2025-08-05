import './_setup.js'
import assert from 'node:assert'
import * as testData from './_data.js'
import * as helper from './_helper.js'
import supertest from 'supertest'
import { test, describe } from 'node:test'
import { test_log } from '../utils/logger.js'
import { app } from '../app.js'

//// Setup
const api = supertest(app)

const expectUserCreation = async (newUser, expectedStatus) => {
    const usersAtStart = await helper.usersInDB();

    const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(expectedStatus)
    .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    return { usersAtStart, usersAtEnd, res };
} 

//// Test
describe('User controller: ', () => {   
    test('Test1: creation succeeds with a fresh username', async () => {
        const newUser = testData.getValiderUserBeforeHash()
        const { usersAtStart, usersAtEnd } = await expectUserCreation(newUser, 201)
        // test_log(res.body)
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
        assert(usersAtEnd.map(u => u.username).includes(newUser.username));
    })

    test('Test2: creation fails with a missing field - username', async () => {
        const newUser = testData.getInvalidUser()
        const { usersAtStart, usersAtEnd, res } = await expectUserCreation(newUser, 400)
        // test_log(res.body)
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('Test3: creation fails with existing username in DB', async () => {
        const newUser = { username: 'demo', name: 'demo deom', password: 'UpperLower8~' }
        const { usersAtStart, usersAtEnd, res } = await expectUserCreation(newUser, 400)
        // test_log(res.body)
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        assert(res.body.error.includes('duplicate/uniqness key error'))
    })

    test('Test4: creation fails when username length is less than 4 characters', async () => {
        const newUser = { username: 'dem', name: 'demo demo', password: 'demo' }
        const { usersAtStart, usersAtEnd, res } = await expectUserCreation(newUser, 400)
        // test_log(res.body)
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('Test5: creation fails when username length is more than 20 characters', async () => {
        const newUser = { username: 'demodemodemodemodemodemodemodemo', name: 'long name', password: 'sekret'}
        const { usersAtStart, usersAtEnd, res } = await expectUserCreation(newUser, 400)
        // test_log(res.body)
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('Test6: creation fails with password less than 8 characters', async () => {
        const newUser = { username: 'short', name: 'demo demo', password: 'short' }
        const { usersAtStart, usersAtEnd, res } = await expectUserCreation(newUser, 400)
        // test_log(res.body)
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        assert(res.body.details.includes('Password must be at least 8 characters long'))
    })

    test('Test7: creation fails with password strength below complexity',  async () => {
        const newUser = { username: 'complex', name: 'complex guy', password: 'complexGuysPassword'}
        const { usersAtStart, usersAtEnd, res } = await expectUserCreation(newUser, 400)
        // test_log(res.body)
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        assert(res.body.details.includes('Password must include at least one uppercase letter, one number, and one special character'))
    })
})