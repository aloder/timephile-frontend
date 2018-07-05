import { EditableText, Intent } from '@blueprintjs/core';
import { FieldProps } from 'formik';
import * as React from 'react';
import { ValueToFormik } from './Shared';


export const MyEditableTimePicker: React.SFC<
  FieldProps<any> & { prefix: React.ReactNode, style: React.CSSProperties }
> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];
  const { onChange, ...rest} = field;
  return (
        <EditableText 
            onChange={(value) => 
                onChange(ValueToFormik(value, field.name))} 
            {...rest}
            {...props}
            intent={(errorMsg) ? Intent.DANGER : Intent.NONE}
            />
  );
};

