import { Alignment, AnchorButton, Navbar } from '@blueprintjs/core';
import { gql } from 'apollo-boost';
import * as React from 'react';
import { Query } from 'react-apollo';

const GET_VIEWER = gql`
  {
    me {
      first_name
      last_name
      email
    }
  }
`;
class Nav extends React.Component {
  public componentDidMount(){
      document.title = "Timephile";
  }
  public render(){
    return(
      <Navbar className="pt-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading><span className="pt-icon-shield"/> Timephile</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />
            <Query query={GET_VIEWER}>
              {({ loading, error, data, client }) => {
                if (loading) { return <p>Loading</p>; }
              if (error || !data || !data.viewer) { return <AnchorButton className="pt-minimal" href="/login" icon="log-in" text="Login" />; }
                return (
                  <div>
                    <AnchorButton className="pt-minimal" href="/login" icon="user" text={`Welcome ${data.viewer.first_name}`} />
                    <AnchorButton  className="pt-minimal" href="/logout" icon="log-out" text="Logout" />
                  </div>
                )
              }}
            </Query>
        </Navbar.Group>
      </Navbar>
    )
  }
}

export default Nav;