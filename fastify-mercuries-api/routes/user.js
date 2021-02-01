const userController = require('../controllers/userController')

module.exports = async fastify => {
  fastify.get('/api/user', userController.getCurrentUser)
}
