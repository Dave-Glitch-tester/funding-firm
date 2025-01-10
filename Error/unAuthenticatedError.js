const AppError = require("./AppError")
class unAuthenticatedError extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = 401
    }
}

module.exports = unAuthenticatedError