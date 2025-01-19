const jwt = require('jsonwebtoken')
const { unAuthenticatedError } = require('../Error')
const Auth = (req, res, next) => {
    try {
        const token = req.signedCookies.authorize
        if (!token) {
            throw new unAuthenticatedError("Please provide token for the Route")
        }
        const verify = jwt.verify(token, process.env.SECRET_PHASE)
        const { userId, username, role } = verify
        req.user = { userId, username, role }
        next()
    }
    catch (err) {
        next(err)
    }
}
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new unAuthenticatedError("You are not permitted to access this route")
        }
        next()
    }
}
module.exports = { Auth, authorizeRoles }