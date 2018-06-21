import gql from 'graphql-tag';

export const ME = gql`
 query{
    me {
        id
        email
        name
    }
 }
`;
export const TIME_LOGS = gql`
 query($userId: ID!){
     timeLogs(userId: $userId){
         id
         title
         text
         startTime
         endTime
         tags {
             id
             name
             description
         }
     }
 }
`;

export const TIME_TAGS = gql`
    query($userId: ID!){
        timeTags(userID: $userId){
            id
            name
            description
        }
    }
`
