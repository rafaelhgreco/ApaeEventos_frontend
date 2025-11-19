import { getIdToken, getUserRole } from '@/lib/cognito';
import {
  deleteEvent,
  EventData,
  getUserEvents,
  updateEvent,
  uploadBannerService,
} from '@/services/event_services';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import Button from '../../components/ATOMIC/atoms/button';
import { Event } from '../../src/domain/events';

import styles from '../styles/eventId.style';
import { colors } from '../styles/themes';

// ÍCONES LUCIDE
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  TrendingUp,
  Users,
} from 'lucide-react-native';

export default function EventDetailsPage() {
  const { eventId } = useLocalSearchParams();
  const navigation = useNavigation();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [role, setRole] = useState<string>('default');

  const [editedEvent, setEditedEvent] = useState({
    nome: '',
    local: '',
    data: new Date(),
    starts_at: new Date(),
    capacity: '',
    ticket_price: '',
    bannerUrl: '',
    status: 'published' as Event['status'],
  });

  const [showPicker, setShowPicker] = useState({
    date: false,
    time: false,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Detalhes do Evento',
    });
  }, [navigation]);

  useEffect(() => {
    if (!eventId) return;

    const id = Array.isArray(eventId) ? eventId[0] : eventId;
    const numericId = parseInt(id, 10);

    fetchUserRole();
    fetchEventData(numericId);
  }, [eventId]);

  // ROLE
  const fetchUserRole = async () => {
    try {
      const userRole = await getUserRole();
      setRole(userRole);
    } catch {
      setRole('default');
    }
  };

  // EVENTO
  const fetchEventData = async (id: number) => {
    try {
      setLoading(true);

      const token = await getIdToken();
      if (!token) {
        setError('Usuário não autenticado.');
        return;
      }

      const eventsData = await getUserEvents(token);

      const selectedEvent = eventsData.find((e: Event) => e.id === id);

      if (!selectedEvent) {
        setError('Evento não encontrado.');
        return;
      }

      setEvent(selectedEvent);

      setEditedEvent({
        nome: selectedEvent.nome,
        local: selectedEvent.local,
        data: new Date(selectedEvent.data),
        starts_at: selectedEvent.starts_at ? new Date(selectedEvent.starts_at) : new Date(),
        capacity: selectedEvent.capacity?.toString() || '',
        ticket_price: selectedEvent.ticket_price?.toString() || '',
        bannerUrl: selectedEvent.bannerUrl || '',
        status: selectedEvent.status || 'published',
      });
    } catch {
      Alert.alert('Erro', 'Falha ao carregar dados do evento.');
    } finally {
      setLoading(false);
    }
  };

  // SELECT BANNER
  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) return;

      const asset = result.assets[0];
      const fileName = asset.uri.split('/').pop()!;
      const fileType = asset.mimeType || 'image/jpeg';

      const form = new FormData();
      form.append('file', {
        uri: asset.uri,
        name: fileName,
        type: fileType,
      } as any);

      setUploadingBanner(true);

      const token = await getIdToken();
      if (!token) return Alert.alert('Erro', 'Usuário não autenticado.');

      const upload = await uploadBannerService(form, token);

      setEditedEvent((prev) => ({ ...prev, bannerUrl: upload.url }));
    } catch {
      Alert.alert('Erro', 'Falha ao enviar banner.');
    } finally {
      setUploadingBanner(false);
    }
  };

  // SALVAR EDIÇÃO
  const handleSaveEdit = async () => {
    try {
      const token = await getIdToken();
      if (!token) return Alert.alert('Erro', 'Usuário não autenticado.');

      const updatedEvent: Partial<EventData> = {
        nome: editedEvent.nome,
        local: editedEvent.local,
        data: editedEvent.data,
        starts_at: editedEvent.starts_at.toISOString(),
        capacity: Number(editedEvent.capacity),
        ticket_price: Number(editedEvent.ticket_price),
        status: editedEvent.status,
        bannerUrl: editedEvent.bannerUrl || event?.bannerUrl || null,
      };

      await updateEvent(event?.id!, updatedEvent, token);

      Alert.alert('Sucesso', 'Evento atualizado!');
      setIsEditing(false);

      if (event?.id) fetchEventData(event.id);
    } catch {
      Alert.alert('Erro', 'Falha ao atualizar evento.');
    }
  };

  // APAGAR EVENTO
  const handleDelete = async () => {
    Alert.alert('Excluir Evento', 'Essa ação não pode ser desfeita. Confirmar?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await getIdToken();
            if (!token) return;

            await deleteEvent(event?.id!, token);
            Alert.alert('Evento excluído!');
            router.back();
          } catch {
            Alert.alert('Erro', 'Falha ao excluir.');
          }
        },
      },
    ]);
  };

  // RENDER
  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (error || !event) return <Text style={styles.error}>{error || 'Evento não encontrado.'}</Text>;

  const formattedDate = new Date(event.data).toLocaleDateString('pt-BR');
  const formattedTime =
    event.starts_at &&
    new Date(event.starts_at).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const banner = editedEvent.bannerUrl || event.bannerUrl || '';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* BANNER */}
      {banner !== '' && <Image source={{ uri: banner }} style={styles.banner} />}

      {/* SE NÃO ESTÁ EDITANDO */}
      {!isEditing ? (
        <>
          <View style={styles.box}>
            <Text style={styles.title}>{event.nome}</Text>

            {/* LOCAL */}
            <View style={styles.infoRow}>
              <MapPin size={20} color={colors.primary} />
              <Text style={styles.date}>{event.local}</Text>
            </View>

            {/* DATA */}
            <View style={styles.infoRow}>
              <Calendar size={20} color={colors.primary} />
              <Text style={styles.date}>{formattedDate}</Text>
            </View>

            {/* HORA */}
            <View style={styles.infoRow}>
              <Clock size={20} color={colors.primary} />
              <Text style={styles.date}>{formattedTime}</Text>
            </View>

            {/* PREÇO (TODOS VEEM) */}
            <View style={styles.infoRow}>
              <DollarSign size={20} color={colors.primary} />
              <Text style={styles.date}>R${Number(event.ticket_price || 0).toFixed(2)}</Text>
            </View>

            {/* CAPACIDADE — SÓ ADMIN */}
            {role === 'admin' && (
              <View style={styles.infoRow}>
                <Users size={20} color={colors.primary} />
                <Text style={styles.date}>{event.capacity} pessoas</Text>
              </View>
            )}

            {/* STATUS — SÓ ADMIN */}
            {role === 'admin' && (
              <View style={styles.infoRow}>
                <CheckCircle2 size={20} color={colors.primary} />
                <Text style={styles.date}>
                  {event.status === 'published'
                    ? 'Publicado'
                    : event.status === 'draft'
                    ? 'Rascunho'
                    : event.status === 'canceled'
                    ? 'Cancelado'
                    : 'Finalizado'}
                </Text>
              </View>
            )}

            {/* INGRESSOS — SÓ ADMIN */}
            {role === 'admin' && (
              <View style={styles.infoRow}>
                <BarChart3 size={20} color={colors.primary} />
                <Text style={styles.date}>
                  {event.sold_count || 0} / {event.capacity} vendidos
                </Text>
              </View>
            )}

            {/* RECEITA — SÓ ADMIN */}
            {role === 'admin' && (
              <View style={styles.infoRow}>
                <TrendingUp size={20} color={colors.primary} />
                <Text style={styles.date}>
                  R$
                  {(Number(event.ticket_price || 0) * Number(event.sold_count || 0)).toFixed(2)}
                </Text>
              </View>
            )}
          </View>

          {/* BOTÕES */}
          {role === 'admin' && (
            <View style={styles.buttonBox}>
              <Button
                label="Editar Evento"
                variant="secondary"
                onPress={() => setIsEditing(true)}
              />

              <Button label="Excluir Evento" variant="outline" onPress={handleDelete} />

              <Button
                label="Escanear Ingresso"
                variant="primary"
                onPress={() => router.push(`/qrcode?eventId=${event.id}`)}
              />
            </View>
          )}

          {role === 'default' && (
            <View style={styles.buttonBox}>
              <Button
                label="Comprar Ingressso"
                variant="secondary"
                onPress={() => router.push(`/ticket?eventId=${event.id}`)}
              />

              <Button
                label="Ver Meus Ingressos"
                variant="outline"
                onPress={() => router.push(`/my_tickets`)}
              />
            </View>
          )}
        </>
      ) : (
        /* EDITANDO */
        <View style={{ gap: 16 }}>
          <Text style={styles.label}>Banner</Text>
          <Button
            label={uploadingBanner ? 'Enviando banner...' : 'Alterar Banner'}
            variant="outline"
            onPress={handlePickImage}
          />

          <Text style={styles.label}>Nome do Evento</Text>
          <TextInput
            value={editedEvent.nome}
            onChangeText={(v) => setEditedEvent((p) => ({ ...p, nome: v }))}
            style={styles.input}
          />

          <Text style={styles.label}>Local</Text>
          <TextInput
            value={editedEvent.local}
            onChangeText={(v) => setEditedEvent((p) => ({ ...p, local: v }))}
            style={styles.input}
          />

          <Text style={styles.label}>Data</Text>
          <Button
            label={editedEvent.data.toLocaleDateString('pt-BR')}
            variant="outline"
            onPress={() => setShowPicker((p) => ({ ...p, date: !p.date }))}
          />

          {showPicker.date && (
            <DateTimePicker
              value={editedEvent.data}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_: DateTimePickerEvent, selectedDate?: Date) => {
                if (selectedDate)
                  setEditedEvent((p) => ({
                    ...p,
                    data: selectedDate,
                  }));

                setShowPicker((p) => ({
                  ...p,
                  date: false,
                }));
              }}
            />
          )}

          <Text style={styles.label}>Horário</Text>
          <Button
            label={editedEvent.starts_at.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
            variant="outline"
            onPress={() => setShowPicker((p) => ({ ...p, time: !p.time }))}
          />

          {showPicker.time && (
            <DateTimePicker
              value={editedEvent.starts_at}
              mode="time"
              is24Hour
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_: DateTimePickerEvent, selectedTime?: Date) => {
                if (selectedTime)
                  setEditedEvent((p) => ({
                    ...p,
                    starts_at: selectedTime,
                  }));

                setShowPicker((p) => ({
                  ...p,
                  time: false,
                }));
              }}
            />
          )}

          <Text style={styles.label}>Capacidade</Text>
          <TextInput
            value={editedEvent.capacity}
            onChangeText={(v) => setEditedEvent((p) => ({ ...p, capacity: v }))}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Preço (R$)</Text>
          <TextInput
            value={editedEvent.ticket_price}
            onChangeText={(v) => setEditedEvent((p) => ({ ...p, ticket_price: v }))}
            keyboardType="decimal-pad"
            style={styles.input}
          />

          <Button label="Salvar alterações" variant="primary" onPress={handleSaveEdit} />

          <Button label="Cancelar" variant="outline" onPress={() => setIsEditing(false)} />
        </View>
      )}
    </ScrollView>
  );
}
