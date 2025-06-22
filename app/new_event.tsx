import GenericForm from "@/components/ATOMIC/molecules/form";
import { createEvent } from "@/services/event_services";
import { uploadBanner } from "@/services/firebaseUpload";
import { FormField } from "@/types/molecules";
import auth from "@react-native-firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Alert, Button, Image, View } from "react-native";

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

  const toggleDatePicker = (key: string, visible: boolean) => {
    setShowDatePicker((prev) => ({ ...prev, [key]: visible }));
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Criar novo evento",
    });
  }, [navigation]);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange =
    (field: string) => (_event: any, selectedDate?: Date) => {
      if (selectedDate) {
        setFormData((prev) => ({ ...prev, [field]: selectedDate }));
      }
    };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "É necessário liberar o acesso às fotos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const url = await uploadBanner(asset.uri, `banner_${Date.now()}`);
      setFormData((prev) => ({ ...prev, bannerUrl: url }));
    }
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      const token = await auth().currentUser?.getIdToken();
      if (!token) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
      }

      await createEvent(
        {
          nome: formData.nome,
          data: formData.data,
          local: formData.local,
          capacidade: Number(formData.capacidade),
          bannerUrl: formData.bannerUrl,
        },
        token
      );

      Alert.alert("Sucesso", "Evento cadastrado com sucesso!");
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
    } finally {
      setLoading(false);
      router.back();
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
        label: "Cadastrar Evento",
        onPress: submitForm,
        loading: loading,
      },
    },
  ];

  return (
    <GenericForm
      fields={formFields}
      title="Digite os dados do novo evento"
      containerStyle={{ padding: 16 }}
      titleStyle={{
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
      }}
      showDatePicker={showDatePicker}
      toggleDatePicker={toggleDatePicker}
    />
  );
}
