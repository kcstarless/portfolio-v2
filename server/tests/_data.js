import { Tech } from "../models/tech.js"
import { User } from "../models/user.js"

///// Project test data
const getSeedProjects = (userId, techIds) => ([
    {
        projectNo: 1,
        title: "Todo List App",
        description: "A simple task management app to add, complete, and delete tasks.",
        tech: techIds,
        demoUrl: "https://example.com/todo-app",
        githubUrl: "https://github.com/username/todo-app",
        imageUrl: "https://example.com/images/todo-app.png",
        difficulty: "easy",
        user: userId
    },
    {
        projectNo: 2,
        title: "Mini E-commerce Store",
        description: "A mock online store with product listings, cart functionality, and checkout.",
        tech: techIds,
        demoUrl: "https://example.com/ecommerce",
        githubUrl: "https://github.com/username/ecommerce-app",
        imageUrl: "https://example.com/images/ecommerce.png",
        difficulty: "medium",
        user: userId
    }
])
const getValidProject = (userId, techIds) => ({
        projectNo: 3,
        title: "Example App",
        description: "A example app does the examples",
        demoUrl: "https://example.com/todo-app",
        githubUrl: "https://github.com/username/todo-app",
        imageUrl: "https://example.com/images/todo-app.png",
        difficulty: "medium",
        tech: techIds,
        user: userId
})

///// User test data
const seedUsers = [
    { username: 'root', name: 'root user', password: 'sekret' },
    { username: 'demo', name: 'demo user', password: 'sekret' },
]
const getValidUser = () => ({
    username: 'tomtom',
    name: 'Tom Brady',
    password: 'UpperLower8~',
})
const getInvalidUser = () => ({
    // username: 'invalid',
    name: 'invalid name',
    password: 'UpperLower8~',
})
const getWhiteSpaceUser = () => ({
    username: '           ',
    name: 'white space',
    password: 'UpperLower8!'
})

////// Tech test data
const seedTechs = [
    {
        name: 'React',
        iconUrl: './location',
    },
    {
        name: 'Node',
        iconUrl: './location',
    },
    {
        name: 'JavaScript',
        iconUrl: './location',
    }
]
const getValidTech = () => ({
    name: 'HTML',
    iconUrl: './location'
})
const getMissingFieldTech = () => ({
    // name: "CSS",
    iconUrl: './location'
})
const getMissingIconUrlTech = () => ({
    name: "CSS",
    // iconUrl: './location'
})

export {
    seedTechs,
    seedUsers,
    getSeedProjects,
    getValidProject,
    getValidTech,
    getMissingFieldTech,
    getValidUser,
    getInvalidUser,
    getWhiteSpaceUser,
    getMissingIconUrlTech,
}