import React from "react";
import { ScrollView, Text, View } from "react-native";
import {
    ButtonProps,
    DateFieldProps,
    InputProps,
    SelectProps,
} from "../../../types/atoms";
import { FormField, GenericFormProps } from "../../../types/molecules";
import Button from "../atoms/button";
import DateTimeField from "../atoms/data_time_field";
import Input from "../atoms/input";
import Select from "../atoms/select";
import { styles } from "./form.style";

const GenericForm: React.FC<GenericFormProps> = ({
    fields,
    containerStyle,
    title,
    titleStyle,
    showDatePicker = {},
    toggleDatePicker = () => {},
    ...viewProps
}) => {
    const renderField = (field: FormField) => {
        switch (field.type) {
            case "input":
                return (
                    <Input key={field.key} {...(field.props as InputProps)} />
                );
            case "button":
                return (
                    <Button key={field.key} {...(field.props as ButtonProps)} />
                );
            case "select":
                return (
                    <Select key={field.key} {...(field.props as SelectProps)} />
                );
            case "date":
            case "time":
                return (
                    <DateTimeField
                        key={field.key}
                        {...(field.props as DateFieldProps)}
                        isVisible={!!showDatePicker[field.key]}
                        onToggle={(visible) =>
                            toggleDatePicker(field.key, visible)
                        }
                    />
                );
            case "number":
                return (
                    <Input
                        key={field.key}
                        {...(field.props as InputProps)}
                        keyboardType="numeric"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={[styles.container, containerStyle]} {...viewProps}>
            {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
            <ScrollView showsVerticalScrollIndicator={false}>
                {fields.map(renderField)}
            </ScrollView>
        </View>
    );
};

export default GenericForm;
