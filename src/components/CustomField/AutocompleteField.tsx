import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import get from 'lodash/get';
import { FieldInputProps, FormikProps } from 'formik';
import { isString } from 'lodash';

interface AutocompleteFieldI {
  type?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  options: any[];
}

const AutocompleteField = ({
  field,
  form,
  options,
  ...props
}: AutocompleteFieldI) => {
  //! State
  const { onBlur, value, name } = field;
  const { errors, touched } = form || {};

  const errorMsg = get(errors, name);
  const isTouched = get(touched, name);

  //! Function
  const onChange = (
    event: React.SyntheticEvent<Element, Event>,
    selection: any,
  ) => {
    form.setFieldValue(name, selection);
  };

  //! Render
  return (
    <Autocomplete
      id={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      options={options}
      renderInput={(params) => (
        <TextField
          label={props.label}
          value={value}
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: `new-password`, // disable autocomplete and autofill
            id: name,
          }}
          error={isTouched && !!errorMsg}
          helperText={
            isTouched && <span>{isString(errorMsg) && errorMsg}</span>
          }
        />
      )}
      {...props}
    />
  );
};

export default AutocompleteField;
