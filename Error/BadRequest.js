const AppError = require('./AppError')
class BadRequest extends AppError {
    constructor(message,) {
        super(message)
        this.statusCode = 401
    }

}

module.exports = BadRequest