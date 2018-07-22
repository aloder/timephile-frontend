import * as React from "react";
import { Mutation } from "react-apollo";
import { Redirect, RouteComponentProps } from "react-router";

import { VERIFY_EMAIL } from "../graphql/mutation";

class Confirm extends React.Component<
  RouteComponentProps<any>,
  { fetching: boolean; confirmed: boolean }
> {
  public constructor(props: RouteComponentProps<any>) {
    super(props);
    this.state = { fetching: false, confirmed: false };
  }
  public render() {
    return (
      <Mutation mutation={VERIFY_EMAIL}>
        {mutation => {
          if (!this.state.fetching) {
            mutation({
              variables: { link: this.props.match.params.link }
            }).then(() => this.setState({ confirmed: true }));
            this.setState({ fetching: true });
          }
          if (this.state.confirmed) {
            return <Redirect to="/login" />;
          }
          return <p> waiting...</p>;
        }}
      </Mutation>
    );
  }
}

export default Confirm;
