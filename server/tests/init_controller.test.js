/** server/tests/init_controller.test.js */
import './_setup.js'
import * as helper from './_helper.js'
import * as testData from './_data.js'
import * as axios from 'axios'
import { test_log } from '#utils'
import { describe, test, before } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import { app } from '../app.js'

const api = supertest(app)

describe('Initial Loading Steps', () => {
    test('TEST1: waking up server, responds with pong', async () => {
        const res = await api.get('/api/init/ping')

        assert.strictEqual(res.status, 200)
        assert.strictEqual(res.text, 'pong')
    })

    test('TEST2: gets location info from /location', async () => {
        const res = await api.get('/api/init/location')
        assert.strictEqual(res.body.city, 'Melbourne')
        assert.strictEqual(res.body.region, 'Victoria')
        // test_log(res.body)
    })
})