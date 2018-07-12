import { Button, ButtonGroup, Icon, Intent } from "@blueprintjs/core";
import { Field, Form, InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { Collapse } from "react-collapse";
import * as Yup from "yup";

import { updateTimeTagVariables } from "../../graphql/mutation/__generated__/updateTimeTag";
import { timeTags_timeTags } from "../../graphql/query/__generated__/timeTags";
import { MyColorSlider } from "../Form/MyColorSlider";
import { MyEditableText } from "../Form/MyEditableText";

class UpdateTimeTagForm extends React.PureComponent<
  InjectedFormikProps<updateTimeTagVariables, updateTimeTagVariables>,
  { isEditingColor: boolean }
> {
  public state = { isEditingColor: false };
  public render() {
    const comp = Object.keys(this.props.values);
    let dif: boolean = false;
    for (const field of comp) {
      dif = dif || this.props.values[field] !== this.props.initialValues[field];
    }
    const { isEditingColor } = this.state;
    const { color } = this.props;
    const { deleted } = this.props.values;
    let formStyle: any = {};
    if (deleted) {
      formStyle = {
        backgroundColor: "#FF7373",
        borderRadius: 5
      };
    }
    return (
      <Form style={formStyle}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ margin: 2 }}>
            <Field
              name="name"
              placeholder={"Name..."}
              component={MyEditableText}
            />
          </h2>
          <Button
            minimal={true}
            intent={deleted ? Intent.SUCCESS : Intent.DANGER}
            icon={deleted ? "add" : "cross"}
            onClick={() =>
              this.props.setFieldValue("deleted", !(deleted || false))
            }
          />
        </div>
        <div style={{ paddingLeft: 10 }}>
          <Field
            name="description"
            multiline={true}
            placeholder={"Description..."}
            component={MyEditableText}
          />
        </div>
        <div
          onClick={() => this.setState({ isEditingColor: !isEditingColor })}
          style={{
            backgroundColor: color || "#00000",
            flexGrow: 1,
            width: "auto",
            cursor: "pointer",
            margin: 10,
            marginBottom: 5,
            borderRadius: 10
          }}
        >
          <Icon
            style={{ marginLeft: "auto", marginRight: 5, display: "flex" }}
            icon={isEditingColor ? "minus" : "edit"}
            color="#FFFFFF"
          />
        </div>
        <Collapse isOpened={isEditingColor} springConfig={{ stiffness: 500 }}>
          <div style={{ padding: 10 }}>
            <Field name="color" component={MyColorSlider} />
          </div>
        </Collapse>
        <Collapse isOpened={dif} springConfig={{ stiffness: 350 }}>
          <ButtonGroup
            onClick={() => this.setState({ isEditingColor: false })}
            fill={true}
            style={{ padding: 10 }}
          >
            <Button intent={Intent.SUCCESS} type="submit">
              Submit
            </Button>
            <Button
              intent={Intent.DANGER}
              type="cancel"
              onClick={() => this.props.resetForm()}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Collapse>
      </Form>
    );
  }
}

interface ITimeTagProps {
  update(variables: updateTimeTagVariables): any;
}
const schema = Yup.object().shape({
  timeTag: Yup.object().shape({
    description: Yup.string(),
    name: Yup.string(),
    color: Yup.string()
  })
});
export const EditTimeTagForm = withFormik<
  ITimeTagProps & timeTags_timeTags,
  updateTimeTagVariables
>({
  mapPropsToValues: ({ id, name, description, color, deleted }) => ({
    id,
    name,
    description,
    color,
    deleted
  }),
  validationSchema: schema,
  handleSubmit: async (values, { props: { update }, setErrors, resetForm }) => {
    const errors = await update(values);
    if (errors) {
      console.error(errors);
      setErrors(errors);
    } else {
      resetForm({ ...values });
    }
  }
})(props => <UpdateTimeTagForm {...props} />);
