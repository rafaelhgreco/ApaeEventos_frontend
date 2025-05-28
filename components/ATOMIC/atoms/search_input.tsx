import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const SearchInput: React.FC<Props> = ({ value, onChangeText, placeholder }) => {
    return (
        <View style={styles.container}>
            <Ionicons
                name="search"
                size={20}
                color="#777"
                style={styles.icon}
            />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder || "Buscar..."}
                placeholderTextColor="#aaa"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
});

export default SearchInput;
