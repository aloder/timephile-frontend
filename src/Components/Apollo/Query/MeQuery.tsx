import * as React from 'react';

import { ME } from '../../../graphql/query';
import { me, me_me } from '../../../schemaTypes';
import Query from './index';


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