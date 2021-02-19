const asyncHandler = require("express-async-handler")
const User = require("../models/User")



// @desc   auth user & get token
// @route  POST /api/users/login
// @access public
exports.authUser = asyncHandler(async (req, res, next) => {
    const { email, password} = req.body;

    //Validate email and password
    if(!email || !password){
        return next(new Error('Please provide an email', 400))
    }

    //Check for the user
    const user = await User.findOne({email: email}).select('+password');

    if(!user){
        return next(new Error('Invalid credentials', 401))
    }
   
    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return next(new Error('Invalid credentials', 401))
    }

    // Generate a token
    const token = user.getSignedJwtToken()

    res.status(200).json({success: true, token});
    
});


// @desc   Register a new user
// @route  POST /api/users
// @access public
exports.registerUser = asyncHandler(async(req, res) => {
    const {name ,email, password, gender, voterNo, aadharNumber, address, dateOfBirth, phoneNumber} = req.body
    const userExists = await User.findOne({email})
 
    
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email, 
        password,
        gender,
        voterNo,
        aadharNumber,
        address,
        dateOfBirth,
        phoneNumber

    })

    const token = user.getSignedJwtToken()
    if(user){
      return  res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            gender,
            voterNo,
            aadharNumber,
            address,
            dateOfBirth,
            phoneNumber,
            isAdmin: user.isAdmin,
            age: user.age,
            token
        })
    } else{
        res.status(400)
        throw new Error('Invalid User data')
    }
})

// @desc   Get user profile
// @route  GET /api/users/profile
// @access private
exports.getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    const token = user.getSignedJwtToken()
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            voterNo: user.voterNo,
            aadharNumber: user.aadharNumber,
            address: user.address,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            token
        })
    } else{
        res.status(404)
        throw new Error('User not found')
    }
})

