import GenericForm from "@/components/ATOMIC/molecules/form";
import { createTicket } from "@/services/ticket_services";
import { FormField } from "@/types/molecules";
import { useNavigation } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { styles } from "./styles/register.style";

export default function TicketsScreen() {
    const [formData, setFormData] = useState({
        eventId: "",
        tipo: "",
        email: "",
    });
    const [loading, setLoading] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const eventId = searchParams.get("eventId");
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Criar Novo Ingresso",
        });
    }, [navigation]);

    useEffect(() => {
        if (eventId) {
            setFormData((prev) => ({ ...prev, eventId: String(eventId) }));
        }
    }, [eventId]);

    const submitForm = async () => {
        setLoading(true);
        try {
            const token = "await auth().currentUser?.getIdToken();";
            if (!token) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }

            await createTicket(
                {
                    eventId: formData.eventId,
                    tipo: formData.tipo,
                    email: formData.email,
                },
                token
            );

            Alert.alert("Sucesso", "Ticket Criado!");

            setFormData({
                eventId: "",
                tipo: "",
                email: "",
            });
        } catch (error) {
            console.error("Erro ao cadastrar evento:", error);
            Alert.alert("Erro", "Falha ao cadastrar ticket.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setFormData({ eventId: "", tipo: "", email: "" });
    };

    const formFields: FormField[] = [
        {
            type: "select",
            key: "tipo",
            props: {
                label: "Tipo de ingresso",
                options: [
                    { label: "Meia", value: "Meia" },
                    { label: "Inteira", value: "Inteira" },
                    { label: "VIP", value: "VIP" },
                ],
                selectedValue: formData.tipo,
                onValueChange: handleInputChange("tipo"),
            },
        },
        {
            type: "input",
            key: "email",
            props: {
                label: "E-mail",
                placeholder: "Digite o e-mail de quem está comprando",
                keyboardType: "email-address",
                value: formData.email,
                onChangeText: handleInputChange("email"),
            },
        },
        {
            type: "button",
            key: "submitSignUp",
            props: {
                label: "Gerar ingresso",
                onPress: submitForm,
                variant: "primary",
                containerStyle: { marginTop: 16 },
                loading: loading,
            },
        },
        {
            type: "button",
            key: "reset",
            props: {
                label: "Limpar",
                onPress: handleReset,
                variant: "outline",
                containerStyle: { marginTop: 8 },
            },
        },
    ];

    return (
        <GenericForm
            title="Selecione os dados do ingresso"
            fields={formFields}
            style={styles.registerForm}
        />
    );
}
