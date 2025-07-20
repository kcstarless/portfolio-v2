import * as helper from './_helper.js'
import { before, beforeEach, after } from 'node:test'

const originalEnv = { ...process.env }

before(async () => {
    await helper.connectTestDB()
})

beforeEach(async () => {
    process.env = { ...originalEnv }
    
    await helper.initialiseUsers()
    await helper.initialiseTechs()
    await helper.initialiseProjects()
})

after(async () => {
    await helper.disconnectTestDB()
})