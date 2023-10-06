const User = require('./user.model')
const util = require('../util')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const config = require('../../config.json')
const middleware = require('../middleware/authorization')



// Create User 
const registerUser = async (req, res) => {
    const {
        body
    } = req
    const {
        username,
        password
    } = body

    if (!password || !username) {
        return res.status(400).json({
            error: `Please enter a valid username and password! `
        })
    }

    try {
        const salt = await bcrypt.genSalt(10)

        const hashed = await bcrypt.hash(password, salt) // hash password 
        const userDoc = new User({
