const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUsers = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('please send all Fields')
    }

    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('user already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json(
            {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
                
            }
        )
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUsers = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    const comparedPasswords = await bcrypt.compare(password, user.password)
    if(user && comparedPasswords) {
        res.status(200).json(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
                    
            }
        )
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getMe = asyncHandler(async (req, res) => {
    res.json({message: 'User Data'})
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {registerUsers, loginUsers, getMe }