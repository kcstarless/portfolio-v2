import './_setup.js'
import * as helper from './_helper.js'
import * as testData from './_data.js'
import assert from 'node:assert'
import { describe, test } from 'node:test'
import { test_log } from '../utils/logger.js'

//// Test
describe('Tech model: ', () => {
    test('Test1: initial techs are saved', async () => {
        const techs = await helper.techsInDB()
        assert.strictEqual(techs.length, testData.seedTechs.length)
    })

    test('Test2: can save valid tech', async () => {
        const saved = await testData.getValidTech().save()
        assert.strictEqual(saved.title, testData.getValidTech().title)
    })

    test('Test3: throws validation error if required fields is missing - name', async () => {
        let error = null

        try {
            await testData.getMissingFieldTech().save()
        } catch(err) {
            error = err
        }
        // test_log(error)
        assert.ok(error, 'Expected validation error')
        assert.ok(error.errors.name, 'Expected error on missing name')
    })

    test('Test4: throws validation error if required field is missing - iconUrl', async () => {
        let error = null
        
        try {
            await testData.getMissingIconUrlTech().save()
        } catch(err) {
            error = err
        }

        // test_log(error)
        assert.ok(error, 'Expected validation error')
        assert.ok(error.errors.iconUrl, 'Expected error on missing name')
    })
})