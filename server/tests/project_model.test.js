/** server/tests/project_model.test.js */

import './_setup.js'
import * as helper from './_helper.js'
import * as testData from './_data.js'
import assert from 'node:assert'
import { test, describe } from 'node:test'
import { Project } from '../models/index.js'
import { test_log } from '#utils'

//// Test
describe('Project model: ', () => {
    test('Test1: initial projects are saved', async() => {
        const users = await helper.usersInDB()
        const projects = await helper.projectsInDB()
        assert.strictEqual(projects.length, testData.getSeedProjects(users).length)
    })

    test('Test2: can save a valid project', async () => {
        const projectsBefore = await helper.projectsInDB()
        const newProject = await helper.prepareValidProject()
        newProject.imagePath = helper.getTestImagePath()
        const saved = await new Project(newProject).save()
        const projectsAfter = await helper.projectsInDB()
        const exists = projectsAfter.some(p => p.id === saved.id)

        assert.strictEqual(saved.title, newProject.title)
        assert.strictEqual(projectsBefore.length + 1, projectsAfter.length)
        assert.ok(exists, 'Newly created project not found in DB')
    })

    test('Test3: throws validation error if user is missing', async () => {
        let error = null
        try {
            await new Project(testData.projectTemplate).save()
        } catch(err) {
            error = err
        }
        // test_log(error)
        assert.ok(error, 'Expected validation error')
        // assert.ok(error.errors.title, 'Expected error on missing title')
    })
})


