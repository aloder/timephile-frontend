import { Button, ButtonGroup, Collapse, Intent } from '@blueprintjs/core';
import { Field, Form, InjectedFormikProps, withFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import { updateTimeTagVariables } from '../../graphql/mutation/__generated__/updateTimeTag';
import { timeTags_timeTags } from '../../graphql/query/__generated__/timeTags';
import { MyColorSlider } from '../Form/MyColorSlider';
import { MyEditableText } from '../Form/MyEditableText';



class UpdateTimeTagForm extends React.PureComponent<
  InjectedFormikProps<updateTimeTagVariables, updateTimeTagVariables>
> {
  public render() {
    const comp = Object.keys(this.props.values);
    let dif: boolean = false
    for (const field of comp) {
      dif = dif || this.props.values[field] !== this.props.initialValues[field];
    }

    return (
      <Form>
        <h2 style={{margin: 2}}>
          <Field
            name="name"
            placeholder={"Name..,"}
            component={MyEditableText}
          />
        </h2>
        <div style={{ paddingLeft: 10 }}>
          <Field
            name="description"
            multiline={true}
            placeholder={"Description..."}
            component={MyEditableText}
          />
        </div>
        <Field name="color" component={MyColorSlider} />
      <Collapse isOpen={dif}>
        <ButtonGroup fill={true} style={{ padding: 10 }}>
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
    if (errors){
      console.error(errors)
      setErrors(errors)
    }else{
      resetForm({...values})
    }
  }
})((props) => <UpdateTimeTagForm {...props} />);
