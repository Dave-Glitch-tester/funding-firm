const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const Userschema = new Schema({
    username: {
        type: String,
        required: [true, "username cannot be blank"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("E-mail is not valid!")
            }
        }
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    }
})
Userschema.pre('save', async function (next) {
    try {
        const user = this
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 10)
        }
    }
    catch (err) {
        next(err)
    }
    next()
})
Userschema.methods.comparePassword = async function (password) {
    const ismatch = await bcrypt.compare(password, this.password)
    return ismatch
}
Userschema.methods.createJwt = function () {
    return jwt.sign({ userId: this._id, username: this.username, role: this.role }, process.env.SECRET_PHASE, { expiresIn: process.env.EXPIRESIN })
}

module.exports = model("User", Userschema)