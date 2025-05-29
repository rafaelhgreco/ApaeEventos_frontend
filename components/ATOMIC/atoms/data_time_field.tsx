import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DateFieldProps } from "../../../types/atoms";
import { styles } from "./data_time_field.style";

interface Props extends DateFieldProps {
    isVisible: boolean;
    onToggle: (visible: boolean) => void;
}

const DateTimeField: React.FC<Props> = ({
    value,
    mode,
    onChange,
    label,
    isVisible,
    onToggle,
}) => {
    const formattedValue = value
        ? mode === "date"
            ? value.toLocaleDateString()
            : value.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
              })
        : mode === "date"
        ? "Selecione a data"
        : "Selecione o horário";

    return (
        <View style={{ marginBottom: 16 }}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity
                style={styles.dateField}
                onPress={() => onToggle(true)}
            >
                <Text style={{ color: "green", fontSize: 15 }}>
                    {formattedValue}
                </Text>
            </TouchableOpacity>
            {isVisible && (
                <DateTimePicker
                    value={value || new Date()}
                    mode={mode}
                    display="default"
                    onChange={(event, selectedDate) => {
                        onToggle(false);
                        onChange(event, selectedDate);
                    }}
                />
            )}
        </View>
    );
};

export default DateTimeField;
