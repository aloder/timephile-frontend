import { Card, H3 } from '@blueprintjs/core';
import * as React from 'react';

import MyDatePicker from './Form/Time/MyDatePicker';




class DateSelector extends React.PureComponent<{
  value: Date;
  onChange(event: any): any;
}> {
  public render() {
    return (
      <Card className="pt-fill">
        <H3>Select Date</H3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MyDatePicker
            showActionBar={true}
            value={new Date(this.props.value)}
            name="selectedDate"
            onChange={event => this.props.onChange(event)}
          />
        </div>
      </Card>
    );
  }
}
export default DateSelector;
