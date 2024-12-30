const express = require('express')
const Router = new express.Router()
const { login, register } = require("../controllers/Usercontroller")
const catchAsync = require('../utils/catchAsync')

Router.route("/login").post(catchAsync(login))
Router.route("/register").post(catchAsync(register)) 