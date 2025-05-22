import { border, colors, paddings, shadows } from "@/styles/themes";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
    isValidEmailFormat,
    isValidPassword,
} from "../../validations/input_validations";
import SubimitButton from "../ATOMIC/atoms/submit_button";
// import CustomButton from "../atoms/button";
// import CustomTextInput from "../atoms/text_input";

export default function RegisterForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
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
            <TextInput
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={[styles.text, styles.input]}
            />
            <TextInput
                placeholder="Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                style={[styles.text, styles.input]}
            />
            <TextInput
                placeholder="Confirme sua senha"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={[styles.text, styles.input]}
            />
            <SubimitButton
                onClick={handleSubmit}
                label="Cadastrar"
            ></SubimitButton>

            <View style={styles.boxLink}>
                <Text style={styles.text}>Dúvidas? </Text>
                <Link href="/register">
                    <Text style={[styles.text, styles.link]}>
                        Acesse nosso FAQ!
                    </Text>
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
