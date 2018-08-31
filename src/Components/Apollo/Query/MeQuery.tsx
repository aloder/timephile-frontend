import * as React from 'react';

import Query from '.';
import { ME } from '../../../graphql/query';
import { me, me_me } from '../../../graphql/query/__generated__/me';


const MeQuery:React.SFC<{ children(me: me_me): React.ReactNode}> = ({ children }) => {
  return (
    <Query<me> 
      query={ME}
      >
      {({ me: ret })=>{
        if (ret == null){
          return <p> Log in please...</p>
        }
        return children(ret) 
      }}
    </Query>
  )
}

export default MeQuery;