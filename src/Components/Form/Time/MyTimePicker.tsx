import 'rc-time-picker/assets/index.css';

import { FieldProps } from 'formik';
import * as Moment from 'moment';
import TimePicker from 'rc-time-picker';
import * as React from 'react';

import { ValueToFormik } from '../Shared';


export const MyTimePicker: React.SFC<
FieldProps<any> & { prefix: React.ReactNode, style: React.CSSProperties }
> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];
  const {onChange, value, ...rest} = field;
  return (
      <TimePicker 
        onChange={(value2: any) => onChange(ValueToFormik(new Date(value2), field.name))}
        value={(value) ? Moment(value): null} 
        defaultOpenValue={Moment('6:00 pm', "hh:mm a")}
        {...rest}
        {...props}
        className={`${(errorMsg) ? "pt-danger" : ""}`}
        autoComplete="off"
        
        style={{width: '70px'}}
        showSecond={false}
        use12Hours={true}
        minuteStep={5}
        />
  )
}