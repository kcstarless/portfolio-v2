import httpMocks from 'node-mocks-http'
import assert from 'node:assert'
import * as testData from './_data.js'
import { test_log } from '../utils/logger.js';
import { validateProject, validateUser, validateTech } from "../middleware/validations.js";
import { test, describe } from 'node:test'

//// Setup
const validProject = {
    title: "Example App",
    description: "A example app does the examples",
    demoUrl: "https://example.com/todo-app",
    githubUrl: "https://github.com/username/todo-app",
    imagePath: "https://example.com/images/todo-app.png",
    tech: ['id1', 'id2'],
    user: 'userId123'
}

const mockRequest = (_method, _body) => {
     return httpMocks.createRequest({
            method: _method,
            body: _body
    })
}

//// Test
describe('Project property validation: ', () => {
    test('Test1: validation passes', async () => {
        const req = mockRequest('POST', validProject)
        const res = httpMocks.createResponse()
        const next = () => {}

        validateProject(req, res, next)
        assert.strictEqual(res.statusCode, 200)
    })

    test('Test2: missing field', () => {
    })

    test('Test3: missing title', () => {
        const invalidProject = { ...validProject }
        delete invalidProject.title

        const req = mockRequest('POST', invalidProject)

        const res = httpMocks.createResponse()
        const next = () => {}

        validateProject(req, res, next)

        assert.strictEqual(res.statusCode, 400)
    })

    test('Test4: missing description', () => {
        const invalidProject = { ...validProject }
        delete invalidProject.description

        const req = mockRequest('POST', invalidProject)

        const res = httpMocks.createResponse()
        const next = () => {}

        validateProject(req, res, next)

        assert.strictEqual(res.statusCode, 400)
    })

    test('Test5: missing tech', () => {
        const invalidProject = { ...validProject }
        delete invalidProject.tech

        const req = mockRequest('POST', invalidProject)
        const res = httpMocks.createResponse()
        const next = () => {}

        validateProject(req, res, next)

        assert.strictEqual(res.statusCode, 400)
    })

    test('Test6: missing demoUrl', () => {
        const invalidProject = { ...validProject }
        delete invalidProject.demoUrl

        const req = mockRequest('POST', invalidProject)

        const res = httpMocks.createResponse()
        const next = () => {}

        validateProject(req, res, next)
        assert.strictEqual(res.statusCode, 400)

        const message = res._getJSONData()
        assert.equal(message.error, 'Validation failed')
        assert.equal(message.details, 'Missing required fields: demoUrl')
    })

    test('Test7: multiple fields missing - demoUrl, title', () => {
        const { demoUrl, title, ...invalidProject } = validProject;

        const req = mockRequest('POST', invalidProject)

        const res = httpMocks.createResponse()
        const next = () => {}

        validateProject(req, res, next)
        assert.strictEqual(res.statusCode, 400)

        const message = res._getJSONData()
        assert.equal(message.error, 'Validation failed')
        assert.equal(message.details, 'Missing required fields: title, demoUrl')
    })

    test('Test8: something & missing field', () => {
    })

    test('Test9: invalid ', () => {

    })

    test('Test10: missing user', () => {
        const invalidProject = { ...validProject }
        delete invalidProject.user

        const req = mockRequest('POST', invalidProject)

        const res = httpMocks.createResponse()
        const next = () => {}

        validateProject(req, res, next)
        const message = res._getJSONData()
        
        assert.strictEqual(res.statusCode, 400)
        assert.equal(message.error, 'Validation failed')
        assert.ok(message.details.includes('Missing required fields: user'));
    })
})

describe('User property validation: ', () => {
    test('Test1: validation passes', async () => {
        const req = mockRequest('POST', testData.getValidUser())

        const res = httpMocks.createResponse()
        const next = () => {}

        validateUser(req, res, next)

        assert.strictEqual(res.statusCode, 200)
    })

    test('Test2: validation fails with missing username', async () => {
        const req = mockRequest('POST', testData.getInvalidUser())

        const res = httpMocks.createResponse()
        const next = () => {}

        validateUser(req, res, next)
        const data = JSON.parse(res._getData())

        assert.strictEqual(res.statusCode, 400)
        assert.strictEqual(data.error, 'Validation failed')
        assert.strictEqual(data.details, 'Username is required')
    })

    test('Test3: validation fails with whitespace username', async () => {
        const req = mockRequest('POST', testData.getWhiteSpaceUser())

        const res = httpMocks.createResponse()
        const next = () => {}

        validateUser(req, res, next)
        const data = JSON.parse(res._getData())

        assert.strictEqual(res.statusCode, 400)
        assert.strictEqual(data.error, 'Validation failed')
        assert.strictEqual(data.details, 'Username is required')
    })

    test('Test4: validation fails with password less than 8 characters', async () => {
        const req = mockRequest('POST',
            { username: 'invalid', name: 'invalid password', password: 'Upper'}
        )

        const res = httpMocks.createResponse()
        const next = () => {}

        validateUser(req, res, next)
        const data = JSON.parse(res._getData())

        assert.strictEqual(res.statusCode, 400)
        assert.strictEqual(data.error, 'Validation failed')
        assert.strictEqual(data.details, 'Password must be at least 8 characters long')
    })

    test('Test5: validation fails by complexity', async () => {
        const req = mockRequest('POST',
            { username: 'invalid', name: 'invalid complexity', password: 'LowerUpper'}
        )

        const res = httpMocks.createResponse()
        const next = () => {}

        validateUser(req, res, next)
        const data = JSON.parse(res._getData())
        // test_log(data)

        assert.strictEqual(res.statusCode, 400)
        assert.strictEqual(data.error, 'Validation failed')
        assert.strictEqual(data.details, 'Password must include at least one uppercase letter, one number, and one special character')
    })

    test('Test6: validation fails with username less than 4 characters', async () => {
        const req = mockRequest('POST', { username: '123', name: 'short username', password: 'LowerUpper8!'})

        const res = httpMocks.createResponse()
        const next = () => {}

        validateUser(req, res, next)
        const data = JSON.parse(res._getData())

        assert.strictEqual(res.statusCode, 400)
        assert.strictEqual(data.error, 'Validation failed')
        assert.strictEqual(data.details, 'Usernmae must be at least 4 characters long')
    })
})

describe('Tech property validation', () => {
    test('Test1: validation passes', async () => {
        const req = mockRequest('POST', testData.getValidTech())
        test_log(req.body)
        
        const res = httpMocks.createResponse()
        const next = () => {}

        validateTech(req, res, next)

        assert.strictEqual(res.statusCode, 200)
    })

    test('Test2: validation fails with missing name', async () => {
        const req = mockRequest('POST', testData.getMissingFieldTech())

        const res = httpMocks.createResponse()
        const next = () => {}

        validateTech(req, res, next)
        const data = JSON.parse(res._getData())

        assert.strictEqual(res.statusCode, 400)
        assert.strictEqual(data.error, 'Validation failed');
        assert.strictEqual(data.details, 'Name is required');
    })
    test('Test3: validation fails with missing icon', async () => {
        const req = mockRequest('POST', testData.getMissingiconTech())

        const res = httpMocks.createResponse()
        const next = () => {}

        validateTech(req, res, next)
        const data = JSON.parse(res._getData())

        assert.strictEqual(res.statusCode, 400)
        assert.strictEqual(data.error, 'Validation failed');
        assert.strictEqual(data.details, 'icon is required');
    })
})