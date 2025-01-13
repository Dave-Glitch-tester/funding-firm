const AppError = require('./AppError')
const errorHandler = (err, req, res, next) => {

    if (err instanceof AppError) {
        return res.status(err.statusCode).render("error", { err: err.message })
    }
    res.status(500).send('Something went wrong')
    next()
}

module.exports = errorHandler
