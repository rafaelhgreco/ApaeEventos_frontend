import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "./search_input.style";

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

export default SearchInput;
