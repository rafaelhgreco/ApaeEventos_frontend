import GenericForm from "@/components/ATOMIC/molecules/form";
import { getIdToken, getUserRole } from "@/lib/cognito";
import { createEvent } from "@/services/event_services";
import { FormField } from "@/types/molecules";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Alert, Button, Image, ScrollView, View } from "react-native";

export default function NewEventScreen() {
  const [formData, setFormData] = useState({
    nome: "",
    data: new Date(),
    local: "",
    capacity: "",
    ticket_price: "",
    starts_at: new Date(), // inicializa com hora atual
    bannerUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<{
    [key: string]: boolean;
  }>({});
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Criar Evento" });
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
    Alert.alert("Seleção de imagem", "Em breve: upload de banner para S3");
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      // ⚙️ Validação
      if (
        !formData.nome ||
        !formData.local ||
        !formData.capacity ||
        !formData.data ||
        !formData.ticket_price
      ) {
        Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
        return;
      }

      // 🔒 Verifica permissão
      const role = await getUserRole();
      if (role !== "admin" && role !== "staff") {
        Alert.alert(
          "Acesso negado",
          "Apenas administradores e staff podem criar eventos."
        );
        return;
      }

      // 🔑 Token Cognito
      const token = await getIdToken();
      if (!token) {
        Alert.alert("Erro", "Usuário não autenticado. Faça login novamente.");
        return;
      }

      // 🧩 Conversões
      const capacityNum = parseInt(formData.capacity, 10) || 0;
      const ticketPriceNum = parseFloat(formData.ticket_price) || 0;

      // Converte data e hora
      const formattedDate = formData.data.toISOString().split("T")[0];
      const startsAt = formData.starts_at
        ? new Date(formData.starts_at).toISOString()
        : null;

      // 🚀 Envia para API
      await createEvent(
        {
          nome: formData.nome,
          local: formData.local,
          data: formattedDate,
          capacity: capacityNum,
          bannerUrl: formData.bannerUrl || null,
          ticket_price: ticketPriceNum,
          starts_at: startsAt,
          status: "published",
        },
        token
      );

      Alert.alert("Sucesso", "Evento criado com sucesso!");
      router.back();
    } catch (error: any) {
      console.error("❌ Erro ao criar evento:", error);
      Alert.alert("Erro", error.message || "Erro ao criar evento.");
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
        placeholder: "Selecione a data",
        value: formData.data,
        mode: "date",
        onChange: handleDateChange("data"),
      },
    },
    {
      key: "starts_at",
      type: "date",
      props: {
        label: "Horário de Início *",
        placeholder: "Selecione o horário de início",
        value: formData.starts_at,
        mode: "time",
        onChange: handleDateChange("starts_at"),
      },
    },
    {
      key: "capacity",
      type: "number",
      props: {
        label: "Capacidade *",
        placeholder: "Número máximo de participantes",
        value: formData.capacity,
        onChangeText: handleInputChange("capacity"),
        keyboardType: "numeric",
      },
    },
    {
      key: "ticket_price",
      type: "number",
      props: {
        label: "Preço do Ingresso (R$) *",
        placeholder: "Defina o valor do ingresso",
        value: formData.ticket_price,
        onChangeText: handleInputChange("ticket_price"),
        keyboardType: "decimal-pad",
      },
    },
    {
      key: "bannerUpload",
      type: "custom",
      props: {
        render: () => (
          <View style={{ marginBottom: 16 }}>
            <Button title="Selecionar Banner" onPress={handlePickImage} />
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
        title="Cadastro de Novo Evento"
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
