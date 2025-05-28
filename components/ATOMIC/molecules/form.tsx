import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ButtonProps, DateFieldProps, InputProps } from "../../../types/atoms";
import { FormField, GenericFormProps } from "../../../types/molecules";
import Button from "../atoms/button";
import DateTimeField from "../atoms/data_time_field";
import Input from "../atoms/input";

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 24,
        textAlign: "center",
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
        color: "#333",
    },
    dateField: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 12,
        borderRadius: 8,
        justifyContent: "center",
        backgroundColor: "#ffffff",
    },
});

export default GenericForm;
