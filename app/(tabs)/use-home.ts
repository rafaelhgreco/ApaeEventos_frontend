import { getUserRole, signIn } from "@/lib/cognito";
import { FormField } from "@/types/molecules";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

interface FormData {
    email: string;
    password: string;
}

interface UseHomeController {
    handleSignIn: () => Promise<void>;
    handleInputChange: (field: string) => (value: string) => void;
    handleRegister: () => void;
    handleConfirmAccount: () => void;
    handleReset: () => void;
}

interface UseHomeReturn {
    controller: UseHomeController;
    formData: FormData;
    loading: boolean;
    error: string | null;
    formFields: FormField[];
}

export const useHome = (): UseHomeReturn => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const controller: UseHomeController = {
        handleSignIn: async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await signIn(formData.email, formData.password);
                const token = result.session.getIdToken().getJwtToken();
                console.log("Token JWT:", token);

                const role = await getUserRole();
                console.log("Função do usuário:", role);

                Alert.alert(
                    "Sucesso",
                    `Login realizado com sucesso! (${role})`
                );

                if (role === "admin") {
                    router.replace("/management");
                } else if (role === "staff") {
                    router.replace("/management");
                } else {
                    router.push("/user_events");
                }
            } catch (err: any) {
                console.error("Erro no login Cognito:", err);
                setError(err.message);
                Alert.alert(
                    "Erro no login",
                    err.message || "Erro desconhecido"
                );
            } finally {
                setLoading(false);
            }
        },

        handleInputChange: (field: string) => (value: string) => {
            setFormData((prev) => ({ ...prev, [field]: value }));
        },

        handleRegister: () => {
            router.push("/public_register");
        },

        handleConfirmAccount: () => {
            router.push("../confirm_register");
        },

        handleReset: () => {
            setFormData({ email: "", password: "" });
            setError(null);
        },
    };

    const formFields: FormField[] = [
        {
            type: "input",
            key: "email",
            props: {
                placeholder: "Digite seu e-mail",
                value: formData.email,
                onChangeText: controller.handleInputChange("email"),
                keyboardType: "email-address",
                autoCapitalize: "none",
            },
        },
        {
            type: "input",
            key: "password",
            props: {
                placeholder: "Digite sua senha",
                value: formData.password,
                onChangeText: controller.handleInputChange("password"),
                isPassword: true,
            },
        },
        {
            type: "button",
            key: "submitSignIn",
            props: {
                label: loading ? "Entrando..." : "Iniciar sessão",
                onPress: controller.handleSignIn,
                variant: "primary",
                containerStyle: {
                    marginTop: 16,
                    backgroundColor: "#FF9800",
                },
            },
        },
        {
            type: "button",
            key: "submitSignUp",
            props: {
                label: "Fazer Cadastro",
                onPress: controller.handleRegister,
                variant: "primary",
                containerStyle: { marginTop: 16 },
            },
        },
        {
            type: "button",
            key: "confirmAccount",
            props: {
                label: "Confirmar Conta",
                onPress: controller.handleConfirmAccount,
                variant: "outline",
                containerStyle: {
                    marginTop: 8,
                    borderColor: "#007AFF",
                },
                textStyle: {
                    color: "#007AFF",
                },
            },
        },
        {
            type: "button",
            key: "reset",
            props: {
                label: "Limpar",
                onPress: controller.handleReset,
                variant: "outline",
                containerStyle: { marginTop: 8 },
            },
        },
    ];

    return {
        controller,
        formData,
        loading,
        error,
        formFields,
    };
};
