const Fastify = require('fastify')
const path = require('path')
const AutoLoad = require('fastify-autoload')
const cors = require('fastify-cors')
const formBody = require('fastify-formbody')
const multipart = require('fastify-multipart')

const config = require('config')
const ApiError = require('./models/ApiError')
const { NO_AUTHORIZATION } = require('./data/errors')

require('./db')

const build = (opts = {}) => {
  const app = Fastify(opts)

  app.register(formBody)

  app.register(multipart)

  app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes')
  })

  app.register(cors, {
    origin: true
  })

  app.setErrorHandler(function (error, request, reply) {
    let errorResponse
    if (error.name === 'ApiError') {
      reply = reply.code(400)
      errorResponse = { ...error, message: error.message }
    } else if (typeof error === 'string' || error instanceof String) {
      errorResponse = new Error(error)
    } else {
      errorResponse = error
    }
    app.log.error(errorResponse)
    reply.send(errorResponse)
  })

  return app
}

module.exports = build
