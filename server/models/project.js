import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    projectNo: Number,
    title: String,
    description: String,
    tech_stacks: String,
    demoUrl: String,
    githubUrl: String,
    imageUrl: String,
    important: Boolean,
})

projectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Project = mongoose.model('Project', projectSchema)

export { Project } 