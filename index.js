const express = require('express')
const connectDb = require('./db/connect')
const app = express()
const PORT = process.env.PORT || 8000
const ejs = require('ejs')
const path = require('path')
const flash = require("connect-flash")
const errorHandler = require("./Error/Errorhandler")
const userRoutes = require('./Routes/UserRoute')
const DashboardRoutes = require('./Routes/Dashboard')
const ejsMate = require("ejs-mate")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use("views", path.join(__dirname, "views"))
app.engine("ejs", ejsMate)
app.set("view engine", ejs)
app.use(flash())
app.use(errorHandler)


app.use((req, res, next) => {
    res.locals.success = req.flash("error")
    res.locals.error = req.flash("success")
    next()
})

// Routes 
app.use("/", userRoutes)
app.use("/home", DashboardRoutes)

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