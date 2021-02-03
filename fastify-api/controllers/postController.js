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
  const post = await Post.findById(id).populate({
    path: 'comments',
    model: 'Comment'
  })
  res.send(post)
}
