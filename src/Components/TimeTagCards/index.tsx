import { Card } from '@blueprintjs/core';
import * as React from 'react';

import { timeTags } from '../../graphql/query/__generated__/timeTags';
import TimeTagConnector from '../TimeTag/TimeTagConnector';



const TimeTagsColumn: React.SFC<{ data: timeTags}> = ({data}) =>(
  <React.Fragment>
    {data.timeTags.map((t) =>{
      if(t == null){
        return;
      }
      return <Card key={t.id}><TimeTagConnector {...t} /></Card>
    } )}
  </React.Fragment>
);
export default TimeTagsColumn;