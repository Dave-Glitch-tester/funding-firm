const AppError = require('./AppError')
class NotFound extends AppError {
    constructor(message) {
        super(message)
        this.statusCode = 404
    }
}

module.exports = NotFound