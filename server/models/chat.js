const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    role: {
        type: String, 
        enum: ['bot', 'user'],
        required: true,
    },
    text: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

messageSchema.set("toJSON", {
    transform: (documents, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const chat = mongoose.model("Chat", messageSchema)
module.exports = chat