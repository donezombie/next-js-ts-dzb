import React, { Fragment } from 'react';
import { TextField } from '@mui/material';
import get from 'lodash/get';
import { FieldInputProps, FormikProps } from 'formik';
import { isString } from 'lodash';

interface InputFieldI {
  type?: string;
  label?: string;
  disabled?: boolean;
  onKeyDown?: (e: any) => void;
  className?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

const InputField = (props: InputFieldI) => {
  const {
    type,
    label,
    disabled,
    onKeyDown,
    className,
    size,
    fullWidth = false,
    field,
    form,
  } = props;
  const { onChange, onBlur, value, name } = field;
  const { errors, touched } = form || {};

  const errorMsg = get(errors, name);
  const isTouched = get(touched, name);

  //! Render
  return (
    <Fragment>
      <TextField
        fullWidth={fullWidth}
        className={className}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        id={name}
        name={name}
        label={label}
        value={value}
        disabled={disabled}
        onKeyDown={onKeyDown}
        size={size}
        error={isTouched && !!errorMsg}
        helperText={isTouched && <span>{isString(errorMsg) && errorMsg}</span>}
      />
    </Fragment>
  );
};

export default React.memo(InputField);
