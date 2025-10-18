import GenericForm from "@/components/ATOMIC/molecules/form";
import { FormField } from "@/types/molecules";
import { useNavigation } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useLayoutEffect, useState } from "react";
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
        console.log(formData);
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
                label: "Tipo",
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
