import './_setup.js'
import * as helper from './_helper.js'
import assert from 'node:assert'
import supertest from 'supertest'
import { test_log } from '../utils/logger.js'
import { test, describe } from 'node:test'
import { app } from '../app.js'

//// Setup
const api = supertest(app)

//// Test
describe('GET /api/projects', () => {
    test('Test1: projects are returned as json', async () => {
        await api
            .get('/api/projects')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const projects = await helper.projectsInDB()

        assert.strictEqual(projects.length, 2)
    })
})

describe('GET /api/projects/:id ', () => {
    test('Test1: retrieve one project based on id', async () => {
        const projects = await helper.projectsInDB()
        const project = projects[0] 

        const response = await api.get(`/api/projects/${project.id}`)
        assert.strictEqual(response.body.id, project.id)
    })

    test ('Test2: return 404 when no match found', async () => {
        const noMatchId = '507f191e810c19729de860ea'
        const response = await api
            .get(`/api/projects/${noMatchId}`)
            .expect(404)
            
        assert.strictEqual(response.body.error, 'No matching project found')
    })

    test('Test3: returns 400 for invalid ID format', async () => {
        const invalidId = 'xxx888'
        const response = await api
            .get(`/api/projects/${invalidId}`)
            .expect(400)

        assert.strictEqual(response.body.error, 'malformatted id')
    })
})

describe ('POST /api/projects ', () => {
    test('Test1: adds new project with correct with valid properties and the new project exists', async () => {
        const token = await helper.getValidToken()
        const imagePath = helper.getTestImagePath()
        const projectsBefore = await helper.projectsInDB()
        const newProject = await helper.prepareValidProject()
        // test_log(newProject.tech)
        // test_log(newProject.user.toString())
        let req = api
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .field('title', newProject.title)
            .field('description', newProject.description)
            .field('demoUrl', newProject.demoUrl)
            .field('githubUrl', newProject.githubUrl)
            .field('user', newProject.user.toString());

        newProject.tech.forEach(id => {
            req = req.field('tech', id.toString());
        });

        const res = await req.attach('image', imagePath).expect(201);

        const projectsAfter = await helper.projectsInDB()

        assert.strictEqual(projectsBefore.length + 1, projectsAfter.length)

        const exists = projectsAfter.some(p => p.id === res.body.id)
        assert.ok(exists, 'Newly created project not found in database')
    })

    test('Test2: adding new project fails if no token is provided - 401', async() => {
        const projectsBefore = await helper.projectsInDB()
        const newProject = await helper.prepareValidProject()
        // test_log(newProject)
        await api  
            .post('/api/projects')
            .send(newProject)
            .expect(401)

        const projectsAfter = await helper.projectsInDB()

        assert.strictEqual(projectsBefore.length, projectsAfter.length)
    })

    test('Test3: adding new projects fails with invalid token', async() => {
        const invalidToken = 'xxkjasdfs'
        // test_log(token)

        const projectsBefore = await helper.projectsInDB()
        const newProject = await helper.prepareValidProject()
        // test_log(newProject)
        const res = await api  
            .post('/api/projects')
            .set('Authorization', `Bearer ${invalidToken}`)
            .send(newProject)
            .expect(401)

        const projectsAfter = await helper.projectsInDB()

        assert.strictEqual(projectsBefore.length, projectsAfter.length)
        assert.strictEqual(res.body.error, 'token invalid')
    })
})

describe('Delete a project: ', () => {
    test('Test1: deletes a project in DB', async () => {
        const token = await helper.getValidToken()
        const projectsBefore = await helper.projectsInDB()
        const projectId = projectsBefore[0].id

        await api
            .delete(`/api/projects/${projectId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const projectsAfter = await helper.projectsInDB()
        assert.strictEqual(
            projectsAfter.some(p => p.id === projectId),
            false
        )
        assert.strictEqual(projectsBefore.length - 1, projectsAfter.length)
    })

    test('Test2: fails with 401 if no token is provided', async () => {
        const project = (await helper.projectsInDB())[0]

        const response = await api
            .delete(`/api/projects/${project.id}`)
            .expect(401)

        assert.strictEqual(response.body.error, 'token missing or invalid')
    })

    test('Test3: fails with 401 if token is invalid', async () => {
        const project = (await helper.projectsInDB())[0]

        const response = await api
            .delete(`/api/projects/${project.id}`)
            .set('Authorization', 'Bearer faketoken123')
            .expect(401)

        assert.strictEqual(response.body.error, 'token invalid')
    })

    test('Test4: fails with 401 if token is expired', async () => {
        const expiredToken = await helper.getExpiredToken()
        const project = (await helper.projectsInDB())[0]

        const response = await api
            .delete(`/api/projects/${project.id}`)
            .set('Authorization', `Bearer ${expiredToken}`)
            .expect(401)

        assert.strictEqual(response.body.error, 'token expired')
    })

    test('Test5: returns 404 when project does not exist', async () => {
        const token = await helper.getValidToken()
        const nonExistentId = '507f1f77bcf86cd799439011' // valid ObjectId but not in DB

        const response = await api
            .delete(`/api/projects/${nonExistentId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)

        assert.strictEqual(response.body.error, 'No matching project found')
    })

    test('Test6: returns 400 when ID is malformed', async () => {
        const token = await helper.getValidToken()
        const malformedId = 'abc123'

        const response = await api
            .delete(`/api/projects/${malformedId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)

        assert.strictEqual(response.body.error, 'malformatted id')
    })
})
