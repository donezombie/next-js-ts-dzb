import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FieldInputProps, FormikProps } from 'formik';

interface DatePickerFieldI {
  type?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

const DatePickerField = (props: DatePickerFieldI) => {
  //! State
  const { field, form, label } = props;
  const { name, value, onBlur } = field || {};

  //! Function
  const handleChange = (date: any, keyboardInputValue?: string | undefined) => {
    form.setFieldValue(name, date);
  };

  //! Render
  return (
    <DatePicker
      label={label}
      value={value}
      InputProps={{
        onBlur,
        name,
        id: name,
      }}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default DatePickerField;
