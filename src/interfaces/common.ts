import { FieldInputProps, FormikProps } from "formik";

export interface PaginationFilters {
  page?: number;
}

export interface Auth {
  name: string;
  token: string;
}

export interface AdditionalFormikProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

export interface TimeValue {
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

export interface SelectOption {
  label: string;
  value: any;
}
