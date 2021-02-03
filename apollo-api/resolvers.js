module.exports = {
  Query: {
    posts: async (_, args, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        })
      return posts
    },
    post: async (_, { id }, { Post }) => {
      const post = await Post.findById(id)
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'comments',
          model: 'Comment'
        })
      return post
    }
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, description, creatorId },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        description,
        createdBy: creatorId
      }).save()
      return newPost
    }
  },
  Post: {
    comments: async (post, args, { Comment }) => {
      return await Comment.find({ postId: post._id })
    }
  }
}
