import { border, paddings } from "@/styles/themes";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SubmitButtonProps {
    onClick: () => void;
    label: string | number;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, onClick }) => {
    return (
        <TouchableOpacity onPress={onClick} style={styles.button}>
            <Text style={styles.text}>{String(label)}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FF9800",
        padding: paddings.medium,
        borderRadius: border.radiusMedium,
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 16,
    },
});

export default SubmitButton;
