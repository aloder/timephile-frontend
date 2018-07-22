import { Button, Card, Elevation, H2 } from "@blueprintjs/core";
import { Field, Form, FormikProps, withFormik } from "formik";
import { GraphQLError } from "graphql";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import * as Yup from "yup";

import {
  signup_signup,
  signupVariables
} from "../graphql/mutation/__generated__/signup";

class SignupForm extends React.Component<
  ISignupProps & FormikProps<signupVariables>
> {
  public render() {
    const {
      name: nameError,
      email: emailError,
      password: passwordError
    } = this.props.errors;
    const { status } = this.props;
    return (
      <div
        style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}
      >
        <Card elevation={Elevation.TWO} style={{ minWidth: "25%" }}>
          <H2>Sign Up</H2>
          <Form className={"bp3-form-group bp3-intent-danger"}>
            <Field
              className={`bp3-input ${nameError ? "bp3-intent-danger" : ""}`}
              name="name"
              placeholder="Full Name"
            />
            <p className="bp3-form-helper-text">{nameError}</p>
            <Field
              className={`bp3-input ${emailError ? "bp3-intent-danger" : ""}`}
              name="email"
              placeholder="Email"
            />
            <p className="bp3-form-helper-text">{emailError}</p>
            <Field
              className={`bp3-input ${
                passwordError ? "bp3-intent-danger" : ""
              }`}
              name="password"
              type="password"
              placeholder="Password"
            />
            <p className="bp3-form-helper-text">{passwordError}</p>
            <Button type="submit">Submit</Button>
            <div className="bp3-form-helper-text">
              {status && status.error
                ? status.error.map((e: GraphQLError) => e.message)
                : ""}
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}

interface ISignupProps extends RouteComponentProps<any> {
  create(
    variables: signupVariables
  ): Promise<{
    errors?: GraphQLError[];
    signup?: signup_signup;
  }>;
}
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Required"),
  name: Yup.string()
    .matches(/\w+\s{1}\w+/, "Not a valid full name")
    .required("Required"),
  password: Yup.string().required("Required")
});
export default withRouter(
  withFormik<ISignupProps, signupVariables>({
    mapPropsToValues: () => ({
      name: "",
      email: "",
      password: ""
    }),
    validationSchema: schema,
    handleSubmit: async (vals, { props: { create, history }, setStatus }) => {
      const { errors, signup } = await create(vals);
      if (errors) {
        setStatus({ error: errors });
      }
      if (signup) {
        history.push(`/confirmemail`);
      }
    }
  })(SignupForm)
);
