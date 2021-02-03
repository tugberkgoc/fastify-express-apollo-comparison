const faker = require('faker')

require('../../db')

const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const generateUserData = () => {
  let userData = []
  let i = 0

  while (i < 10) {
    const firstName = faker.fake('{{name.firstName}}')
    const lastName = faker.fake('{{name.lastName}}')
    const email = faker.fake(
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`
    )

    const user = {
      username: firstName,
      email,
      password: 'Test',
      required: [],
      avatar:
        'http://gravatar.com/avatar/098f6bcd4621d373cade4e832627b4f6?d=identicon'
    }

    userData.push(user)
    i++
  }

  return userData
}

const generatePostData = usersIds => {
  let postData = []
  let i = 0

  while (i < 10) {
    const createdBy = faker.random.arrayElement(usersIds)
    const title = faker.fake('{{name.title}}')
    const imageUrl = faker.fake('{{image.animals}}')
    const description = faker.fake('{{commerce.productDescription}}')
    const likes = faker.random.number({ min: 1, max: 30000 })

    const post = {
      createdBy,
      title,
      imageUrl,
      description,
      likes
    }

    postData.push(post)
    i++
  }

  return postData
}

const generateCommentData = (usersIds, postsIds) => {
  let commentData = []

  let i = 0

  while (i < 10) {
    const title = faker.fake('{{name.title}}')
    const content = faker.fake('{{commerce.productDescription}}')
    const createdBy = faker.random.arrayElement(usersIds)
    const postId = faker.random.arrayElement(postsIds)

    const comment = {
      title,
      content,
      createdBy,
      postId
    }

    commentData.push(comment)
    i++
  }

  return commentData
}

const generate = async () => {
  const users = await User.insertMany(generateUserData())
  const usersIds = users.map(x => x._id)

  const posts = await Post.insertMany(generatePostData(usersIds))
  const postsIds = posts.map(x => x._id)

  const comments = await Comment.insertMany(
    generateCommentData(usersIds, posts, postsIds)
  )

  for (let i = 0; i < comments.length; i++) {
    await Post.updateOne(
      { _id: comments[i].postId },
      { $push: { comments: comments[i]._id } },
      { new: true }
    )
  }

  console.log(`
        Data successfully added:
          - ${users.length} users added.
          - ${posts.length} posts added.
          - ${comments.length} posts added.
        `)

  process.exit()
}

generate()
