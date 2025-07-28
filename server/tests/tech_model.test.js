import './_setup.js'
import * as helper from './_helper.js'
import * as testData from './_data.js'
import assert from 'node:assert'
import { describe, test } from 'node:test'
import { Tech } from '../models/tech.js'
import { test_log, error } from '../utils/logger.js'

//// Test
describe('Tech model: ', () => {
    test('Test1: initial techs are saved', async () => {
        const techs = await helper.techsInDB()
        assert.strictEqual(techs.length, testData.seedTechs.length)
    })

    test('Test2: can save valid tech', async () => {
        const saved = await new Tech(testData.getValidTech()).save()
        assert.strictEqual(saved.title, testData.getValidTech().title)
    })

    test('Test3: throws validation error if required fields is missing - name', async () => {
        let error = null

        try {
            await new Tech(testData.getMissingFieldTech()).save()
        } catch(err) {
            error = err
        }
        // test_log(error)
        assert.ok(error, 'Expected validation error')
        assert.ok(error.errors.name, 'Expected error on missing name')
    })

    test('Test4: throws validation error if required field is missing - icon', async () => {
        let error = null
        
        try {
            await new Tech(testData.getMissingiconTech()).save()
        } catch(err) {
            error = err
        }

        // test_log(error)
        assert.ok(error, 'Expected validation error')
        assert.ok(error.errors.icon, 'Expected error on missing name')
    })

    test('Test5: throws validation error if field icon is not unique', async () => {
        let error = null

        await Tech(testData.getValidTech()).save()
        try {
            await Tech(testData.getSameIconName()).save()
        } catch(err) {
            error = err
        }
        // test_log(error)
        // test_log(error.errorResponse)
        assert.ok(error,'Expected validation error' )
    })

    test('Test6: throws validation error if level is not enum', async () => {
        let error = null
        try {
            await Tech(testData.getInvalidTechLevel()).save()
        } catch(err) {
            error = err
        }
        test_log(error)
        console.log(error.code)
        assert.ok(error, 'Expected validation error')
        assert.strictEqual(error.message, 'Tech validation failed: level: `NOVIC` is not a valid enum value for path `level`.')
    })
})