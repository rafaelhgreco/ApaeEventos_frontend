import type { JSX } from 'react';
import { ViewProps } from 'react-native';
import { ButtonProps, DateFieldProps, InputProps, SelectProps } from './atoms';

/* ----------------------
   GRID
----------------------- */
export interface GridSpan {
  /** Número de colunas ocupadas (1 a 12) */
  span?: number;
}

/* ----------------------
   FIELD TYPES
----------------------- */
export type InputField = {
  type: 'input';
  key: string;
  props: InputProps;
  span?: number;
  description?: string;
};

export type NumberField = {
  type: 'number';
  key: string;
  props: InputProps;
  span?: number;
  description?: string;
};

export type ButtonField = {
  type: 'button';
  key: string;
  props: ButtonProps;
  span?: number;
};

export type SelectField = {
  type: 'select';
  key: string;
  props: SelectProps;
  span?: number;
};

export type DateField = {
  type: 'date' | 'time';
  key: string;
  props: DateFieldProps;
  span?: number;
};

/* ----------------------
   CUSTOM FIELD
----------------------- */
export type CustomField = {
  type: 'custom';
  key: string;
  props: {
    render: () => JSX.Element;
  };
  span?: number;
};

/* ----------------------
   FIELD GROUP
----------------------- */
export type FieldGroup = {
  type: 'group';
  key: string;
  title?: string;
  description?: string;
  children: FormField[];
};

/* ----------------------
   UNION TYPE
----------------------- */
export type FormField =
  | InputField
  | NumberField
  | ButtonField
  | SelectField
  | DateField
  | CustomField
  | FieldGroup;

/* ----------------------
   GENERIC FORM PROPS
----------------------- */
export interface GenericFormProps extends ViewProps {
  fields: FormField[];

  containerStyle?: object;
  title?: string;
  titleStyle?: object;

  showDatePicker?: Record<string, boolean>;
  toggleDatePicker?: (key: string, visible: boolean) => void;

  spacing?: number;
}
