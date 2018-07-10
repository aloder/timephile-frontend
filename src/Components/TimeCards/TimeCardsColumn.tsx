import { Button, Intent } from '@blueprintjs/core';
import * as Moment from 'moment';
import * as React from 'react';

import TimeCards from '.';
import { timeLogsRange } from '../../schemaTypes';
import AddTimeLog from '../Apollo/Controller/AddTimeLog';

const TimeCardsColumn: React.SFC<{
  data: timeLogsRange;
  selectedDate: Date;
  endDate: Date;
}> = ({ data, selectedDate, endDate }) => (
  <React.Fragment>
    <div style={{ display: 'inline-flex', alignItems: 'self-end', justifyContent:'space-between', paddingBottom: 10}}>
    <h2>{Moment(selectedDate).format("l")}</h2>
    <AddTimeLog startDate={selectedDate} endDate={endDate}>
      {add => (
        <Button
          intent={Intent.SUCCESS}
          
          style={{ width: "30%", minWidth: 100}}
          icon="add"
          onClick={() => add({ title: "", date: selectedDate })}
        >
          Add
        </Button>
      )}
    </AddTimeLog>
    </div>
    <div style={{ position: "relative", overflowY: "scroll", height: "100%"}}>
    <TimeCards data={data} />
    </div>
  </React.Fragment>
);
export default TimeCardsColumn;
