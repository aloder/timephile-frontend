import * as React from "react";

import CircleSlider, { IArcObj } from ".";
import { timeLogsRange } from "../../graphql/query/__generated__/timeLogsRange";

class TimeCircle extends React.Component<
  { data: timeLogsRange },
  { width: number; height: number }
> {
  private updateDimensions() {
    const updateHeight = window.innerHeight;
    const updateWidth = window.innerWidth;
    this.setState({ width: updateWidth, height: updateHeight });
  }
  public componentWillMount() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  public componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  public render() {
    const { data } = this.props;
    const arcs: IArcObj[] = [];
    for (const r of data.timeLogsRange) {
      if (r == null) {
        continue;
      }
      if (!r.deleted) {
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
    console.warn(this.state.width);
    const newR = (2/5*this.state.width)/2;
    return (
      <div style={{ padding: 10}}>
        <CircleSlider r={newR} trackWidth={75} arcs={arcs} />
      </div>
    );
  }
}

const convertTimeToAngle = (date: Date): number => {
  const c = new Date(date);
  const time = c.getMinutes() + c.getHours() * 60;
  return (Math.abs(time / (24 * 60) - 1) * 360 - 90) % 360;
};
export default TimeCircle;
