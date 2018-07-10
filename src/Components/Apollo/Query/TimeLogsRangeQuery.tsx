import * as React from "react";
import { TIME_LOGS_RANGE } from "../../../graphql/query";
import { timeLogsRange, timeLogsRangeVariables } from "../../../schemaTypes";
import Query from "./index";
import MeQuery from "./MeQuery";

const TimeLogsRangeQuery: React.SFC<ITimeLogsRangeQueryProps> = ({
  startDate,
  endDate,
  children
}) => {
  return (
    <MeQuery>
      {me => {
        return (
          <Query<timeLogsRange, timeLogsRangeVariables>
            query={TIME_LOGS_RANGE}
            variables={{ startDate, endDate, userId: me.id }}
          >
            {data => {
              return children(data);
            }}
          </Query>
        );
      }}
    </MeQuery>
  );
};
interface ITimeLogsRangeQueryProps {
  startDate: Date
  endDate: Date
  children(data: timeLogsRange): React.ReactNode
}
export default TimeLogsRangeQuery;
