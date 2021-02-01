class ApiError extends Error {
  constructor (error) {
    super(error.message)
    this.name = 'ApiError'
    this.key = error.name
    Error.captureStackTrace(this, this.constructor)
    this.status = 400
  }
}

module.exports = ApiError
