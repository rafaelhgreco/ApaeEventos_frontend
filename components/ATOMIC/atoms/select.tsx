import { SelectProps } from "@/types/atoms";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";
const Select: React.FC<SelectProps> = ({
    options,
    selectedValue,
    onValueChange,
}) => {
    return (
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => onValueChange(itemValue)}
            >
                {options.map((option) => (
                    <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                    />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: "#FFF",
    },
});

export default Select;
