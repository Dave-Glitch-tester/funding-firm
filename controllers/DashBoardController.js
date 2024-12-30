const User = require('../models/User');

const getAllUser = async () => {
    const alluser = await User.find({})
}

const getSingleUser = () => {

}


module.exports = {
    getAllUser,
    getSingleUser
}