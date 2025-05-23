import { border, colors, paddings, shadows } from "@/styles/themes";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
    isValidEmailFormat,
    isValidPassword,
} from "../../validations/input_validations";
import SubimitButton from "../ATOMIC/atoms/submit_button";
import { TextInputBase } from "../ATOMIC/atoms/text_input_base";
import { PasswordInput } from "../ATOMIC/molecules/password_input";
import { ThemedText } from "../ThemedText";
// import CustomButton from "../atoms/button";
// import CustomTextInput from "../atoms/text_input";

export default function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const router = useRouter();

    const handleSubmit = () => {
        if (!isValidEmailFormat(email)) {
            setEmailError("Email inválido");
            alert("Email inválido");
            return;
        }

        if (!isValidPassword(password)) {
            setPasswordError(
                "A senha deve ter pelo menos 8 caracteres e conter caracteres especiais"
            );
            alert(
                "A senha deve ter pelo menos 8 caracteres e conter caracteres especiais"
            );
            return;
        }
        router.push("/management");
    };

    return (
        <View style={styles.container}>
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <ThemedText style={styles.title}>
                Faça login na sua conta
            </ThemedText>
            <SafeAreaView style={styles.container}>
                <TextInputBase
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <PasswordInput
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                />
            </SafeAreaView>
            <SubimitButton
                onClick={handleSubmit}
                label="Entrar"
            ></SubimitButton>

            <View style={styles.boxLink}>
                <Text style={styles.text}>Não tem uma conta? </Text>
                <Link href="/register">
                    <Text style={[styles.text, styles.link]}>Registre-se</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: paddings.large,
        backgroundColor: colors.background,
        shadowColor: shadows.shadowColor,
        shadowOffset: shadows.shadowOffset,
        borderRadius: border.radiusMedium,
    },
    text: {
        color: colors.text,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        padding: paddings.medium,
        borderRadius: border.radiusMedium,
        marginBottom: paddings.large,
    },
    link: {
        color: colors.primary,
        textDecorationLine: "underline",
        fontWeight: "bold",
    },
    boxLink: {
        flexDirection: "row",
        marginTop: paddings.large,
    },
    button: {
        backgroundColor: colors.button,
        color: colors.button,
    },
    title: {
        fontSize: 20,
        marginBottom: paddings.large,
        padding: paddings.medium,
        textAlign: "center",
    },
});
