const joi = require('joi')

const Userschema = joi.object({
    email: joi.string().required(),
    username: joi.string().required(),
    fname: joi.string().required().min(3),
    username: joi.string().required().min(3),
    lname: joi.string().required().min(3),
    password: joi.string().required().min(6)
})

module.exports = Userschema