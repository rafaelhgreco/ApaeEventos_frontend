import GenericForm from "@/components/ATOMIC/molecules/form";
import { FormField } from "@/types/molecules";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Alert, Button, Image, ScrollView, View } from "react-native";

export default function NewEventScreen() {
    const [formData, setFormData] = useState({
        nome: "",
        data: new Date(),
        local: "",
        capacidade: "",
        bannerUrl: "",
    });

    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState<{
        [key: string]: boolean;
    }>({});

    const router = useRouter();
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Criar Evento",
        });
    }, [navigation]);

    const toggleDatePicker = (key: string, visible: boolean) => {
        setShowDatePicker((prev) => ({ ...prev, [key]: visible }));
    };

    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleDateChange =
        (field: string) => (_event: any, selectedDate?: Date) => {
            if (selectedDate) {
                setFormData((prev) => ({ ...prev, [field]: selectedDate }));
            }
            toggleDatePicker(field, false);
        };

    const handlePickImage = async () => {
        Alert.alert("Escolha uma imagem");
    };

    const submitForm = async () => {
        setLoading(true);

        try {
            // Validação
            if (!formData.nome || !formData.local || !formData.capacidade) {
                Alert.alert("Erro", "Preencha todos os campos obrigatórios");
                return;
            }

            // Lógica de criação do evento
            Alert.alert("Sucesso", "Evento criado com sucesso!");
            router.back();
        } catch (error: any) {
            Alert.alert("Erro", error.message || "Erro ao criar evento");
        } finally {
            setLoading(false);
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
            key: "bannerUpload",
            type: "custom",
            props: {
                render: () => (
                    <View style={{ marginBottom: 16 }}>
                        <Button
                            title="Selecionar Banner"
                            onPress={handlePickImage}
                        />
                        {formData.bannerUrl !== "" && (
                            <Image
                                source={{ uri: formData.bannerUrl }}
                                style={{
                                    width: "100%",
                                    height: 200,
                                    marginTop: 12,
                                    borderRadius: 8,
                                }}
                                resizeMode="cover"
                            />
                        )}
                    </View>
                ),
            },
        },
        {
            key: "submitButton",
            type: "button",
            props: {
                label: loading ? "Cadastrando..." : "Cadastrar Evento",
                onPress: submitForm,
                loading: loading,
                variant: "primary",
            },
        },
    ];

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <GenericForm
                fields={formFields}
                title="Digite os dados do novo evento"
                titleStyle={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 16,
                }}
                showDatePicker={showDatePicker}
                toggleDatePicker={toggleDatePicker}
            />
        </ScrollView>
    );
}
