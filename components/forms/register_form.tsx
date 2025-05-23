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

export default function RegisterForm() {
    const [name, setName] = useState<string>("");
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

    const createUser = async () => {
        try {
            console.log("Criando usuário...");
            console.log("Nome: ", name);
            console.log("Email: ", email);
            console.log("Passoword: ", password);
            console.log("COnfirmPAssword: ", confirmPassword);
            handleSubmit();
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            setErrorMessage("Erro ao criar usuário");
        }
    };

    return (
        <View style={styles.container}>
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <SafeAreaView style={styles.container}>
                <TextInputBase
                    placeholder="Digite seu nome"
                    value={name}
                    onChangeText={setName}
                />
                <TextInputBase
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                />
                <PasswordInput
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                />
                <PasswordInput
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </SafeAreaView>
            <SubimitButton
                onClick={createUser}
                label="Cadastrar"
            ></SubimitButton>

            <View style={styles.boxLink}>
                <Text style={styles.text}>Dúvidas? </Text>
                <Link href="/explore">
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
