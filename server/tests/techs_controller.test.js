import './_setup.js'
import * as helper from './_helper.js'
import * as testData from './_data.js'

import { test_log } from '../utils/logger.js'
import { describe, test } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import { app } from '../app.js'


const api = supertest(app)

describe('GET /api/techs', () => {
    test('Test1: returns all techs as JSON', async () => {
        const response = await api.get('/api/techs')
        // test_log(testData.seedTechs.length)
        assert.equal(response.status, 200)
        assert.equal(response.headers['content-type'].includes('application/json'), true)
        assert.equal(response.body.length, testData.seedTechs.length)
    })
})

describe('GET /api/techs/:id', () => {
    test('Test1: returns a single tech by ID', async () => {
        const tech = await helper.getTechJSON()
        const response = await api.get(`/api/techs/${tech.id}`)
        // test_log(tech)
        // test_log(response.body)
        assert.equal(response.status, 200)
        assert.deepStrictEqual(tech, response.body)
    })
    test('Test2: returns 404 when no match found', async () => {
        const invalidTechId = await helper.getInvalidTechId()
        const response = await api.get(`/api/techs/${invalidTechId}`)
        assert.equal(response.status, 404)
        assert.equal(response.body.error, 'No matching technology found')
    })
    test('Test3: returns 400 when malformed id format', async () => {
        const malformedId = '12345'
        const response = await api.get(`/api/techs/${malformedId}`)
        assert.equal(response.status, 400)
        assert.equal(response.body.error, 'malformatted id')
    })
})

describe('POST /api/techs', () => {
    test('Test1: adds new tech', async() => {
        const token = await helper.getValidToken()
        const techsBefore = await helper.techsInDB()
        const techToAdd = testData.getValidTech()
        const response = await api
            .post('/api/techs/')
            .set('Authorization', `Bearer ${token}`)
            .send(techToAdd)
            .expect(201)
        const techsAfter = await helper.techsInDB()
        assert.equal(techsBefore.length + 1, techsAfter.length)
        const exists = techsAfter.some(t => t.id === response.body.id)
        assert.ok(exists, 'New tech ID not found in the database')
    })
    test('Test2: post fails with no token', async () => {
        const techsBefore = await helper.techsInDB()
        const techToAdd = testData.getValidTech()
        const response = await api
            .post('/api/techs/')
            .send(techToAdd)
            .expect(401)
        assert.strictEqual(response.body.error, 'Token missing or invalid' )
    })
    test('Test3: post fails with invalid token', async () => {
        const invalidToken = 'asfs3234uakdjfaldjf'
        const techToAdd = testData.getValidTech()
        const response = await api
            .post('/api/techs/')
            .set('Authorization', `Bearer ${invalidToken}`)
            .send(techToAdd)
            .expect(401)
        assert.strictEqual(response.body.error, 'token invalid')
    })
    test('Test4: post fails with expired token', async () => {
        const expiredToken = await helper.getExpiredToken()

        const techToAdd = testData.getValidTech()
        const response = await api
            .post('/api/techs/')
            .set('Authorization', `Bearer ${expiredToken}`)
            .send(techToAdd)
            .expect(401)
        // test_log(response.body)
        assert.strictEqual(response.body.error, 'token expired')
    })
})

describe('DELETE /api/techs/:id', () => {
    test('Test1: deletes tech with valid token', async () => {
        const token = await helper.getValidToken()
        const techToDelete = await helper.getTechJSON() // assumed to return a tech in { id, name, ... } format

        const response = await api
            .delete(`/api/techs/${techToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const techsAfter = await helper.techsInDB()
        const exists = techsAfter.some(t => t.id === techToDelete.id)
        assert.ok(!exists, 'Deleted tech still exists in database')
    })

    test('Test2: delete fails without token', async () => {
        const tech = await helper.getTechJSON()
        const response = await api
            .delete(`/api/techs/${tech.id}`)
            .expect(401)

        assert.strictEqual(response.body.error, 'Token missing or invalid')
    })

    test('Test3: delete fails with invalid token', async () => {
        const tech = await helper.getTechJSON()
        const response = await api
            .delete(`/api/techs/${tech.id}`)
            .set('Authorization', 'Bearer invalidtoken123')
            .expect(401)

        assert.strictEqual(response.body.error, 'token invalid')
    })

    test('Test4: delete fails with expired token', async () => {
        const expiredToken = await helper.getExpiredToken()
        const tech = await helper.getTechJSON()
        const response = await api
            .delete(`/api/techs/${tech.id}`)
            .set('Authorization', `Bearer ${expiredToken}`)
            .expect(401)

        assert.strictEqual(response.body.error, 'token expired')
    })

    test('Test5: delete returns 404 when tech not found', async () => {
        const token = await helper.getValidToken()
        const nonExistentId = await helper.getInvalidTechId()
        const response = await api
            .delete(`/api/techs/${nonExistentId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)

        assert.strictEqual(response.body.error, 'No matching technology found')
    })

    test('Test6: delete returns 400 for malformatted ID', async () => {
        const token = await helper.getValidToken()
        const response = await api
            .delete('/api/techs/12345')
            .set('Authorization', `Bearer ${token}`)
            .expect(400)

        assert.strictEqual(response.body.error, 'malformatted id')
    })
})

describe('PUT /api/techs/:id', () => {
    test('Test1: updates a tech', async () => {
        const token = await helper.getValidToken()
        const tech = await helper.getTechJSON()
        const updatedData = await helper.getUpdatedTech(tech)

        const response = await api
            .put(`/api/techs/${tech.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        // test_log(response.body)

        assert.strictEqual(response.body.comments, updatedData.comments)
        const findTech = await helper.getTechById(tech.id)
        // test_log(findTech)
        assert.deepStrictEqual(updatedData, findTech)
    })

    test('Test2: udpates fail with invalid id 404', async () =>{
        const token = await helper.getValidToken()
        const invalidId = await helper.getInvalidTechId()
        const tech = await helper.getTechJSON()
        const updatedData = await helper.getUpdatedTech(tech)

        const response = await api
            .put(`/api/techs/${invalidId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData)
            .expect(404)
            .expect('Content-Type', /application\/json/)
        // test_log(response.body)
        const findTech = await helper.getTechById(tech.id)
        assert.strictEqual(response.body.error, 'No matching technology found')
        assert.deepStrictEqual(tech, findTech)
    })
})



