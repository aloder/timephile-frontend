import { Button, Card } from '@blueprintjs/core';
import { ApolloError } from 'apollo-client';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

const renderFormComponents = (
  emailError: any,
  passwordError: any,
  error: ApolloError | undefined
) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
      <Card style={{ minWidth: "25%" }}>
        <h3>Login</h3>
        <Form className={"pt-form-group pt-intent-danger"}>
          <Field
            className={`pt-input ${emailError ? "pt-intent-danger" : ""}`}
            name="login.email"
            placeholder="Email"
          />
          <p className="pt-form-helper-text">{emailError}</p>
          <Field
            className={`pt-input ${passwordError ? "pt-intent-danger" : ""}`}
            name="login.password"
            type="password"
            placeholder="Password"
          />
          <p className="pt-form-helper-text">{passwordError}</p>
          <Button type="submit">Submit</Button>
          <div className="pt-form-helper-text">
            {error ? error.graphQLErrors[0] : ""}
          </div>
        </Form>
      </Card>
    </div>
  );
};

class LoginForm extends React.Component<ILoginProps> {
  public render() {
    return (
      <div>
        <Formik
          initialValues={{
            login: {
              email: "",
              password: ""
            }
          }}
          validationSchema={schema}
          onSubmit={values => this.props.submit(values.login)}
          render={props => {
            let emailError;
            let passwordError;
            if (props.errors && props.errors.login) {
              if (props.touched.login && props.touched.login.email) {
                emailError = props.errors.login.email;
              }
              if (props.touched.login && props.touched.login.password) {
                passwordError = props.errors.login.password;
              }
            }
            return renderFormComponents(
              emailError,
              passwordError,
              this.props.error
            );
          }}
        />
      </div>
    );
  }
}

interface ILoginProps {
  error: ApolloError | undefined;
  submit(model: { email: any; password: any }): void;
}
const schema = Yup.object().shape({
  login: Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Required"),
    password: Yup.string().required("Required")
  })
});
export default LoginForm;
