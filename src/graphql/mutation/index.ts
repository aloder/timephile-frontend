import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            id
            email
            name
        }
    }
  }
`;


export const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
        token
        user {
            id
            email
            name
        }
    }
    SignupForm}
`;

export const CREATE_TIME_LOG = gql`
  mutation createTimeLog($title: String!, $text: String, $startTime: DateTime, $endTime: DateTime, $tagIds: [ID!]){
    createTimeLog(title: $title, text: $text, startTime: $startTime, endTime: $endTime, tagIds: $tagIds){
      id
      title
      text
      startTime
      endTime
      tags{
        id
        name
        description
      }
    }
  }
`

export const CREATE_TIME_TAG = gql`
    mutation createTimeTag($name: String!, $description: String!){
        createTimeTag(name: $name, description: $description){
            id
            name
            description
        }
    }
`
