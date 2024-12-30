const mongoose = require('mongoose')

const connectDb = () => {
    const db = mongoose.connection
    mongoose.connect("mongodb://localhost:27017/funding-firm")
    db.once("open", () => {
        console.log("connected to the Database")
    })
    db.on('error', console.error.bind(console, "connection error:"))
}

module.exports = connectDb