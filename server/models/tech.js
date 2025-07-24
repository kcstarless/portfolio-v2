import mongoose from "mongoose"

const techSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
})

techSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Tech = mongoose.model('Tech', techSchema)

export { Tech }