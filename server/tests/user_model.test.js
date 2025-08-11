/** server/tests/user_model.test.js */

import './_setup.js'
import * as helper from './_helper.js'
import * as testData from './_data.js'
import assert from 'node:assert'
import { test, describe } from 'node:test'
import { User } from '../models/index.js'
import { test_log } from '#utils'

//// Test
describe('User model: ', () => {
    test('Test1: initial user are saved', async () => {
        const users = await helper.usersInDB()
        assert.strictEqual(users.length, testData.seedUsers.length)
    })

    test('Test2: valid user is saved', async () => {
        const usersBefore = await helper.usersInDB()
        const saved = await new User(testData.getValidUser()).save()
        const usersAfter = await helper.usersInDB()

        const exists = usersAfter.some(p => p.id === saved.id)

        assert.strictEqual(usersAfter.length, usersBefore.length + 1)
        assert.ok(exists, 'Newly created user exists in DB')
    })

    test('Test3: throws validation error if required field is missing - username', async () => {
        let error = null
        try {
            await new User(testData.getInvalidUser()).save()
        } catch(err){
            error = err
        }
        // test_log(error.message)
        assert.strictEqual(error.message, 'User validation failed: username: Path `username` is required.')
    })

    test('Test4: throws validation error if username is less than 4', async () => {
        let error = null
        const newUser = { username: 'tom', name: 'tom tom', passwordHash: 'UpperLower8!'}
        try {
            await new User(newUser).save()
        } catch(err){
            error = err
        }
        // test_log(error.message)
        assert.strictEqual(error.message, 
            'User validation failed: username: Path `username` (`tom`) is shorter than the minimum allowed length (4).')
    })

    test('Test5: throws validation error if username is greater than 20', async () => {
        let error = null
        const newUser = { username: 'tommytommytommytommmy', name: 'tom tom', passwordHash: 'UpperLower8!'}
        try {
            await new User(newUser).save()
        } catch(err){
            error = err
        }
        // test_log(error.message)
        assert.strictEqual(error.message, 
            'User validation failed: username: Path `username` (`tommytommytommytommmy`) is longer than the maximum allowed length (20).')
    })

    test('Test6: throws validation error for username uniqueness', async () => {
        let error = null
        const newUser = { username: 'root', name: 'tom tom', passwordHash: 'UpperLower8!'}
        try {
            await new User(newUser).save()
        } catch(err){
            error = err
        }
        // test_log(error.message)
        assert.strictEqual(error.message, 
            'E11000 duplicate key error collection: TestDB.users index: username_1 dup key: { username: "root" }')
    })

    test('Test7: removes white spaces on username', async () => {
        const newUser = { username: '   tommy', name: 'tom tom', passwordHash: 'UpperLower8!' }
        // test_log(newUser.username)
        const usersBefore = await helper.usersInDB()
        const savedUser = await new User(newUser).save()
        const usersAfter = await helper.usersInDB()

        // test_log(savedUser.username)
        assert.strictEqual(savedUser.username, 'tommy')
        assert.strictEqual(usersBefore.length + 1, usersAfter.length)
    })
})