/** server/models/_projectModel.js */

import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tech' }],
        required: true,
        validate: [array => array.length > 0, 'At least one tech is required']
    },
    demoUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
    imagePath: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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