/** server/tests/login_controller.test.js */
import './_setup.js'
import * as helper from './_helper.js'
import * as testData from './_data.js'

import { test_log } from '#utils'
import { describe, test } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import { app } from '../app.js'

const api = supertest(app)

const valid = {
    username: 'demo',
    password: 'sekret'
}

describe('POST /api/login', () => {
    test('TEST1: succeeds with correct credentials', async () => {
        const response = await api
            .post('/api/login')
            .send(valid)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.ok(response.body.token)
        assert.strictEqual(response.body.username, valid.username)
    })
    test('TEST2: fails with incorrect password', async () => {
        const response = await api
            .post('/api/login')
            .send({ username: valid.username, password: 'wrongpassword' })
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.error, 'invalid username or password')
    })
    test('TEST3: fails with non-existent username', async () => {
        const response = await api
            .post('/api/login')
            .send({ username: 'nonuser', password: 'sekret' })
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.error, 'invalid username or password')
    })
    test('TEST4: fails with missing password field', async () => {
        const response = await api
            .post('/api/login')
            .send({ username: valid.username })
            .expect(400)
            .expect('Content-Type', /application\/json/)
        test_log(response.body.error)
        assert.strictEqual(response.body.error, 'Validation failed')
        assert.strictEqual(response.body.details, 'Password is required')
    })
    test('TEST5: fails with missing username field', async () => {
        const response = await api
            .post('/api/login')
            .send({ password: valid.password })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.details, 'Username is required')
    })
    test('TEST6: fails with empty request body', async () => {
        const response = await api
            .post('/api/login')
            .send({})
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.details, 'Username & password is required')
    })
})