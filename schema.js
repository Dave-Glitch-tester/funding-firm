const joi = require('joi')

const Userschema = joi.object({
    email: joi.string().required(),
    username: joi.string().required()
})

module.exports = Userschema