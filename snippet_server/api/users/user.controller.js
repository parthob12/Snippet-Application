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
        }

        if (includeBookmarks) {
            virtuals.push('bookmarks');
        }

        const user = await User.findOne({
            _id: id
        }).select('-password').populate(virtuals);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                error: `No user found by id: ${id}`
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

//update user
const updateUser = async (req, res) => {
    const {
        params,
        body
    } = req;
    const id = params.id;
    try {
        delete body.created
        delete body.password
        const user = await User.findOneAndUpdate({
            _id: id
        }, body, {
            new: true
        }).select('-password')
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({
                error: `No user found by id : ${id}`
            })
        }

    } catch (error) {
        res.status(500).json({
            error: error.toString()
        })

    }

}

//login 
const loginUser = async (req, res) => {
    const {
        username,
        password
    } = req.body
    
    try {
        const user = await User.findOne({
            username: username.toLowerCase()
        })
        if (!user) {
            res.status(401).json({
                error: `Invalid Credentials `
            });
            
        }
        const authenticated = await bcrypt.compare(password, user.password)

        if (authenticated) {
            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, config.jwtsecret, {
                expiresIn: '12h'
            })

            const authorized = user.toObject()
            delete authorized.password

            res.header('Authorization', `Bearer ${token}`).json(authorized)

        } else {
            res.status(401).json({
                error: 'Invalid Credentials'
            })
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.toString()
        })
    }
}
module.exports = {
    getUsersById,
    registerUser,
    updateUser,
    loginUser
};