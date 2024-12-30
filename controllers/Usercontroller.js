const User = require('../models/User');


const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new BadRequest('please input Credentials')
    }
    const user = await User.findOne({ username })
    if (!user) {
        throw new BadRequest("User not found")
    }
    const ispasswordMatch = await user.comparePassword(password)
    if (!ispasswordMatch) {
        throw new BadRequest("Incorrect password")
    }
    const token = await user.createjwt()
    res.cookie("authorize", token, {
        httpOnly: true,
        maxAge: 3600000
    })
    res.redirect('/home')
}

const register = async (req, res) => {
    const { username, password, email, fname, lname } = req.body;
    const user = await User.findOne({ username })
    if (user) {
        return res.status(500).json({ msg: "username already exist" })
    }

    const isFirstUser = await User.countDocuments() === 0;

    isFirstUser ? 'admin' : 'user';
    const newUser = await User.create({ username, password, email, fname, lname })
}



module.exports = { login, register }