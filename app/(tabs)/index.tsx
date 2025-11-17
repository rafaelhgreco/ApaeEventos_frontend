import GenericForm from "@/components/ATOMIC/molecules/form";
import { ThemedView } from "@/components/ThemedView";
import { useRef } from "react";
import {
    Animated,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useHome } from "../../hooks/use-home";
import { styles } from "../styles/index.style";

export default function HomeScreen() {
    const { formFields, error } = useHome();
    const translateY = useRef(new Animated.Value(0)).current;

    const fieldsWithFocusHandlers = formFields.map((field) => {
        if (field.type === "input") {
            return {
                ...field,
                props: {
                    ...field.props,
                    onFocus: () => {
                        Animated.spring(translateY, {
                            toValue: -40,
                            useNativeDriver: true,
                        }).start();
                    },
                    onBlur: () => {
                        Animated.spring(translateY, {
                            toValue: 0,
                            useNativeDriver: true,
                        }).start();
                    },
                },
            };
        }
        return field;
    });

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={120}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <ThemedView style={{ flex: 1 }}>
                    {/* Logo at the top */}
                    <View style={styles.container}>
                        <Image
                            style={styles.reactLogo}
                            source={require("@/assets/images/logo_apae.png")}
                        />
                    </View>

                    {/* Animated form */}
                    <Animated.View
                        style={{
                            transform: [{ translateY }],
                        }}
                    >
                        <View style={styles.loginForm}>
                            <GenericForm
                                title="Login"
                                fields={fieldsWithFocusHandlers}
                            />
                            {error && (
                                <Text
                                    style={{
                                        color: "red",
                                        marginTop: 12,
                                        textAlign: "center",
                                        fontSize: 14,
                                    }}
                                >
                                    {error}
                                </Text>
                            )}
                        </View>
                    </Animated.View>
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
