const express = require('express')

const { ApolloServer } = require('apollo-server-express')

require('./db')

const Post = require('./db/models/Post')
const User = require('./db/models/User')

const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({}) => {
    return { User, Post }
  }
})

server.applyMiddleware({ app })

app.listen(9005)
