const AppError = require('./AppError')
class BadRequest extends AppError {
    constructor(message,) {
        super(message)
        this.statusCode = 400
    }

}

module.exports = BadRequest