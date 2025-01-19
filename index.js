const express = require('express')
const connectDb = require('./db/connect')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8000
const ejs = require('ejs')
const path = require('path')
const flash = require("connect-flash")
const cookieParser = require('cookie-parser')
const { Auth } = require("./Middleware/Auth")
const errorHandler = require("./Error/Errorhandler")
const userRoutes = require('./Routes/UserRoute')
const DashboardRoutes = require('./Routes/Dashboard')
const User = require("./models/User")
const ejsMate = require("ejs-mate")
const session = require('express-session')
const methodoverride = require('method-override')

const config = {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "views"))
app.use(session(config))
app.engine("ejs", ejsMate)
app.set("view engine", "ejs")
app.use(flash())
app.use(cookieParser(process.env.COOKIESECRET))
app.use(methodoverride("_method"))

app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

// Routes 
app.use("/", userRoutes)
app.use("/home", Auth, DashboardRoutes)

// Remove before deployment
app.get("/user", async (req, res) => {
    await User.deleteMany({})
    res.send("Deleted")

})
app.get("*", (req, res) => {
    res.status(404).send(`${req.originalUrl} does not exist`)
})

app.use(errorHandler)

const start = async () => {
    try {
        await connectDb()
        app.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`)
        })

    } catch (err) {
        console.error(err)
    }
}

start()