import { gql } from 'apollo-boost'

export const GET_POSTS = gql`
  query {
    posts {
      _id
      title
      imageUrl
      description
      likes
      createdDate
    }
  }
`

export const GET_POST_BY_ID = gql`
  query($id: ID!) {
    post(id: $id) {
      _id
      title
      imageUrl
      description
      likes
      createdDate
      comments {
        _id
        title
        content
      }
    }
  }
`
