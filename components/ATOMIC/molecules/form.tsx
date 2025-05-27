import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ButtonProps, DateFieldProps, InputProps } from "../../../types/atoms";
import { FormField, GenericFormProps } from "../../../types/molecules";
import Button from "../atoms/button";
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
            case "time": {
                const { value, mode, onChange, label } =
                    field.props as DateFieldProps;

                const formattedValue =
                    mode === "date"
                        ? value.toLocaleDateString()
                        : value.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                          });

                return (
                    <View key={field.key} style={{ marginBottom: 16 }}>
                        {label && <Text style={styles.label}>{label}</Text>}
                        <TouchableOpacity
                            style={styles.dateField}
                            onPress={() => toggleDatePicker(field.key, true)}
                        >
                            <Text style={{ color: "green", fontSize: 15 }}>
                                {formattedValue}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker[field.key] && (
                            <DateTimePicker
                                value={value || new Date()}
                                mode={mode}
                                display="default"
                                onChange={(event, selectedDate) => {
                                    toggleDatePicker(field.key, false);
                                    onChange(event, selectedDate);
                                }}
                            />
                        )}
                    </View>
                );
            }
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
