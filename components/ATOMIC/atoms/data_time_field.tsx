import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns"; // Importe a função format do date-fns
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
    // Lógica para formatar o valor exibido
    const formattedValue = value
        ? mode === "date"
            ? format(value, "dd/MM/yyyy") // Usa date-fns para formatar a data
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
                <Text style={styles.dateText}>
                    {" "}
                    {/* Usa o estilo dateText criado */}
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
