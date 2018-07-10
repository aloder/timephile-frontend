import * as React from 'react';

import { createTimeLog, createTimeLogVariables } from '../../../schemaTypes';
import CreateTimeLogMutation from '../Mutation/CreateTimeLogMutation';
import MeQuery from '../Query/MeQuery';

const AddTimeLog:React.SFC<{startDate: Date, endDate: Date, children(add: (submit :createTimeLogVariables) => Promise<createTimeLog | null>): any}> = ({ startDate, endDate, children }) =>(
  <MeQuery>
    {({ id })=>(
      <CreateTimeLogMutation variables={{ startDate, endDate, userId: id }}>
      {({ submit })=>(
        children(submit)
      )}
      </CreateTimeLogMutation>
    )}
  </MeQuery>
)
export default AddTimeLog;