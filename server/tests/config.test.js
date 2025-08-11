/** server/tests/config.test.js */

import './_setup.js'
import { test, describe } from 'node:test'
import assert from 'node:assert'

//// Setup

//// Test
describe('Enviornment config tests: ', () => {
    test('Test1: uses TEST_MONGODB_URI when NODE_ENV is test', async () => {
        process.env.NODE_ENV = 'test'
        process.env.TEST_MONGODB_URI = 'TestDB'

        const { getMongoUri } = await import('#utils')
        assert.strictEqual(getMongoUri(), 'TestDB')
    })

    test('Test2: uses MONGODB_URI when NODE_ENV is not test', async () => {
        process.env.NODE_ENV = 'development'
        process.env.MONGODB_URI = 'MongoDB'

        const { getMongoUri } = await import('#utils')
        console.log(getMongoUri())
        assert.strictEqual(getMongoUri(), 'MongoDB')
    })

    test('Test3: PORT uses process.env.PORT if set', async () => {
        process.env.PORT = 4000
        const { getPort } = await import('#utils')
        assert.strictEqual(getPort(), 4000)
    })
 
    test('Test4: PORT fallbacks to 3001 if process.env.PORT note set', async () => {
        delete process.env.PORT
        const { getPort } = await import('#utils')
        assert.strictEqual(getPort(), 3001)
    })
})

