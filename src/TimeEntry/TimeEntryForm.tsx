import { Button, Card, Switch } from "@blueprintjs/core";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";

import MyDateInput from "../Components/Form/MyDateInput";
import TimeTagSelector from "../Components/Form/TimeTagSelector";
import TimeToggle from "../Components/Form/TimeToggle";

class TimeEntryForm extends React.Component<
  ITimeLogProps,
  { isEnterRange: boolean }
> {
  public constructor(props: ITimeLogProps) {
    super(props);
    this.state = { isEnterRange: false };
  }
  public renderFormComponents(
    titleError: any,
    textError: any,
    dateError: any,
    startTimeError: any,
    endTimeError: any
  ) {
    return (
      <Form>
        <Card>
          <h3>Add Time</h3>
          <Field
            className={`pt-input pt-fill ${
              titleError ? "pt-intent-danger" : ""
            }`}
            name="timeLog.title"
            placeholder="Title*"
          />
          <p className="pt-form-helper-text">{titleError}</p>
          <Field
            className={`pt-input pt-fill ${
              textError ? "pt-intent-danger" : ""
            }`}
            name="timeLog.text"
            placeholder="Description"
          />
          <p className="pt-form-helper-text">{textError}</p>
          <Field
            name="timeLog.date"
            render={({ field }: { field: any }) => <MyDateInput {...field} />}
          />
          <p>{dateError}</p>
          <Switch
            checked={this.state.isEnterRange}
            label="Enter Range"
            onChange={() =>
              this.setState({ isEnterRange: !this.state.isEnterRange })
            }
          />
          <div hidden={!this.state.isEnterRange}>
            <div style={{ display: "inline-flex", flexDirection: "column" }}>
              <p style={{ padding: 1, margin: 1 }} className="pt-ui-text">
                Start Time
              </p>
              <Field
                name="timeLog.startTime"
                render={({ field }: { field: any }) => (
                  <TimeToggle {...field} />
                )}
              />
              <p className="pt-form-helper-text">{startTimeError}</p>
            </div>
            <div style={{ display: "inline-flex", flexDirection: "column" }}>
              <p style={{ padding: 1, margin: 1 }}>End Time</p>
              <Field
                name="timeLog.endTime"
                render={({ field }: { field: any }) => (
                  <TimeToggle {...field} />
                )}
              />
              <p className="pt-form-helper-text">{endTimeError}</p>
            </div>
          </div>
          <div hidden={this.state.isEnterRange}>
            <Field
              className={`pt-input pt-fill ${
                titleError ? "pt-intent-danger" : ""
              }`}
              name="timeLog.totalTime"
              placeholder="Total Time"
            />
          </div>
          <div>
            <Field
              name="timeLog.timeTagId"
              render={({ field }: { field: any }) => (
                <TimeTagSelector {...field} />
              )}
            />
          </div>
          <p />
          <Button type="submit">Submit</Button>
        </Card>
      </Form>
    );
  }
  public render() {
    return (
      <div>
        <Formik
          initialValues={{
            timeLog: {
              date: new Date(),
              endTime: new Date(),
              startTime: new Date(),
              totalTime: "",
              text: "",
              timeTagId: "",
              title: ""
            }
          }}
          validationSchema={schema}
          onSubmit={values => {
            const { timeLog } = values;
            const { totalTime, ...ret } = { ...timeLog };
            const ret2 = Object.assign(ret, {
              totalTime: Number.parseInt(totalTime)
            });
            if (this.state.isEnterRange) {
              delete ret2.totalTime;
            } else {
              delete ret2.startTime;
              delete ret2.endTime;
            }

            this.props.submit(ret2);
          }}
          render={props => {
            const { timeLog } = props.errors;
            if (timeLog) {
              return this.renderFormComponents(
                timeLog.title,
                timeLog.text,
                timeLog.date,
                timeLog.startTime,
                timeLog.endTime
              );
            }
            return this.renderFormComponents(null, null, null, null, null);
          }}
        />
      </div>
    );
  }
}

interface ITimeLogProps {
  submit(model: {
    title: string;
    text: string;
    totalTime: number;
    date: Date;
    startTime: Date;
    endTime: Date;
    timeTagId: string;
  }): void;
}
const schema = Yup.object().shape({
  timeLog: Yup.object().shape({
    date: Yup.date().required("Required"),
    endTime: Yup.date(),
    startTime: Yup.date(),
    totalTime: Yup.string().matches(/^[0-9]*/gm, "Must be a number"),
    text: Yup.string(),
    timeTagId: Yup.string(),
    title: Yup.string().required("Required")
  })
});
export default TimeEntryForm;
