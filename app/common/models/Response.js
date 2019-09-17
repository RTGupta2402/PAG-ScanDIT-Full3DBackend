// Model class for the Response object.
class Response {
    constructor(data, message, statuscode) {
        this.data = data;
        this.message = message;
        this.statuscode = statuscode
    }
}

module.exports = { Response }