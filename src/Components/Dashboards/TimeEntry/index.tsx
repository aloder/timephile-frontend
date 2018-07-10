import { Card } from "@blueprintjs/core";
import * as Moment from "moment";
import * as React from "react";

import { IUserProps } from "../../../AuthRequired";
import TimeLogsRangeQuery from "../../Apollo/Query/TimeLogsRangeQuery";
import TimeCircle from "../../CircleSlider/TimeCircle";
import DateSelector from "../../DateSelector";
import TimeCardsColumn from "../../TimeCards/TimeCardsColumn";

class Home extends React.Component<IUserProps, { selectedDate: Date }> {
  public constructor(props: any) {
    super(props);
    this.state = { selectedDate: new Date(Moment().format("l")) };
  }
  public onChange(event: any) {
    const { value } = event.target;
    if (!value) {
      return;
    }
    this.setState({
      selectedDate: new Date(Moment(value).format("l"))
    });
  }
  public render() {
    const { selectedDate } = this.state;
    const endDate = new Date(selectedDate);
    endDate.setDate(endDate.getDate() + 1);
    return (
      <div style={ContainerStyle}>
        <div>
          <DateSelector
            onChange={event => this.onChange(event)}
            value={selectedDate}
          />
        </div>
        <div style={{ ...flexGrow }}>
          <TimeLogsRangeQuery startDate={selectedDate} endDate={endDate}>
            {data => (
              <React.Fragment>
                <div>
                  <TimeCircle data={data} />
                </div>
                <Card style={{ ...flexGrow, flexDirection: "column" }}>
                  <TimeCardsColumn
                    data={data}
                    selectedDate={selectedDate}
                    endDate={endDate}
                  />
                </Card>
              </React.Fragment>
            )}
          </TimeLogsRangeQuery>
        </div>
      </div>
    );
  }
}
const ContainerStyle: React.CSSProperties = {
  position: "absolute",
  top: 50,
  right: 0,
  left: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "row"
};

const flexGrow: React.CSSProperties = {
  display: "flex",
  flexGrow: 1
};
export default Home;
