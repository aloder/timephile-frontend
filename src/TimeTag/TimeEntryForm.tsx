import * as React from 'react';
import * as Yup from 'yup';

import { Button, Card } from '@blueprintjs/core';
import { Field, Form, Formik } from 'formik';

const renderFormComponents = (nameError: any, descriptionError: any) => {
    return (
       <Form style={{display: 'flex', justifyContent: 'center', paddingTop: 20}}>
           <Card style={{ minWidth:'30%'}}>
               <h3>Add Time Tag</h3>
                <Field 
                   className={`pt-input ${(nameError) ? "pt-intent-danger" : ""}`}
                   name="timeTag.name" 
                   placeholder="Name *"
                   /> 
               <p className="pt-form-helper-text">{nameError}</p>
               <Field 
                   className={`pt-input ${(descriptionError) ? "pt-intent-danger" : ""}`} 
                   name="timeTag.description" 
                   placeholder="Description"
                   />
               <p className="pt-form-helper-text">{descriptionError}</p>
               <Button type="submit" >Submit</Button>
           </Card>
       </Form>
    );
}

class TimeTagForm extends React.Component<ITimeTagProps> {
    public render(){
        return (
        <div>
            <Formik
                initialValues={{
                    timeTag: {
                        description: '',
                        name: '',
                    }
                }}
                validationSchema={schema}
                onSubmit={values => this.props.submit(values.timeTag)}
                render={props => {
                    const { timeTag } = props.errors
                    if(timeTag){
                        return (renderFormComponents(timeTag.name, timeTag.description));
                    }
                    return(renderFormComponents(null, null));
                }}
            />
        </div>
        );
    }
}
 


interface ITimeTagProps {
    submit(model: {name: string, description: string}): void;
}
const schema = Yup.object().shape({
        timeTag: Yup.object().shape({
            description: Yup.string(),
            name: Yup.string()
                .required('Required'),
        })
  });
export default TimeTagForm;
