import { gql } from 'apollo-boost'

export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      imageUrl
      categories
      description
      likes
      createdDate
      messages {
        _id
        messageBody
        messageDate
        messageUser {
          _id
          username
          avatar
        }
      }
    }
  }
`
