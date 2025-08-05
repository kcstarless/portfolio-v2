///// Project test data
const getSeedProjects = (userId, techIds) => ([
    {
        title: "asdfasdfasdf List App",
        description: "A simple task management app to add, complete, and delete tasks.",
        tech: techIds,
        demoUrl: "https://example.com/todo-app",
        githubUrl: "https://github.com/username/todo-app",
        imagePath: "https://example.com/images/todo-app.png",
        user: userId
    },
    {
        title: "Mini E-commerce Store",
        description: "A mock online store with product listings, cart functionality, and checkout.",
        tech: techIds,
        demoUrl: "https://example.com/ecommerce",
        githubUrl: "https://github.com/username/ecommerce-app",
        imagePath: "https://example.com/images/ecommerce.png",
        user: userId
    }
])
const getValidProject = (userId, techIds) => ({
        title: "Example App",
        description: "A example app does the examples",
        demoUrl: "https://example.com/todo-app",
        githubUrl: "https://github.com/username/todo-app",
        tech: techIds,
        user: userId
})

///// User test data
const seedUsers = [
    { username: 'root', name: 'root user', password: 'sekret' },
    { username: 'demo', name: 'demo user', password: 'sekret' },
]
const getValiderUserBeforeHash = () => ({
    username: 'tomtom',
    name: 'Tom Brady',
    password: 'UpperLower8~',
})
const getValidUser = () => ({
    username: 'tomtom',
    name: 'Tom Brady',
    passwordHash: 'UpperLower8~',
})
const getInvalidUser = () => ({
    // username: 'invalid',
    name: 'invalid name',
    passwordHash: 'UpperLower8~',
})
const getWhiteSpaceUser = () => ({
    username: '           ',
    name: 'white space',
    passwordHash: 'UpperLower8!'
})

////// Tech test data
const seedTechs = [
    {
        name: 'React',
        icon: 'React',
        level: 'novice',
        comments: 'some comments',
    },
    {
        name: 'Node',
        icon: 'Node.js',
        level: 'novice',
        comments: 'some comments',
    },
    {
        name: 'JavaScript',
        icon: 'JavaScript',
        level: 'novice',
        comments: 'some comments',
    }
]
const getValidTech = () => ({
    name: 'HTML',
    icon: 'HTML5',
    level: 'novice',
    comments: 'some comments',
})
const getMissingFieldTech = () => ({
    // name: "CSS",
    icon: 'CSS3',
    level: 'novice',
    comments: 'some comments',
})
const getMissingiconTech = () => ({
    name: "CSS",
    // icon: './location'
    level: "novice,",
    comments: 'some comments',
})
const getSameIconName = () => ({
    name: 'HTML',
    icon: 'HTML5',
    level: 'novice',
    comments: 'some comments',
})
const getInvalidTechLevel = () => ({
    name: 'JavaScript',
    icon: 'JavaScript',
    level: 'NOVIC',
    comments: 'some comments',
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
    getMissingiconTech,
    getSameIconName,
    getInvalidTechLevel,
    getValiderUserBeforeHash,
}