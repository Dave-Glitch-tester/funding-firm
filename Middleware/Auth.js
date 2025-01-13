const jwt = require('jsonwebtoken')
const { unAuthenticatedError } = require('../Error')
const Auth = (req, res, next) => {
    try {
        const token = req.signedCookies.authorize
        if (!token) {
            req.flash("error", "You must be logined in")
            throw new unAuthenticatedError("Please provide token for the Route")
        }
        const verify = jwt.verify(token, process.env.SECRET_PHASE)
        const { userId, username, role } = verify
        req.user = { userId, username, role }
        next()
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = Auth