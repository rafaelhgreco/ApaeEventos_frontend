import type { JSX } from "react";
import { ViewProps } from "react-native";

import { ButtonProps, DateFieldProps, InputProps, SelectProps } from "./atoms";

export type FormField =
  | {
      type: "input" | "button" | "date" | "time" | "number" | "select";
      props: InputProps | ButtonProps | DateFieldProps | SelectProps;
      key: string;
    }
  | {
      type: "custom";
      key: string;
      props: {
        render: () => JSX.Element;
      };
    };

export interface GenericFormProps extends ViewProps {
  fields: FormField[];
  containerStyle?: object;
  title?: string;
  titleStyle?: object;
  showDatePicker?: Record<string, boolean>;
  toggleDatePicker?: (key: string, visible: boolean) => void;
}
