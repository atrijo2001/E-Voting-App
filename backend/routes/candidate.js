const express = require('express')
const {registerCandidate} = require('../controllers/candidate')

const router = express.Router()


router.route('/registercandidate').post(registerCandidate)


module.exports = router