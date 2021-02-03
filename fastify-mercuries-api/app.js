const Fastify = require('fastify')
const AutoLoad = require('fastify-autoload')
const cors = require('fastify-cors')

const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

const mercurius = require('mercurius')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const User = require('./db/models/User')
const Post = require('./db/models/Post')
const Comment = require('./db/models/Comment')
require('./db')

const build = (opts = {}) => {
  const app = Fastify(opts)

  app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes')
  })

  app.register(cors, {
    origin: true
  })

  app.register(mercurius, {
    schema: makeExecutableSchema({
      typeDefs,
      resolvers
    }),
    context: async ({}) => {
      return { User, Post, Comment }
    }
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
