import * as React from 'react';
import Query from '.';
import { TIME_TAGS } from '../../../graphql/query';
import { timeTags, timeTagsVariables } from '../../../graphql/query/__generated__/timeTags';
import MeQuery from './MeQuery';

export const TimeTagQuery:React.SFC<
  { children(data: timeTags): React.ReactNode}
> = ({children}) => (
  <MeQuery>
    {({ id }) => (
      <Query<timeTags, timeTagsVariables> 
        query={TIME_TAGS}
        variables={{userId: id}}
        >
        {(data)=>(
          children(data)
        )}
      </Query>
    )}
  </MeQuery>
)