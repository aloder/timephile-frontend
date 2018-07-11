import { Button, Card, H2, Intent } from '@blueprintjs/core';
import * as Moment from 'moment';
import * as React from 'react';

import TimeCards from '.';
import { timeLogsRange } from '../../graphql/query/__generated__/timeLogsRange';
import AddTimeLog from '../Apollo/Controller/AddTimeLog';

const TimeCardsColumn: React.SFC<{
  data: timeLogsRange;
  selectedDate: Date;
  endDate: Date;
}> = ({ data, selectedDate, endDate }) => (
  <React.Fragment>
    <div
      style={{
        display: "inline-flex",
        alignItems: "self-end",
        justifyContent: "space-between",
        paddingBottom: 10
      }}
    >
      <H2 style={{marginBottom:0}}>{Moment(selectedDate).format("l")}</H2>
      <AddTimeLog startDate={selectedDate} endDate={endDate}>
        {add => (
          <Button
            intent={Intent.SUCCESS}
            style={{ width: "30%", minWidth: 100 }}
            icon="add"
            onClick={() => add({ title: "", date: selectedDate })}
          >
            Add
          </Button>
        )}
      </AddTimeLog>
    </div>
    <Card
      style={{
        position: "relative",
        overflowY: "auto",
        height: "100%",
        marginRight: 5,
        backgroundColor: '#f5f5f5',
        border: '1px solid #e3e3e3',
        boxShadow: 'inset 0 1px 5px rgba(0,0,0,.1)', 
        padding:3
      }}
      
    >
      <TimeCards data={data} />
    </Card>
  </React.Fragment>
);
export default TimeCardsColumn;
