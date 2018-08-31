import * as React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router";

import { ME } from "./graphql/query";

class AuthRequired extends React.Component {
  public render() {
    return (
      <Query query={ME}>
        {({ loading, error, data, client }) => {
          if (loading) {
            return <div />;
          }
          if (error) {
            // TODO redirect to login and when you login or signup then go to page
            return <Redirect to={"/login"} />;
          }
          if (!data.me) {
            return <div />;
          }
          const me: { id: number; name: string; email: string } = data.me;
          const { children } = this.props;
          const childrenWithProps = React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                me: { ...me }
              });
            }
            return <div>ERROR! could not find props</div>;
          });

          return <div>{childrenWithProps}</div>;
        }}
      </Query>
    );
  }
}

export interface IUserProps {
  me?: {
    id: string;
    name: string;
    email: string;
  };
}
export default AuthRequired;
