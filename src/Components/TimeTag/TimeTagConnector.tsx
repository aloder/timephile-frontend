import * as React from 'react';

import { timeTags_timeTags } from '../../graphql/query/__generated__/timeTags';
import UpdateTimeTag from '../Apollo/Mutation/UpdateTimeTag';
import { EditTimeTagForm } from './UpdateTimeTagForm';

class TimeTagConnector extends React.PureComponent<timeTags_timeTags> {

  public render() {
    return (
      <UpdateTimeTag>
        {(submit) =>(
          <EditTimeTagForm update={submit} {...this.props}/>
        )}
      </UpdateTimeTag>
    );
  } 
}
export default TimeTagConnector;
