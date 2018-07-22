import { Button, Card, Elevation } from "@blueprintjs/core";
import { ApolloError } from "apollo-client";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";

const renderFormComponents = (
  emailError: any,
  passwordError: any,
  error: ApolloError | undefined
) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
      <Card elevation={Elevation.TWO} style={{ minWidth: "25%" }}>
        <h2>Login</h2>
        <Form className={"bp3-form-group bp3-intent-danger"}>
          <Field
            className={`bp3-input ${emailError ? "bp3-intent-danger" : ""}`}
            name="login.email"
            placeholder="Email"
          />
          <p className="bp3-form-helper-text">{emailError}</p>
          <Field
            className={`bp3-input ${passwordError ? "bp3-intent-danger" : ""}`}
            name="login.password"
            type="password"
            placeholder="Password"
          />
          <p className="bp3-form-helper-text">{passwordError}</p>
          <Button type="submit">Submit</Button>
          <div className="bp3-form-helper-text">
            {error ? error.graphQLErrors[0].message : ""}
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
