const postController = require('../controllers/postController')

module.exports = async fastify => {
  fastify.get('/api/posts', postController.getPosts)

  fastify.get('/api/:id/posts', postController.getUserPosts)

  fastify.get('/api/post/:id', postController.getPost)
}
