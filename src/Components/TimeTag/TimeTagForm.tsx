import { Button, Card } from "@blueprintjs/core";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { MyColorSlider } from "../Form/MyColorSlider";


const renderFormComponents = (nameError: any, descriptionError: any) => {
  return (
    <Form>
      <Card className="pt-fill">
        <h3>Add Time Tag</h3>
        <Field
          className={`pt-input pt-fill ${nameError ? "pt-intent-danger" : ""}`}
          name="timeTag.name"
          placeholder="Name *"
        />
        <p className="pt-form-helper-text">{nameError}</p>
        <Field
          className={`pt-input pt-fill ${
            descriptionError ? "pt-intent-danger" : ""
          }`}
          name="timeTag.description"
          placeholder="Description"
        />
        <p className="pt-form-helper-text">{descriptionError}</p>
        <Field name="timeTag.color" component={MyColorSlider} />
        <Button type="submit">Submit</Button>
      </Card>
    </Form>
  );
};

class TimeTagForm extends React.Component<ITimeTagProps> {
  public render() {
    return (
      <div>
        <Formik
          initialValues={{
            timeTag: {
              description: "",
              name: "",
              color: ""
            }
          }}
          validationSchema={schema}
          onSubmit={values => this.props.submit(values.timeTag)}
          render={props => {
            const { timeTag } = props.errors;
            if (timeTag) {
              return renderFormComponents(timeTag.name, timeTag.description);
            }
            return renderFormComponents(null, null);
          }}
        />
      </div>
    );
  }
}

interface ITimeTagProps {
  submit(model: { name: string; description: string; color: string }): void;
}
const schema = Yup.object().shape({
  timeTag: Yup.object().shape({
    description: Yup.string(),
    name: Yup.string().required("Required"),
    color: Yup.string()
  })
});
export default TimeTagForm;
