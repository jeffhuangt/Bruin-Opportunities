const mongoose = require('mongoose')

const Schema = mongoose.Schema

const opportunitySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    },
    pay: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Opportunity', opportunitySchema)