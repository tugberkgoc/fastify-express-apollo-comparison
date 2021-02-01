const db = require('mongoose')

db.connect(
  'mongodb://root:rootpassword@127.0.0.1:27017/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err))

module.exports = db
