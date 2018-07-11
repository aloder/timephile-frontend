import { Button, ButtonGroup, Intent, Switch, Tag } from '@blueprintjs/core';
import { Field, Form, FormikProps, withFormik } from 'formik';
import * as React from 'react';

import { UpdateTimeLogVariables } from '../../graphql/mutation/__generated__/UpdateTimeLog';
import { timeLogs_timeLogs_tags } from '../../graphql/query/__generated__/timeLogs';
import { timeLogsRange_timeLogsRange } from '../../graphql/query/__generated__/timeLogsRange';
import AddTimeTagTag from '../Form/AddTimeTagTag';
import { MyEditableText } from '../Form/MyEditableText';
import { MyTimePicker } from '../Form/Time/MyTimePicker';


interface IProps extends timeLogsRange_timeLogsRange {
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
  isRange: boolean | null;
}
class EditCardDisplay extends React.PureComponent<
  FormikProps<IFormValues> & IProps
> {
  public render() {
    const { tags } = this.props.values;
    let dif: boolean = false;
    const comp = [
      "id",
      "title",
      "text",
      "date",
      "startTime",
      "endTime",
      "tags",
      "totalTime",
      "isRange"
    ];
    for (const field of comp) {
      dif = dif || this.props.values[field] !== this.props.initialValues[field];
    }
    const tagBubbles: Array<React.ReactElement<React.StatelessComponent>> = [];
    if (tags != null) {
      tags.forEach(tag => {
        tagBubbles.push(this.TagBubble(tag));
      });
    }
    tagBubbles.push(
      <Field key="Add-Tag-Bubbles" name="tags" component={AddTimeTagTag} />
    );
    const { isRange } = this.props.values;
    return (
      <Form>
        <div style={{ display: "flex", alignItems: 'center', justifyContent: "space-between" }}>
          <h3 style={{margin: 2}} hidden={isRange || false}>
            <Field
              name="totalTime"
              component={MyEditableText}
              minWidth={40}
              placeholder={"Time..."}
            />
            <span style={{ fontSize: 12 }}>mins</span>
          </h3>
          <h3 style={{margin: 2}}hidden={!isRange}>
            <Field
              name="startTime"
              component={MyTimePicker}
              placeholder={"Time..."}
            />
            -
            <Field
              name="endTime"
              component={MyTimePicker}
              placeholder={"Time..."}
            />
          </h3>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            {tagBubbles}
            <div style={{ display: "inline-flex" }}>
              <Button
                type={"button"}
                minimal={true}
                icon="remove"
                intent={Intent.DANGER}
                onClick={() => this.props.delete({ id: this.props.id })}
              />
            </div>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <h2 style={{margin: 2}}>
            <Field
              name="title"
              multiline={true}
              placeholder={"Title..."}
              component={MyEditableText}
            />
          </h2>
          <Switch
            style={{ float: "right" }}
            checked={isRange || false}
            label="Enter range"
            onChange={() =>{
              this.props.setFieldValue("isRange", !(isRange || false))
            }}
          />

        </div>
        <div style={{ paddingLeft: 10 }}>
          <Field
            name="text"
            multiline={true}
            placeholder={"Description..."}
            component={MyEditableText}
          />
        </div>
        <ButtonGroup hidden={!dif} fill={dif} style={{ padding: 10 }}>
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
      </Form>
    );
  }
  private TagBubble = (tag: timeLogs_timeLogs_tags) => (
    <Tag
      style={{ backgroundColor: `${tag.color}` }}
      key={tag.id}
      onRemove={event => {
        this.props.setFieldValue(
          "tags",
          this.props.values.tags!.filter(t => t.id !== tag.id)
        );
      }}>
      {tag.name}
    </Tag>
  );
}

export const EditCardView = withFormik<IProps, IFormValues>({
  mapPropsToValues: props => ({
    id: props.id,
    title: props.title,
    text: props.text,
    date: props.date,
    startTime: !props.isRange ? null : props.startTime,
    endTime: !props.isRange ? null : props.endTime,
    totalTime: props.totalTime,
    tags: props.tags,
    isRange: props.isRange
  }),
  handleSubmit: async (
    { tags: newTags, ...values },
    { props: { tags: oldTags, ...props }, setErrors, resetForm }
  ) => {
    const removeTagIds: string[] = [];
    const addTagIds: string[] = [];
    if (newTags != null && newTags.length > 0) {
      for (const newTag of newTags) {
        if (oldTags == null || oldTags.length === 0) {
          addTagIds.push(newTag.id);
        } else {
          if (oldTags.every(oldTag => oldTag.id !== newTag.id)) {
            addTagIds.push(newTag.id);
          }
        }
      }
    }
    if (oldTags != null && oldTags.length > 0) {
      for (const oldTag of oldTags) {
        if (newTags == null || newTags.length === 0) {
          removeTagIds.push(oldTag.id);
        } else {
          if (newTags.every(newTag => newTag.id !== oldTag.id)) {
            removeTagIds.push(oldTag.id);
          }
        }
      }
		}
    const errors = await props.submit({ removeTagIds, addTagIds, ...values });
    if (errors) {
      setErrors(errors);
    } else {
      resetForm({ ...values, tags: newTags });
    }
  }
})(EditCardDisplay);
