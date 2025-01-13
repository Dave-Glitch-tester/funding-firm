const express = require('express')
const Router = new express.Router()
const catchAsync = require('../utils/catchAsync')
const { getSingleUser, getAllUser, updatePassword, post } = require("../controllers/DashBoardController")


Router.route('/admin').get(catchAsync(getAllUser))
Router.route("/dashboard").get(catchAsync(getSingleUser)).patch(catchAsync(updatePassword)).post(post)


module.exports = Router