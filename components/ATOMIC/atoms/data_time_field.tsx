import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { DateFieldProps } from "../../../types/atoms";
import { styles } from "./data_time_field.style";
import { Calendar, Clock } from "lucide-react-native";
import { colors } from "../../../app/styles/themes";

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
            ? format(value, "dd/MM/yyyy")
            : format(value, "HH:mm")
        : mode === "date"
        ? "Selecione a data"
        : "Selecione o horário";

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.dateField}
                onPress={() => onToggle(true)}
            >
                {mode === "date" ? (
                    <Calendar size={20} color={colors.primary} />
                ) : (
                    <Clock size={20} color={colors.primary} />
                )}

                <Text style={styles.dateText}>{formattedValue}</Text>
            </TouchableOpacity>

            {isVisible && (
                <DateTimePicker
                    value={value || new Date()}
                    mode={mode}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
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
