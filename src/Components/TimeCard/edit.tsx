import { Button, ButtonGroup, Intent, Switch, Tag } from '@blueprintjs/core';
import { Field, Form, FormikProps, withFormik } from 'formik';
import * as React from 'react';

import { timeLogs_timeLogs_tags, timeLogsRange_timeLogsRange, UpdateTimeLogVariables } from '../../schemaTypes';
import { MyEditableText } from '../Form/MyEditableText';
import { MyTimePicker } from '../Form/MyTimePicker';
import TimeTagSelectorSuguestion from '../Form/TimeTagSelectorSugestion';


interface IProps extends timeLogsRange_timeLogsRange{
    submit(values: UpdateTimeLogVariables): void;
    delete(values: { id: string }): void;
}
interface IFormValues {
    id: string;
    title: string;
    text: string | null;
    date: any | null;
    startTime: any | null;
    endTime: any | null;
    totalTime: number | null;
    tags: timeLogs_timeLogs_tags[] | null;
}
class C extends 
React.PureComponent<FormikProps<IFormValues> & IProps, { isRange: boolean }>{
    public constructor(props: FormikProps<IFormValues> & IProps){
        super(props);
        this.state = { isRange:  props.startTime != null && props.endTime != null }
    }
    public render(){
        const { tags } = this.props;
        let dif:boolean = false;
        const comp = ["id", "title", "text", "date", "startTime", "endTime", "totalTime"];
        for (const field of comp){
            dif = dif || this.props.values[field] !== this.props.initialValues[field]
        }
        const tagBubbles:Array<React.ReactElement<React.StatelessComponent>> = []
        tagBubbles.push(AddTagBubble())
        if (tags != null){
            for(const tag of tags){
            tagBubbles.push(TagBubble(tag!));
            }
        }
        return(
            <Form>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <h3 hidden={this.state.isRange}>
                        <Field 
                            name="totalTime" 
                            component={MyEditableText} 
                            minWidth={40} 
                            placeholder={"Time..."}/> 
                        <span style={{fontSize: 12}}>mins</span>
                    </h3>
                    <h3 hidden={!this.state.isRange}>
                        <Field 
                            name="startTime" 
                            component={MyTimePicker} 
                            placeholder={"Time..."}/> 
                        -
                        <Field 
                            name="endTime" 
                            component={MyTimePicker} 
                            placeholder={"Time..."}/> 
                    </h3>
                    <span style={{display: 'inline-flex', alignItems: 'center'}}>
                        {tagBubbles} 
                        <div style={{display: 'inline-flex'}} >
                            <Button 
                                type={"button"} 
                                minimal={true} 
                                icon="remove" 
                                className="pt-button pt-intent-danger"
                                onClick={() => 
                                    this.props.delete({ id: this.props.id})} 
                            />
                        </div>
                    </span>

                </div>
                <Switch 
                    style={{ float: 'right' }} 
                    checked={this.state.isRange} 
                    label="Enter range" 
                    onChange={() => 
                        this.setState({ isRange: !this.state.isRange })} />
                <h3>
                    <Field
                        name="title"
                        placeholder={"Title..."}
                        component={MyEditableText}
                    />
                </h3>
                <div style={{ paddingLeft: 10}}>
                    <Field
                        name="text"
                        multiline={true}
                        placeholder={"Description..."}
                        component={MyEditableText}
                    />
                </div>
                <ButtonGroup hidden={!dif} fill={dif} style={{padding: 10}}>
                    <Button 
                        intent={Intent.SUCCESS} 
                        type="submit" >
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
            </Form>
        );
    }
}

const TagBubble = (tag:timeLogs_timeLogs_tags) => (
  <Tag 
    style={{backgroundColor:`${tag.color}`}} 
    key={tag.id}
    onRemove={
        (event) => console.warn(`remove ${event.currentTarget.accessKey}`)}
    > 
    {tag.name}
  </Tag>
)
const AddTagBubble = () => (
    <Tag
        intent={Intent.SUCCESS}
        interactive={true}
        style={{fontSize: 12}}
    >
        <TimeTagSelectorSuguestion />
        {/* <span className="pt-icon-add"/> Add */}
    </Tag>
)
export const EditCardView = withFormik<IProps, IFormValues>({
    mapPropsToValues: (props) => ({
        id: props.id,
        title: props.title,
        text: props.text,
        date: props.date,
        startTime: (props.totalTime) ? null : props.startTime,
        endTime: (props.totalTime)? null : props.endTime,
        totalTime: props.totalTime,
        tags: props.tags}),
    handleSubmit: async (values, { props, setErrors, resetForm}) => {
      const errors = await props.submit(values);
      if (errors) {
        setErrors(errors);
      } else {
        resetForm(values);
      }
    }
  })(C);