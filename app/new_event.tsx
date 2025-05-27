import GenericForm from "@/components/ATOMIC/molecules/form";
import { FormField } from "@/types/molecules";
import auth from "@react-native-firebase/auth";
import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-native";

export default function NewEventScreen() {
    const [formData, setFormData] = useState({
        nome: "",
        data: new Date(),
        local: "",
        capacidade: "",
        bannerUrl: "",
    });

    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleDateChange =
        (field: string) => (_event: any, selectedDate?: Date) => {
            if (selectedDate) {
                setFormData((prev) => ({ ...prev, [field]: selectedDate }));
            }
        };

    const [showDatePicker, setShowDatePicker] = useState<{
        [key: string]: boolean;
    }>({});

    const toggleDatePicker = (fieldKey: string, show: boolean) => {
        setShowDatePicker((prev) => ({ ...prev, [fieldKey]: show }));
    };

    const submitForm = async () => {
        try {
            const token = await auth().currentUser?.getIdToken();
            if (!token) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }

            const response = await axios.post(
                "http://35.247.231.143:3000/events",
                {
                    nome: formData.nome,
                    data: formData.data,
                    local: formData.local,
                    capacidade: Number(formData.capacidade),
                    bannerUrl: formData.bannerUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Alert.alert("Sucesso", "Evento cadastrado com sucesso!");
            console.log("Resposta do backend:", response.data);

            setFormData({
                nome: "",
                data: new Date(),
                local: "",
                capacidade: "",
                bannerUrl: "",
            });
        } catch (error) {
            console.error("Erro ao cadastrar evento:", error);
            Alert.alert("Erro", "Falha ao cadastrar evento.");
        }
    };

    const formFields: FormField[] = [
        {
            key: "nome",
            type: "input",
            props: {
                label: "Nome do Evento *",
                placeholder: "Digite o nome do evento",
                value: formData.nome,
                onChangeText: handleInputChange("nome"),
            },
        },
        {
            key: "local",
            type: "input",
            props: {
                label: "Local do Evento *",
                placeholder: "Digite o local do evento",
                value: formData.local,
                onChangeText: handleInputChange("local"),
            },
        },
        {
            key: "data",
            type: "date",
            props: {
                label: "Data do Evento *",
                placeholder: "XX/XX/XXXX",
                value: formData.data,
                mode: "date",
                onChange: handleDateChange("data"),
            },
        },
        {
            key: "capacidade",
            type: "number",
            props: {
                label: "Número Máximo de Participantes *",
                placeholder: "Digite o número máximo de participantes",
                value: formData.capacidade,
                onChangeText: handleInputChange("capacidade"),
                keyboardType: "numeric",
            },
        },
        {
            key: "bannerUrl",
            type: "input",
            props: {
                label: "Banner URL *",
                placeholder: "banner url",
                value: formData.bannerUrl,
                onChangeText: handleInputChange("bannerUrl"),
            }, // para testes ajustar depois
        },

        {
            key: "submitButton",
            type: "button",
            props: {
                label: "Cadastrar Evento",
                onPress: submitForm,
            },
        },
    ];
    return (
        <GenericForm
            fields={formFields}
            title="Criar novo evento"
            containerStyle={{ padding: 16 }}
            titleStyle={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}
            showDatePicker={showDatePicker}
            toggleDatePicker={toggleDatePicker}
        />
    );
}
