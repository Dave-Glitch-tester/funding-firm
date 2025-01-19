const { unAuthenticatedError, BadRequest } = require('../Error');
const User = require('../models/User');

const getAllUser = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password');
    res.render('admin', { users })
}

const getSingleUser = async (req, res) => {
    const { userId } = req.user;
    const user = await User.findById(userId);
    res.status(200).render("dashboard", { user })
}

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new BadRequest('Please provide both values');
    }
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId })
    const checkPassword = await user.comparePassword(oldPassword)
    if (!checkPassword) {
        throw new unAuthenticatedError("Invalid crendentials")
    }
    user.password = newPassword;
    await user.save()
    res.status(200).json({ msg: "updated" })
}



module.exports = {
    getAllUser,
    getSingleUser,
    updatePassword,
}