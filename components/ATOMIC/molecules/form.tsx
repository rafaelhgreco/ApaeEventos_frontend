import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ButtonProps, InputProps } from "../../../types/atoms";
import { FormField, GenericFormProps } from "../../../types/molecules";
import Button from "../atoms/button";
import Input from "../atoms/input";

const GenericForm: React.FC<GenericFormProps> = ({
    fields,
    containerStyle,
    title,
    titleStyle,
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
});

export default GenericForm;
