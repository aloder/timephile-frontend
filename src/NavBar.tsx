import { Alignment, AnchorButton, Navbar } from "@blueprintjs/core";
import { ME } from "./graphql/query/";

import * as React from "react";
import { Query } from "react-apollo";
import { logout } from "./index";

class Nav extends React.Component {
  public componentDidMount() {
    document.title = "Timephile";
  }
  public render() {
    return (
      <Navbar className="pt-dark" style={{height: 50}}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <span className="pt-icon-time" /> Timephile
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Navbar.Divider />
          <Query query={ME} fetchPolicy="cache-only">
            {({ loading, error, data, client }) => {
              if (loading || error || !data || !data.me) {
                return (
                  <React.Fragment>
                    <AnchorButton
                      className="pt-minimal"
                      href="/signup"
                      icon="upload"
                      text="Sign Up"
                    />
                    <AnchorButton
                      className="pt-minimal"
                      href="/login"
                      icon="log-in"
                      text="Login"
                    />
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment>
                  <AnchorButton
                    className="pt-minimal"
                    href="/login"
                    icon="user"
                    text={`Welcome ${data.me.name}`}
                  />
                  <AnchorButton
                    className="pt-minimal"
                    icon="log-out"
                    text="Logout"
                    onClick={() => logout()}
                  />
                </React.Fragment>
              );
            }}
          </Query>
        </Navbar.Group>
      </Navbar>
    );
  }
}

export default Nav;
