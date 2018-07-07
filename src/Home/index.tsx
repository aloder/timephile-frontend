import { Button, Card, Intent } from "@blueprintjs/core";
import * as Moment from "moment";
import * as React from "react";
import { Query } from "react-apollo";
import { IUserProps } from "../AuthRequired";
import CircularSlider, { IArcObj } from "../Components/CircleSlider";
import MyDatePicker from "../Components/Form/MyDatePicker";
import TimeTagSelectorSuguestion from "../Components/Form/TimeTagSelectorSugestion";
import UpdateTimeCardController from "../Components/TimeCard/updateTimeCardController";
import { TIME_LOGS_RANGE } from "../graphql/query";
import { timeLogsRange, timeLogsRangeVariables } from "../schemaTypes";
import { TimeEntryFunction } from "../TimeEntry/TimeEntryFunct";
import TimeTag from "../TimeTag/TimeTag";
// import MyTable from './MyTable';

class Home extends React.Component<IUserProps, IIndexState> {
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
    if (!this.props.me) {
      return;
    }
    const { selectedDate } = this.state;
    const endDate = new Date(selectedDate);
    endDate.setDate(endDate.getDate() + 1);
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Card className="pt-fill">
            <h3>Select Date</h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <MyDatePicker
                showActionBar={true}
                value={selectedDate}
                name="selectedDate"
                onChange={event => this.onChange(event)}
              />
            </div>
          </Card>
          <TimeTag me={this.props.me} />
        </div>
        <div
          style={{
            flexGrow: 1,
            paddingLeft: 5,
            height: "100%",
            overflow: "auto"
          }}
        >
          <Query<timeLogsRange, timeLogsRangeVariables>
            query={TIME_LOGS_RANGE}
            variables={{
              userId: this.props.me.id,
              startDate: selectedDate,
              endDate
            }}
            fetchPolicy="cache-and-network"
          >
            {({ loading, error, data, client }) => {
              if (error) {
                return `error ${error}`;
              }
              const arcs: IArcObj[] = [];
              const convertTimeToAngle = (date: Date): number => {
                const c = new Date(date);
                const time = c.getMinutes() + c.getHours() * 60;
                return (Math.abs(time / (24 * 60) - 1) * 360 - 90) % 360;
              };
              const timeCards: Array<
                React.ReactElement<UpdateTimeCardController>
              > = [];
              if (data && data.timeLogsRange) {
                for (const r of data.timeLogsRange) {
                  if (!r!.deleted) {
                    timeCards.push(
                      <Card
                        style={{ padding: 3, paddingLeft: 10, margin: 2 }}
                        key={`card ${r!.id}`}
                      >
                        <UpdateTimeCardController key={r!.id} {...r!} />
                      </Card>
                    );
                    if (r!.totalTime == null || r!.isRange) {
                      const a1 = convertTimeToAngle(r!.startTime);
                      const a2 = convertTimeToAngle(r!.endTime);
                      let color = "blue";
                      if (r!.tags!.length > 0) {
                        color = r!.tags![0].color;
                      }
                      arcs.push({
                        id: `arc ${r!.id}`,
                        angles: [a1, a2],
                        color
                      });
                    }
                  }
                }
              }
              return (
                <div style={{ display: "inline-flex" }}>
                  <Card>
                    <CircularSlider r={400} trackWidth={75} arcs={arcs} />
                  </Card>
                  <Card style={{ minWidth: "40%" }}>
                    <h2>{Moment(selectedDate).format("l")}</h2>
                    <TimeEntryFunction
                      query={TIME_LOGS_RANGE}
                      variables={{
                        userId: this.props.me!.id,
                        startDate: selectedDate,
                        endDate
                      }}
                    >
                      {({ submit }) => (
                        <Button
                          intent={Intent.SUCCESS}
                          large={true}
                          fill={true}
                          icon="add"
                          onClick={() =>
                            submit({ title: "", date: selectedDate })
                          }
                        >
                          Add
                        </Button>
                      )}
                    </TimeEntryFunction>

                    {timeCards}
                    <TimeTagSelectorSuguestion />
                  </Card>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}
interface IIndexState {
  selectedDate: Date;
}
export default Home;
