const express = require('express')
const app = express()

app.use(express.json())

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

app.post('/api/projects', (request, response) => {
  const project = request.body
  console.log(project)
  response.json(project)
})

app.get('/', (request, response) => {
  response.send('<h2>Hello World</h2>')
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)