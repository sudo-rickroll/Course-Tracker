const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    url: {
        type: String,
    },
    hours: {
        type: Number,
    },
})

courseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject.__v
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Course', courseSchema)