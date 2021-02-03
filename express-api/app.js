const express = require('express')
const bodyParser = require('body-parser')

require('./db')

const Post = require('./db/models/Post')
const User = require('./db/models/User')
const Comment = require('./db/models/Comment')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.get('/api/posts', async (req, res, next) => {
  const posts = await Post.find({})
    .sort({ createdDate: 'desc' })
    .populate({
      path: 'createdBy',
      model: 'User'
    })

  return res.status(201).json(posts)
})

app.get('/api/posts/:id', async (req, res, next) => {
  const { id } = req.params
  const post = await Post.findById(id).populate({
    path: 'comments',
    model: 'Comment'
  })
  return res.status(201).json(post)
})

app.listen(9003)
