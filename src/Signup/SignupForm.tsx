import { Button, Card, Elevation } from "@blueprintjs/core";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
const renderFormComponents = (
  nameError: any,
  emailError: any,
  passwordError: any
) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
      <Card elevation={Elevation.TWO} style={{ minWidth: "25%" }}>
        <h2>Sign Up</h2>
        <Form className={"bp3-form-group bp3-intent-danger"}>
          <Field
            className={`bp3-input ${nameError ? "bp3-intent-danger" : ""}`}
            name="signup.name"
            placeholder="Full Name"
          />
          <p className="bp3-form-helper-text">{nameError}</p>
          <Field
            className={`bp3-input ${emailError ? "bp3-intent-danger" : ""}`}
            name="signup.email"
            placeholder="Email"
          />
          <p className="bp3-form-helper-text">{emailError}</p>
          <Field
            className={`bp3-input ${passwordError ? "bp3-intent-danger" : ""}`}
            name="signup.password"
            type="password"
            placeholder="Password"
          />
          <p className="bp3-form-helper-text">{passwordError}</p>
          <Button type="submit">Submit</Button>
        </Form>
      </Card>
    </div>
  );
};

class SigupForm extends React.Component<ISignupProps> {
  public render() {
    return (
      <div>
        <Formik
          initialValues={{
            signup: {
              email: "",
              name: "",
              password: ""
            }
          }}
          validationSchema={schema}
          onSubmit={values => this.props.submit(values.signup)}
          render={props => {
            let emailError;
            let passwordError;
            let nameError;
            if (props.errors && props.errors.signup) {
              if (props.touched.signup && props.touched.signup.email) {
                emailError = props.errors.signup.email;
              }
              if (props.touched.signup && props.touched.signup.name) {
                nameError = props.errors.signup.name;
              }
              if (props.touched.signup && props.touched.signup.password) {
                passwordError = props.errors.signup.password;
              }
            }
            return renderFormComponents(nameError, emailError, passwordError);
          }}
        />
      </div>
    );
  }
}

interface ISignupProps {
  submit(model: { name: string; email: string; password: string }): void;
}
const schema = Yup.object().shape({
  signup: Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Required"),
    name: Yup.string()
      .matches(/\w+\s{1}\w+/, "Not a valid full name")
      .required("Required"),
    password: Yup.string().required("Required")
  })
});
export default SigupForm;
