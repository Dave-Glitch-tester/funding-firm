const express = require('express')
const Router = new express.Router()
const catchAsync = require('../utils/catchAsync')
const { getSingleUser, getAllUser, updatePassword } = require("../controllers/DashBoardController")


Router.route('/admin').get(catchAsync(getAllUser))
Router.route("/dashboard").get(catchAsync(getSingleUser)).patch(catchAsync(updatePassword))


module.exports = Router