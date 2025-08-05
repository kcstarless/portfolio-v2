import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import { Project } from "../models/project.js"
import { Tech } from '../models/tech.js'
import { User } from "../models/user.js"
import { getMongoUri } from '../utils/config.js'
import { getSeedProjects, seedTechs, seedUsers, getValidProject } from "./_data.js"
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//// Mongo connection test helper
const connectTestDB = async () => {
    await mongoose.connect(getMongoUri())
} 
const disconnectTestDB = async () => {
    await mongoose.connection.close()
}

//// Users test helper
const initialiseUsers = async () => {
    await User.deleteMany({})
    const usersWithHashedPasswords = await Promise.all(
    seedUsers.map(async user => ({
      username: user.username,
      name: user.name,
      passwordHash: await bcrypt.hash(user.password, 10),
    }))
  )

  await User.insertMany(usersWithHashedPasswords)
}
const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}
const getValidUserId = async () => {
    const validUserId = await User.findOne().then(user => user._id);
    return validUserId
}
const getValidUser = async() => {
    return await User.findOne()
}
const getValidUserToAdd = async () => ({
  username: 'hello',
  name: 'valid name',
  passwordHash: await bcrypt.hash('UpperLower8!', 10),
})

//// Techs test helper
const initialiseTechs = async () => {
    await Tech.deleteMany({})
    await Tech.insertMany(seedTechs)
}
const techsInDB = async () => {
    const techs = await Tech.find({})
    return techs.map(tech => tech.toJSON())
}
const getValidTechIds = async () => {
    const validTechIds = await Tech.find().limit(2).then(techs => techs.map(t => t._id))
    return validTechIds
}
const getTechJSON = async () => {
    const tech = await Tech.findOne({})
    return tech.toJSON()
}
const getInvalidTechId = async () => {
    return new mongoose.Types.ObjectId().toString()
}
const getTechById = async (id) => {
    const tech = await Tech.findById(id)
    return tech.toJSON()
}
const getUpdatedTech = async (tech) => ({
    id: tech.id,
    name: tech.name,
    icon: tech.icon,
    level: 'expert',
    comments: 'this is an updated comments',
})


//// Projects test helper
const initialiseProjects = async () => {
    const user = await getValidUserId()
    const techs = await getValidTechIds()
    await Project.deleteMany({})
    await Project.insertMany(getSeedProjects(user, techs))
}
const projectsInDB = async () => {
    const projects = await Project.find({})
    return projects.map(proj => proj.toJSON())
}
const prepareValidProject = async () => {
    const userId = await getValidUserId()
    const techIds = await getValidTechIds()
    return getValidProject(userId, techIds)
}

const getTestImagePath = () => path.join(__dirname, 'test_assets', 'test_project_image.png')

//// Get valid token
const getValidToken = async () => {
    const user = await User.findOne()
    const userForToken = {
        username: user.username,
        id: user._id
    }
    return jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h'})
}

const getExpiredToken = async () => {
    const user = await User.findOne()
    const userForToken = {
        username: user.username,
        id: user._id
    }
    return jwt.sign(userForToken, process.env.SECRET, { expiresIn: '-10'})
}


export { 
    usersInDB, initialiseUsers, getValidUserId, getValidUser,
    techsInDB, initialiseTechs, getValidTechIds, getTechJSON, getInvalidTechId, getTechById,
    getUpdatedTech, getValidUserToAdd,
    projectsInDB, initialiseProjects, prepareValidProject, getTestImagePath,
    connectTestDB, disconnectTestDB,
    getValidToken, getExpiredToken
 }
