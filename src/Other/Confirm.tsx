import * as React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { Redirect, RouteComponentProps } from "react-router";

import { VERIFY_EMAIL } from "../graphql/mutation";

class Confirm extends React.Component<
  RouteComponentProps<{ link: string }>,
  { fetching: boolean; confirmed: boolean; error: boolean }
> {
  public constructor(props: RouteComponentProps<any>) {
    super(props);
    this.state = { fetching: false, confirmed: false, error: false };
  }
  private async submit(mutation: MutationFn) {
    const link = this.props.match.params.link;
    this.setState({ fetching: true });
    const data = await mutation({
      variables: { link }
    });
    if (data && data.data) {
      this.setState({ confirmed: true });
    } else {
      this.setState({ error: true });
      console.error(data && data.errors);
    }
  }
  public render() {
    return (
      <Mutation mutation={VERIFY_EMAIL}>
        {mutation => {
          if (!this.state.fetching) {
            this.submit(mutation);
          }
          if (this.state.confirmed) {
            return <Redirect to="/login" />;
          }
          if (this.state.error) {
            return <h3> Error has occured </h3>;
          }
          return <p> waiting...</p>;
        }}
      </Mutation>
    );
  }
}

export default Confirm;
