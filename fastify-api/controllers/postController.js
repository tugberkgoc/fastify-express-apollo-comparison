const Post = require('../db/models/Post')

exports.getPosts = async (req, res) => {
  const posts = await Post.find({})
    .sort({ createdDate: 'desc' })
    .populate({
      path: 'createdBy',
      model: 'User'
    })
  res.send(posts)
}

exports.getUserPosts = async (req, res) => {
  const { id } = req.params
  // const id = req.params === undefined ? req.id : req.params.id
  const posts = await Post.find({
    createdBy: id
  })
  res.send(posts)
}

exports.getPost = async (req, res) => {
  const { id } = req.params
  const post = await Post.findOne({ _id: id }).populate({
    path: 'messages.messageUser',
    model: 'User'
  })
  res.send(post)
}
