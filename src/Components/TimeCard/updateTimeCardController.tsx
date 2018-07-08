import * as React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { DELETE_TIME_LOG, UPDATE_TIME_LOG } from "../../graphql/mutation";
import {
  DeleteTimeLog,
  DeleteTimeLogVariables,
  timeLogs_timeLogs,
  UpdateTimeLog,
  UpdateTimeLogVariables
} from "../../schemaTypes";
import { EditCardView } from "./edit";

class UpdateTimeCardController extends React.PureComponent<timeLogs_timeLogs> {
  private submit = async (
    values: UpdateTimeLogVariables,
    mutation: MutationFn<UpdateTimeLog, UpdateTimeLogVariables>
  ) => {
    await mutation({
			variables: { ...values }
    });
  };
  private deleteThis = async (
    values: DeleteTimeLogVariables,
    mutation: MutationFn<DeleteTimeLog, DeleteTimeLogVariables>
  ) => {
    await mutation({
      variables: { ...values }
    });
  };
  public render() {
    return (
      <Mutation mutation={DELETE_TIME_LOG}>
        {deleteRecord => {
          return (
            <Mutation mutation={UPDATE_TIME_LOG}>
              {mutation => {
                return (
                  <EditCardView
                    submit={(values: UpdateTimeLogVariables) =>
                      this.submit(values, mutation)
                    }
                    delete={({ id }: { id: string }) =>
                      this.deleteThis({ id }, deleteRecord)
                    }
                    {...this.props}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Mutation>
    );
  }
}
export default UpdateTimeCardController;
