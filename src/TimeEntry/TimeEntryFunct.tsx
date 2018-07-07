import * as React from "react";
import { ChildMutateProps, graphql } from "react-apollo";

import { CREATE_TIME_LOG } from "../graphql/mutation";
import { TIME_LOGS_RANGE } from "../graphql/query";
import {
  createTimeLog,
  createTimeLogVariables,
  timeLogsRange,
  timeLogsRangeVariables
} from "../schemaTypes";

class C extends React.PureComponent<
  ChildMutateProps<ITimeEntryProps, createTimeLog, createTimeLogVariables>
> {
  private submit = async (model: createTimeLogVariables) => {
    const { data } = await this.props.mutate({
      update: (store, { data: d }) => {
        if (!d) {
          return;
        }
        const query: timeLogsRange | null = store.readQuery({
          query: TIME_LOGS_RANGE,
          variables: { ...this.props.variables }
        });
        if (query && query.timeLogsRange) {
          store.writeQuery({
            query: TIME_LOGS_RANGE,
            variables: { ...this.props.variables },
            data: {
              timeLogsRange: [d!.createTimeLog, ...query.timeLogsRange]
            }
          });
        }
      },
      variables: { ...model }
    });
    return data;
  };
  public render() {
    return this.props.children({ submit: this.submit });
  }
}

interface ITimeEntryProps {
  query: any;
  variables: timeLogsRangeVariables;
  children: (
    data: {
      submit: (values: createTimeLogVariables) => Promise<createTimeLog | null>;
    }
  ) => JSX.Element | null;
}
export const TimeEntryFunction = graphql<
  ITimeEntryProps,
  createTimeLog,
  createTimeLogVariables
>(CREATE_TIME_LOG)(C);
