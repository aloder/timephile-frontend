import gql from "graphql-tag";

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
  }
`;
export const VERIFY_EMAIL = gql`
  mutation verifyEmail($link: String!) {
    verifyEmail(link: $link)
  }
`;
export const CREATE_TIME_LOG = gql`
  mutation createTimeLog(
    $title: String!
    $text: String
    $date: DateTime
    $startTime: DateTime
    $endTime: DateTime
    $totalTime: Int
    $tagIds: [ID!]
  ) {
    createTimeLog(
      title: $title
      text: $text
      date: $date
      startTime: $startTime
      endTime: $endTime
      totalTime: $totalTime
      tagIds: $tagIds
    ) {
      id
      title
      text
      date
      totalTime
      startTime
      endTime
      isRange
      deleted
      tags {
        id
        name
        color
        description
        deleted
      }
    }
  }
`;
export const UPDATE_TIME_LOG = gql`
  mutation UpdateTimeLog(
    $id: ID!
    $title: String!
    $text: String
    $date: DateTime
    $startTime: DateTime
    $endTime: DateTime
    $totalTime: Int
    $removeTagIds: [ID!]!
    $addTagIds: [ID!]!
    $isRange: Boolean
  ) {
    updateTimeLog(
      id: $id
      title: $title
      text: $text
      date: $date
      startTime: $startTime
      endTime: $endTime
      totalTime: $totalTime
      removeTagIds: $removeTagIds
      addTagIds: $addTagIds
      isRange: $isRange
    ) {
      id
      title
      text
      date
      totalTime
      startTime
      endTime
      isRange
      deleted
      tags {
        id
        name
        color
        description
        deleted
      }
    }
  }
`;
export const DELETE_TIME_LOG = gql`
  mutation DeleteTimeLog($id: ID!) {
    deleteTimeLog(id: $id) {
      id
      deleted
    }
  }
`;
export const CREATE_TIME_TAG = gql`
  mutation createTimeTag(
    $name: String!
    $description: String!
    $color: String!
  ) {
    createTimeTag(name: $name, description: $description, color: $color) {
      id
      name
      color
      description
      deleted
    }
  }
`;
export const UPDATE_TIME_TAG = gql`
  mutation updateTimeTag(
    $id: ID!
    $name: String
    $description: String
    $color: String
    $deleted: Boolean
  ) {
    updateTimeTag(id: $id, name: $name, description: $description, color: $color, deleted: $deleted) {
      id
      name
      color
      description
      deleted
    }
  }
`;