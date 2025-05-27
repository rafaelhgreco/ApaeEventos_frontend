import GenericForm from "@/components/ATOMIC/molecules/form";
import { FormField } from "@/types/molecules";
import React, { useState } from "react";

export default function NewEventScreen() {
    const [formData, setFormData] = useState({
        eventName: "",
        eventDate: new Date(),
        eventStartTime: new Date(),
        eventEndTime: new Date(),
        eventLocation: "",
        eventMaxAttendees: "",
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

    const formFields: FormField[] = [
        {
            key: "eventName",
            type: "input",
            props: {
                label: "Nome do Evento *",
                placeholder: "Digite o nome do evento",
                value: formData.eventName,
                onChangeText: handleInputChange("eventName"),
            },
        },
        {
            key: "eventDate",
            type: "date",
            props: {
                label: "Data do Evento *",
                placeholder: "XX/XX/XXXX",
                value: formData.eventDate,
                mode: "date",
                onChange: handleDateChange("eventDate"),
            },
        },
        {
            key: "eventStartTime",
            type: "time",
            props: {
                keyboardType: "numeric",
                label: "Hora de Início *",
                placeholder: "HH:MM",
                value: formData.eventStartTime,
                mode: "time",
                onChange: handleDateChange("eventStartTime"),
            },
        },
        {
            key: "eventEndTime",
            type: "time",
            props: {
                label: "Hora de Término *",
                placeholder: "HH:MM",
                value: formData.eventEndTime,
                mode: "time",
                onChange: handleDateChange("eventEndTime"),
            },
        },
        {
            key: "eventLocation",
            type: "input",
            props: {
                label: "Local do Evento *",
                placeholder: "Digite o local do evento",
                value: formData.eventLocation,
                onChangeText: handleInputChange("eventLocation"),
            },
        },
        {
            key: "eventMaxAttendees",
            type: "input",
            props: {
                keyboardType: "numeric",
                label: "Máximo de Participantes *",
                placeholder: "Digite a capacidade máxima (número)",
                value: formData.eventMaxAttendees,
                onChangeText: handleInputChange("eventMaxAttendees"),
            },
        },
        {
            key: "submitButton",
            type: "button",
            props: {
                label: "Cadastrar Evento",
                onPress: () => console.log("Evento cadastrado:", formData),
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
