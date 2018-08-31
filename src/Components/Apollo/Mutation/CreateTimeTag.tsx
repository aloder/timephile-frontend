import * as React from "react";
import { ChildMutateProps, graphql } from "react-apollo";

import { CREATE_TIME_TAG } from "../../../graphql/mutation";
import {
  createTimeTag,
  createTimeTagVariables
} from "../../../graphql/mutation/__generated__/createTimeTag";
import { ME, TIME_TAGS } from "../../../graphql/query";
import { me } from "../../../graphql/query/__generated__/me";
import { timeTags } from "../../../graphql/query/__generated__/timeTags";

class CreateTimeTag extends React.PureComponent<
  ChildMutateProps<ITimeEntryProps, createTimeTag, createTimeTagVariables>
> {
  private submit = async (model: createTimeTagVariables) => {
    const { data } = await this.props.mutate({
      update: (store, { data: d }) => {
        if (!d) {
          return;
        }
        const user: me | null = store.readQuery({
          query: ME
        });
        if (!user || !user.me) {
          return;
        }
        const {
          me: { id: userId }
        } = user;
        const query: timeTags | null = store.readQuery({
          query: TIME_TAGS,
          variables: { userId }
        });
        if (query && query.timeTags) {
          store.writeQuery({
            query: TIME_TAGS,
            variables: { userId },
            data: {
              timeTags: [d!.createTimeTag, ...query.timeTags]
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
  children: (
    data: {
      submit: (values: createTimeTagVariables) => Promise<createTimeTag | null>;
    }
  ) => JSX.Element | null;
}
export default graphql<ITimeEntryProps, createTimeTag, createTimeTagVariables>(
  CREATE_TIME_TAG
)(CreateTimeTag);
