const express = require('express')
const Router = new express.Router()
const { getSingleUser, getAllUser } = require("../controllers/DashBoardController")
Router.route("/").get()


module.exports = Router