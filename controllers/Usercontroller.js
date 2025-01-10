const User = require('../models/User');
const Userschema = require('../schema');
const { unAuthenticatedError, BadRequest } = require('../Error');
const { Attachcookie } = require('../utils/Attachcookie');
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new unAuthenticatedError('please input Credentials')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new BadRequest("User not found")
    }
    const ispasswordMatch = await user.comparePassword(password)
    if (!ispasswordMatch) {
        throw new unAuthenticatedError("Incorrect password")
    }
    const token = await user.createJwt()
    res.cookie('authorize', token, {
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
    })
    req.flash("success", `Welcome back ${user.username} to funding firm`)
    res.redirect('/home/dashboard')
}

const register = async (req, res) => {
    // const { error } = Userschema.validate(req.body)
    // error.details.map((el) => {
    //     console.log(el)
    // })

    const { username, password, email, fname, lname } = req.body;
    const user = await User.findOne({ username })
    if (user) {
        // Refacator here to throw error
        return res.status(500).json({ msg: "username already exist" })
    }
    const isFirstUser = await User.countDocuments({}) === 0;
    const role = isFirstUser ? 'admin' : 'user';
    const newUser = await User.create({ username, password, email, fname, lname, role })
    await newUser.save()

    req.flash("success", "You have created an account")
    res.send("successful")
}

const logout = async (req, res) => {
    res.cookie('authorize', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.status(200).json({ msg: 'user logged out!' });
};


module.exports = { login, register, logout }