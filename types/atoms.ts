import { ReactElement } from "react";
import { TextInputProps, TouchableOpacityProps } from "react-native";

export interface IconProps extends Omit<TouchableOpacityProps, "style"> {
    name: string;
    size?: number;
    color?: string;
    containerStyle?: object;
}

export interface InputProps extends Omit<TextInputProps, "style"> {
    label?: string;
    error?: string;
    containerStyle?: object;
    inputStyle?: object;
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
    isPassword?: boolean;
}

export interface SelectProps extends Omit<TouchableOpacityProps, "style"> {
    title: string;
    options: Array<{ label: string; value: string }>;
    selectedValue?: string;
    onValueChange: (value: string) => void;
}

export interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
    label: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "small" | "medium" | "large";
    loading?: boolean;
    containerStyle?: object;
    textStyle?: object;
}

export interface DateFieldProps {
    value: Date;
    mode: "date" | "time" | "datetime";
    onChange: (event: any, date?: Date) => void;
    label?: string;
}
