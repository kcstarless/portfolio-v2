import * as helper from './_helper.js'
import { before, beforeEach, after } from 'node:test'

if (process.env.NODE_ENV !== 'test') {
    console.error('❌ DANGER: Tests must run with NODE_ENV=test')
    console.error('Current NODE_ENV:', process.env.NODE_ENV)
    console.error('Use: npm test')
    process.exit(1)
}

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