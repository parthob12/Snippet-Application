const jwt = require('jsonwebtoken')

const config = require('../../config.json')

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorzied: no token.' })
    }

    try {
        
        const token = authorization.split(' ').pop()

        const verifed = jwt.verify(token, config.jwtsecret)
        req.user = verifed

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorzied: invalid token.' })
    }
}

module.exports = {
    verifyToken
}
