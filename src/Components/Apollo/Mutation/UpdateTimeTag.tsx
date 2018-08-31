import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import { UPDATE_TIME_TAG } from '../../../graphql/mutation';
import { updateTimeTag, updateTimeTagVariables } from '../../../graphql/mutation/__generated__/updateTimeTag';

class UpdateTimeTag extends React.PureComponent<{
  children(update: (( values: updateTimeTagVariables)=> any)): React.ReactNode
}> {
  private submit = async (
    values: updateTimeTagVariables,
    mutation: MutationFn<updateTimeTag, updateTimeTagVariables>
  ) => {
    console.warn(values)
    const data = await mutation({
      variables: values
    });
    if (data){
      return (data.errors)
    }
    return data;
  }
  public render() {
    return (
      <Mutation<updateTimeTag, updateTimeTagVariables>
        mutation={UPDATE_TIME_TAG}
      >
        {mutation => {
          return this.props.children((values)=> this.submit(values, mutation));
        }}
      </Mutation>
    );
  }
}
export default UpdateTimeTag;
