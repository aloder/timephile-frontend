import { Button, Card } from '@blueprintjs/core';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import { IUserProps } from '../AuthRequired';
import MyDateInput from '../Components/Form/MyDateInput';
import TimeTagSelector from '../Components/Form/TimeTagSelector';
import TimeToggle from '../Components/Form/TimeToggle';



class TimeEntryForm extends React.Component<ITimeLogProps> {
    public renderFormComponents(titleError: any, textError: any, dateError: any, startTimeError: any, endTimeError: any) {
    return (
       <Form>
           <Card>
               <h3>Add Time</h3>
                <Field 
                   className={`pt-input pt-fill ${(titleError) ? "pt-intent-danger" : ""}`}
                   name="timeLog.title" 
                   placeholder="Title*"
                   /> 
               <p className="pt-form-helper-text">{titleError}</p>
               <Field 
                   className={`pt-input pt-fill ${(textError) ? "pt-intent-danger" : ""}`} 
                   name="timeLog.text" 
                   placeholder="Description"
                   />
               <p className="pt-form-helper-text">{textError}</p>
               <Field 
                    name="timeLog.date" 
                    render={({ field }:{ field: any } ) => (
                        <MyDateInput {...field} />
                    )}
                    /> 
                <p>{dateError}</p>
                <div style={{display: 'inline-flex', flexDirection: 'column'}}>
                   <p style={{padding: 1, margin: 1}}className="pt-ui-text">Start Time</p> 
                    <Field 
                        name="timeLog.startTime" 
                        render={({ field }:{ field: any } ) => (
                            <TimeToggle {...field} />
                        )}
                        /> 
                    <p className="pt-form-helper-text">{startTimeError}</p>
                </div>
                <div style={{display: 'inline-flex', flexDirection: 'column'}}>
                   <p style={{padding: 1, margin: 1}}>End Time</p>
                    <Field 
                        name="timeLog.endTime" 
                        render={({ field }:{ field: any } ) => (
                            <TimeToggle {...field} />
                        )}
                        /> 
                    <p className="pt-form-helper-text">{endTimeError}</p>
                </div>
                <div>
                    <Field
                        name="timeLog.timeTagId"
                        render={({ field } : { field: any })=> (
                            <TimeTagSelector {...field}/>
                        )}
                    />
                </div>
                <p />
               <Button type="submit" >Submit</Button>
           </Card>
       </Form>
    );
   }
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
                        timeTagId: '',
                        title: '',
                    }
                }}
                validationSchema={schema}
                onSubmit={values => {
                    const { timeLog } = values;
                    const { startTime, endTime, date } = values.timeLog;
                    const formatTime = (currentDate: Date, time: Date):Date => {
                        const newDate = new Date(currentDate);
                        newDate.setSeconds(time.getSeconds());
                        newDate.setMinutes(time.getMinutes());
                        newDate.setHours(time.getHours());
                        return newDate;
                    }
                    timeLog.startTime = formatTime(date, startTime);
                    timeLog.endTime = formatTime(date, endTime); 
                    if (timeLog.startTime > timeLog.endTime){
                        timeLog.endTime.setDate(timeLog.endTime.getDate() + 1);
                    }
                    this.props.submit(timeLog)
                }}
                render={props => {
                    const { timeLog } = props.errors
                    if(timeLog){
                        return (this.renderFormComponents(timeLog.title, timeLog.text,timeLog.date, timeLog.startTime, timeLog.endTime));
                    }
                    return(this.renderFormComponents(null, null, null, null, null));
                }}
            />
        </div>
        );
    }
}
 


interface ITimeLogProps extends IUserProps{ 
    submit(model: {title: string, text: string, startTime: Date, endTime: Date, timeTagId: string}): void;
}
const schema = Yup.object().shape({
        timeLog: Yup.object().shape({
            date: Yup.date()
            .required('Required'),
            endTime: Yup.date().required('Required'),
            startTime: Yup.date()
                .required('Required'),
            text: Yup.string(),
            timeTagId: Yup.string(),
            title: Yup.string()
                .required('Required'),
        })
  });
export default TimeEntryForm;
