import React from 'react';
import MyInput from './MyInput';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, Intent, Spinner, Card, Elevation } from "@blueprintjs/core";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
const GET_VIEWER = gql`
  {
    viewer {
      first_name
      last_name
      email
    }
  }
`;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = { canSubmit: false };
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  submit(model, login) {
    login({ variables: { email: model.email, password: model.password } });
  }
  render() {
    return (
      <Mutation mutation={LOGIN}>
        {(login, { data }) => {
          if (data) {
            localStorage.setItem('token', data.login);
            window.location.reload();
          }
          return (
            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'center'}}>
              <Card  interactive={true} elevation={Elevation.TWO} style={{ display: 'flex', justifyContent: 'center'}}>

              </Card>
            </div>
          );
      }}
      </Mutation>
    );
  }
}