import * as React from 'react';
import * as Yup from 'yup';

import { Button, Card } from '@blueprintjs/core';
import { DateInput, TimePicker } from '@blueprintjs/datetime';
import { Field, Form, Formik } from 'formik';

const renderFormComponents = (titleError: any, textError: any, dateError: any, startTimeError: any, endTimeError: any) => {
    return (
       <Form style={{display: 'flex', justifyContent: 'center', paddingTop: 20}}>
           <Card style={{ minWidth:'30%'}}>
               <h3>Add Time</h3>
                <Field 
                   className={`pt-input ${(titleError) ? "pt-intent-danger" : ""}`}
                   name="timeLog.title" 
                   placeholder="Title*"
                   /> 
               <p className="pt-form-helper-text">{titleError}</p>
               <Field 
                   className={`pt-input ${(textError) ? "pt-intent-danger" : ""}`} 
                   name="timeLog.text" 
                   placeholder="Description"
                   />
               <p 
               className="pt-form-helper-text">{textError}</p>
               <Field 
                    style={{ display: 'flex', flexDirection: 'column'}}
                    name="timeLog.date" 
                    render={({ field }:{ field: any } ) => (
                        <div onBlur={() => field.onBlur({target: {name:"timeLog.date"}})}>
                            <DateInput
                                formatDate={date => date ? date.toLocaleDateString() : ""}
                                parseDate={str => new Date(str)}
                                placeholder={"M/D/YYYY"}
                                onChange={(date) => field.onChange({target: { value: date, name: "timeLog.date" }})}
                            />
                        </div>
                    )}
                    /> 
                <p>{dateError}</p>
                <div style={{display: 'inline-flex', flexDirection: 'column'}}>
                   <p style={{display: 'flex', padding: 1, margin: 1}}className="pt-ui-text">Start Time</p> 
                    <Field 
                        name="timeLog.startTime" 
                        render={({ field }:{ field: any } ) => (
                            <div onBlur={() => field.onBlur({target: {name:"timeLog.startTime"}})}>
                                <TimePicker
                                    useAmPm={true}
                                    onChange={(date) => field.onChange({target: { value: date, name: "timeLog.startTime" }})}
                                    />
                            </div>
                        )}
                        /> 
                    <p className="pt-form-helper-text">{startTimeError}</p>
                </div>
                <div style={{display: 'inline-flex', flexDirection: 'column'}}>
                   <p style={{padding: 1, margin: 1}}>End Time</p>
                    <Field 
                        name="timeLog.endTime" 
                        render={({ field }:{ field: any } ) => (
                            <div onBlur={() => field.onBlur({target: {name:"timeLog.endTime"}})}>
                                <TimePicker 
                                    onChange={(date) => field.onChange({target: { value: date, name: "timeLog.endTime" }})}
                                    useAmPm={true}  />
                            </div>
                        )}
                        /> 
                    <p className="pt-form-helper-text">{endTimeError}</p>
                </div>
                <p />
               <Button type="submit" >Submit</Button>
           </Card>
       </Form>
    );
   }

class TimeEntryForm extends React.Component<ITimeLogProps> {
    public render(){
        return (
            <div>
            <Formik
                initialValues={{
                    timeLog: {
                        date: new Date(),
                        endTime: new Date(),
                        startTime: new Date(),
                        text: '',
                        title: '',
                    }
                }}
                validationSchema={schema}
                onSubmit={values => this.props.submit(values.timeLog)}
                render={props => {
                    const { timeLog } = props.errors
                    if(timeLog){
                        return (renderFormComponents(timeLog.title, timeLog.text,timeLog.date, timeLog.startTime, timeLog.endTime));
                    }
                    return(renderFormComponents(null, null, null, null, null));
                }}
            />
        </div>
        );
    }
}
 


interface ITimeLogProps {
    submit(model: {title: string, text: string, startTime: Date, endTime: Date }): void;
}
const schema = Yup.object().shape({
        timeLog: Yup.object().shape({
            date: Yup.date()
            .required('Required'),
            endTime: Yup.date(),
            startTime: Yup.date()
                .required('Required'),
            text: Yup.string(),
            title: Yup.string()
                .required('Required'),
        })
  });
export default TimeEntryForm;
