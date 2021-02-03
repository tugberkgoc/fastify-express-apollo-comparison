const postController = require('../controllers/postController')

module.exports = async fastify => {
  fastify.get('/api/posts', postController.getPosts)

  fastify.get('/api/posts/:id', postController.getUserPosts)
}
