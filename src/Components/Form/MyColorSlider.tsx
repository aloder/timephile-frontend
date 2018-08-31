import { FieldProps } from "formik";
import * as React from "react";
import { SliderPicker } from "react-color";

import { ValueToFormik } from "./Shared";

export const MyColorSlider: React.SFC<FieldProps<any>> = ({
  field: { onChange, ...props }
}) => {
  return (
    <SliderPicker
      onChangeComplete={color => onChange(ValueToFormik(color.hex, props.name))}
      color={props.value}
      {...props}
    />
  );
};
