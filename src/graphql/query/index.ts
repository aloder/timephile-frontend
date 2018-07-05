import gql from 'graphql-tag';

export const ME = gql`
 query me {
    me {
        id
        email
        name
    }
 }
`;
export const TIME_LOGS = gql`
 query timeLogs($userId: ID!){
     timeLogs(userId: $userId){
         id
         title
         text
         date
         startTime
         deleted
         isRange
         endTime
         totalTime
         tags {
             id
             name
             description
         }
     }
 }
`;

export const TIME_LOGS_RANGE = gql`
 query timeLogsRange($userId: ID!, $startDate: DateTime!, $endDate: DateTime!){
     timeLogsRange(userId: $userId, startDate: $startDate, endDate: $endDate){
         id
         title
         text
         date
         startTime
         endTime
         deleted
         isRange
         totalTime
         tags {
             id
             name
             description
         }
     }
 }
`;

export const TIME_TAGS = gql`
    query timeTags($userId: ID!){
        timeTags(userId: $userId){
            id
            name
            description
        }
    }
`
