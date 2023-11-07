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
            ...body,
            password: hashed
        })
        const saved = await userDoc.save()

        // MOngoose -> Vanilla JS
        const user = saved.toObject()

        delete user.password

        res.json(user)

    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}
// Get user by id 
const getUsersById = async (req, res) => {
    const {
        params,
        query
    } = req;
    const id = params.id;

    // Get boolean from query params strings
    const includeSnippets = util.queryToBoolean(query.snippets);
    const includeBookmarks = util.queryToBoolean(query.bookmarks);

    try {
        const virtuals = [];

        if (includeSnippets) {
            virtuals.push('snippets');
