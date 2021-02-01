const User = require('../db/models/User')

exports.getCurrentUser = async (req, res) => {
  let user = req.body
  user = await User.findByUsername(user.username)
  res.send(user)
}
