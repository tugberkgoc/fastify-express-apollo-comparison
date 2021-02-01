const { ApolloServer } = require('apollo-server')

const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

require('dotenv').config({ path: 'variables.env' })
const User = require('./models/User')
const Post = require('./models/Post')

mongoose
  .connect(
    'mongodb://root:rootpassword@127.0.0.1:27017/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({}) => {
    return { User, Post }
  }
})

server.listen({ port: 9004 }).then(({ url }) => {
  console.log(`Server listening on ${url}`)
})
