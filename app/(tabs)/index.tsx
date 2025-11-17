import GenericForm from "@/components/ATOMIC/molecules/form";
import ParallaxScrollView from "@/components/ParallaxScrollView";
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

/**
 * HomeScreen renders the login form and ensures that it remains visible
 * when the on‑screen keyboard is active. It does this by wrapping the
 * form contents in a KeyboardAvoidingView and ScrollView, which adjust the layout
 * appropriately for iOS and Android. A simple Animated.View is used
 * to slide the form up slightly when an input gains focus, providing a
 * smooth transition effect. The ParallaxScrollView continues to provide
 * the scrolling header effect behind the form.
 */
export default function HomeScreen() {
    const { formFields, error } = useHome();
    // Animated value to translate the form when an input is focused.
    const translateY = useRef(new Animated.Value(0)).current;

    // Augment form fields with focus handlers to animate the form up/down.
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
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <View style={styles.container}>
                    <Image
                        style={styles.reactLogo}
                        source={require("@/assets/images/logo_apae.png")}
                    />
                </View>
            }
        >
            {/**
             * KeyboardAvoidingView pushes its children up when the keyboard
             * appears. The keyboardVerticalOffset compensates for the
             * parallax header height.
             */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={120}
            >
                {/**
                 * ScrollView ensures that content can be scrolled when the keyboard
                 * covers part of the screen. The contentContainerStyle with flexGrow
                 * ensures the form expands to fill available space.
                 */}
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <ThemedView style={{ flex: 1 }}>
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
        </ParallaxScrollView>
    );
}