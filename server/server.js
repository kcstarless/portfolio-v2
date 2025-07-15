const express = require('express')
const cors = require('cors')
const app = express()

const requestLogger = require('./middleware/morgan')

app.use(express.json())
app.use(cors())

let projects = [
  {
    id: 1,
    projectNo: 1,
    title: "First Project",
    description: "This is my first project",
    tech_stacks: "react",
    image: "should image be stored in db?",
    important: true
  },
]

app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h2>Hello World</h2>')
})

app.get('/info', (request, response) => {
  response.send(`<h1>Portfolio has ${projects.length} projects</h1>`)
})

app.post('/api/projects', (request, response) => {
  const body = request.body

  if (!body.id) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const project = {
    id: body.id,
    projectNo: body.projectNo,
    title: body.title,
    description: body.description,
    tech_stacks: body.tech_stacks,
    image: body.image,
    important: body.important || false
  }

  projects = projects.concat(project)
  response.json(project)
})

app.get('/api/projects', (request, response) => {
  response.json(projects)

})

app.get('/api/projects/:id', (request, response) => {
  const id = request.params.id
  const project = projects.find(p => p.id === id)
  
  if (project) {
    response.json(project)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/projects/:id', (request, response) => {
  const id = request.params.id
  notes = projects.filter(p => p.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)