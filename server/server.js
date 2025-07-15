import { app } from './app.js'
import { PORT } from './utils/config.js'
import { info } from './utils/logger.js'

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})

// let projects = [
//   {
//     id: 1,
//     projectNo: 1,
//     title: "First Project",
//     description: "This is my first project",
//     tech_stacks: "react",
//     image: "should image be stored in db?",
//     important: true
//   },
// ]
