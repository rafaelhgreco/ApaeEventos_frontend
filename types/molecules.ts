import { ViewProps } from "react-native";
import { ButtonProps, DateFieldProps, InputProps, SelectProps } from "./atoms";

export interface FormField {
    type: "input" | "button" | "date" | "time" | "number" | "select";
    props: InputProps | ButtonProps | DateFieldProps | SelectProps;
    key: string;
}

export interface GenericFormProps extends ViewProps {
    fields: FormField[];
    containerStyle?: object;
    title?: string;
    titleStyle?: object;
    showDatePicker?: Record<string, boolean>;
    toggleDatePicker?: (key: string, visible: boolean) => void;
}
