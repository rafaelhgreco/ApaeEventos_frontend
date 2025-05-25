import { ViewProps } from "react-native";
import { ButtonProps, InputProps } from "./atoms";

export interface FormField {
    type: "input" | "button";
    props: InputProps | ButtonProps;
    key: string;
}

export interface GenericFormProps extends ViewProps {
    fields: FormField[];
    containerStyle?: object;
    title?: string;
    titleStyle?: object;
}
