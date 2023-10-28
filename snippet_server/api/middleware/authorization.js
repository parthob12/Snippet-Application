const jwt = require('jsonwebtoken')

const config = require('../../config.json')

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorzied: no token.' })
