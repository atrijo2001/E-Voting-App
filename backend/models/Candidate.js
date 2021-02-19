const mongoose = require('mongoose')

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of the candidate']
    },
    email: {
        type: String,
        required: [true, 'Please enter the name of the candidate']
    },
    party: {
        type: mongoose.Schema.objectId,
        ref: 'Party',
        required: [true, 'Please enter the name of the party you belong to.']
    },
    criminalRecord: {
        type: Boolean,
        default: false
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    age: {
        type: Number
    }
})

CandidateSchema.pre('save', async function(next){
    this.age = 2021 - this.dateOfBirth.getFullYear()
    next()
})

const Candidate = mongoose.model('Candidate', CandidateSchema)

module.exports = Candidate