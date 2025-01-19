const express = require('express')
const Router = new express.Router()
const { login, register, logout,renderLoginForm} = require("../controllers/Usercontroller")
const catchAsync = require('../utils/catchAsync')

Router.route("/login").post(catchAsync(login)).get(renderLoginForm)
Router.route("/register").post(catchAsync(register))
Router.route("/logout").get(logout)
module.exports = Router