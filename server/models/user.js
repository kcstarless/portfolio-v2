import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        minlength: 4,
        maxlength: 20,
        unique: true,
        required: true,
    },
    name: String,
    passwordHash: String,
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash // password should not be revealed
    }
})

const User = mongoose.model('User', userSchema)

export { User }