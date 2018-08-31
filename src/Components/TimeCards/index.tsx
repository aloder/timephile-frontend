import { Card, Elevation } from '@blueprintjs/core';
import * as React from 'react';

import { timeLogsRange } from '../../graphql/query/__generated__/timeLogsRange';
import { IArcObj } from '../CircleSlider';
import UpdateTimeForm from '../TimeCard';

const TimeCards: React.SFC<{ data: timeLogsRange }> = ({ data }) => {
  const arcs: IArcObj[] = [];
  const convertTimeToAngle = (date: Date): number => {
    const c = new Date(date);
    const time = c.getMinutes() + c.getHours() * 60;
    return (Math.abs(time / (24 * 60) - 1) * 360 - 90) % 360;
  };
  const timeCards: Array<React.ReactElement<any>> = [];
  for (const r of data.timeLogsRange) {
    if (r == null) {
      continue;
    }
    if (!r.deleted) {
      timeCards.push(
        <Card
          style={{ padding: 3, paddingLeft: 10, margin: 2 }}
          key={`card ${r!.id}`}
          elevation={Elevation.ONE}
        >
          <UpdateTimeForm key={r.id} {...r} />
        </Card>
      );
      if (r.totalTime == null || r.isRange) {
        const a1 = convertTimeToAngle(r.startTime);
        const a2 = convertTimeToAngle(r.endTime);
        let color = "blue";
        if (r.tags != null && r.tags.length > 0) {
          color = r.tags[0].color;
        }
        arcs.push({
          id: `arc ${r.id}`,
          angles: [a1, a2],
          color
        });
      }
    }
  }
  return (
    <React.Fragment>
      {timeCards}
    </React.Fragment>
  );
};

export default TimeCards;
