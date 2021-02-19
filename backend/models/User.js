const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    voterNo: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true
    }, 
    dateOfBirth: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    age: {
        type: Number
    }
}, {
    timestamps: true
})

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  

  // Sign JWT and return
  userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  };
  
  // Match user entered password to hashed password in database
  userSchema.methods.matchPassword = async function (enteredPassword) {
    console.log(enteredPassword)
    return await bcrypt.compare(enteredPassword, this.password);
  };


userSchema.pre('save', async function(next){
    this.age = 2021 - this.dateOfBirth.getFullYear()
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User