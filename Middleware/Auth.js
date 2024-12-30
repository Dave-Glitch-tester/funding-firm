const jwt = require('jsonwebtoken')
const Auth = (req, res, next) => {
    try {
        const token = req.cookie.authorize
        if (!token) {

        }
        const verify = jwt.verify(token, process.env.SECRET_PHASE)
        const { userId, username } = verify
        req.user = { userId, username }
        next()
    }
    catch (err) {

    }
}

module.exports = Auth