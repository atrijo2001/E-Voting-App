const Candidate = require('../models/Candidate')
const asyncHandler = require('express-async-handler')

// @desc   Register a new candidate
// @route  POST /api/candidates
// @access private, party
exports.registerCandidate = asyncHandler(async(req, res) => {
    const {name ,email, party, criminalRecord, dateOfBirth} = req.body
    const candidateExists = await Candidate.findOne({email})
 
    
    if(candidateExists){
        res.status(400)
        throw new Error('candidate already exists')
    }

    const candidate = await Candidate.create({
        name,
        email, 
        party,
        criminalRecord,
        dateOfBirth
    })

    if(candidate){
      return  res.status(201).json({
            _id: candidate._id,
            name: candidate.name,
            email: candidate.email,
            party,
            criminalRecord,
            dateOfBirth,
            age: candidate.age
        })
    } else{
        res.status(400)
        throw new Error('Invalid candidate data')
    }
})