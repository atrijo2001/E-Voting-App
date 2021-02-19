const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of the Political party'],
    },
    manifesto: {
        type: String,
        required: true
    },
    numberOfMembers : {
        type: Number
    },
    numberOfCandidates: {
        type: Number,
        required: true
    }
})

const Party = mongoose.model('Party', PartySchema)

module.exports = Party