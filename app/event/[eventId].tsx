import { getIdToken, getUserRole } from '@/lib/cognito';
import {
  deleteEvent,
  EventData,
  getUserEvents,
  updateEvent,
  uploadBannerService,
} from '@/services/event_services';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
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

/* -----------------------------------------------------------
    UTILITÁRIOS DE DATA
----------------------------------------------------------- */
function parseDateSafe(value: string | Date) {
  if (!value) return new Date();
  const iso = typeof value === 'string' ? value : value.toISOString();
  const onlyDate = iso.length === 10 ? `${iso}T00:00:00` : iso;

  const d = new Date(onlyDate);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function parseTimeSafe(value: string | Date) {
  if (!value) return new Date();
  const d = typeof value === 'string' ? new Date(value) : value;
  return new Date(0, 0, 0, d.getHours(), d.getMinutes());
}

/* -----------------------------------------------------------
    COMPONENTE PRINCIPAL
----------------------------------------------------------- */
export default function EventDetailsPage() {
  const { eventId } = useLocalSearchParams();
  const navigation = useNavigation();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [role, setRole] = useState('default');

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
    navigation.setOptions({ title: 'Detalhes do Evento' });
  }, [navigation]);

  /* -----------------------------------------------------------
      CARREGAR EVENTO + ROLE
  ----------------------------------------------------------- */
  useEffect(() => {
    if (!eventId) return;

    const id = Array.isArray(eventId) ? eventId[0] : eventId;
    const numericId = parseInt(id, 10);

    fetchUserRole();
    fetchEvent(numericId);
  }, [eventId]);

  const fetchUserRole = async () => {
    try {
      const r = await getUserRole();
      setRole(r);
    } catch {
      setRole('default');
    }
  };

  const fetchEvent = async (id: number) => {
    try {
      setLoading(true);
      const token = await getIdToken();
      if (!token) return setError('Usuário não autenticado.');

      const eventsData = await getUserEvents(token);
      const found = eventsData.find((e: { id: number }) => e.id === id);

      if (!found) return setError('Evento não encontrado.');

      setEvent(found);

      setEditedEvent({
        nome: found.nome,
        local: found.local,
        data: parseDateSafe(found.data),
        starts_at: parseTimeSafe(found.starts_at || new Date()),
        capacity: found.capacity?.toString() || '',
        ticket_price: found.ticket_price?.toString() || '',
        bannerUrl: found.bannerUrl || '',
        status: found.status || 'published',
      });
    } catch {
      Alert.alert('Erro', 'Falha ao carregar o evento.');
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------------------------------------
      TROCAR BANNER
  ----------------------------------------------------------- */
  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) return;
      const asset = result.assets[0];

      const form = new FormData();
      form.append('file', {
        uri: asset.uri,
        name: asset.uri.split('/').pop(),
        type: asset.mimeType || 'image/jpeg',
      } as any);

      setUploadingBanner(true);

      const token = await getIdToken();
      if (!token) return;

      const upload = await uploadBannerService(form, token);

      setEditedEvent((p) => ({ ...p, bannerUrl: upload.url }));
    } catch {
      Alert.alert('Erro', 'Falha ao enviar banner.');
    } finally {
      setUploadingBanner(false);
    }
  };

  /* -----------------------------------------------------------
      SALVAR EDIÇÕES
  ----------------------------------------------------------- */
  const handleSave = async () => {
    try {
      const token = await getIdToken();
      if (!token) return;

      const payload: Partial<EventData> = {
        nome: editedEvent.nome,
        local: editedEvent.local,
        data: editedEvent.data,
        starts_at: editedEvent.starts_at.toISOString(),
        capacity: Number(editedEvent.capacity),
        ticket_price: Number(editedEvent.ticket_price),
        status: editedEvent.status,
        bannerUrl: editedEvent.bannerUrl || event?.bannerUrl || null,
      };

      await updateEvent(event!.id, payload, token);

      Alert.alert('Sucesso', 'Evento atualizado!');
      setIsEditing(false);

      fetchEvent(event!.id);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  };

  /* -----------------------------------------------------------
      EXCLUIR EVENTO
  ----------------------------------------------------------- */
  const handleDelete = () => {
    Alert.alert('Excluir evento', 'Tem certeza?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const token = await getIdToken();
          if (!token) return;

          await deleteEvent(event!.id, token);
          router.back();
        },
      },
    ]);
  };

  /* -----------------------------------------------------------
      RENDER PRINCIPAL
  ----------------------------------------------------------- */
  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error || !event) return <Text style={styles.error}>{error}</Text>;

  const formattedDate = parseDateSafe(event.data).toLocaleDateString('pt-BR');
  const formattedTime = parseTimeSafe(event.starts_at ?? new Date()).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const banner = editedEvent.bannerUrl || event.bannerUrl || '';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* BANNER */}
          {banner !== '' && (
            <Image source={{ uri: banner }} style={styles.banner} resizeMode="cover" />
          )}

          {/* VISUALIZAÇÃO */}
          {!isEditing && (
            <>
              <View style={styles.box}>
                <Text style={styles.title}>{event.nome}</Text>

                <View style={styles.infoRow}>
                  <MapPin size={20} color={colors.primary} />
                  <Text style={styles.date}>{event.local}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Calendar size={20} color={colors.primary} />
                  <Text style={styles.date}>{formattedDate}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Clock size={20} color={colors.primary} />
                  <Text style={styles.date}>{formattedTime}</Text>
                </View>

                <View style={styles.infoRow}>
                  <DollarSign size={20} color={colors.primary} />
                  <Text style={styles.date}>R$ {Number(event.ticket_price).toFixed(2)}</Text>
                </View>

                {role === 'admin' && (
                  <>
                    <View style={styles.infoRow}>
                      <Users size={20} color={colors.primary} />
                      <Text style={styles.date}>{event.capacity} pessoas</Text>
                    </View>

                    <View style={styles.infoRow}>
                      <CheckCircle2 size={20} color={colors.primary} />
                      <Text style={styles.date}>{event.status}</Text>
                    </View>

                    <View style={styles.infoRow}>
                      <BarChart3 size={20} color={colors.primary} />
                      <Text style={styles.date}>
                        {event.sold_count || 0} / {event.capacity}
                      </Text>
                    </View>

                    <View style={styles.infoRow}>
                      <TrendingUp size={20} color={colors.primary} />
                      <Text style={styles.date}>
                        R$
                        {(Number(event.ticket_price) * Number(event.sold_count || 0)).toFixed(2)}
                      </Text>
                    </View>
                  </>
                )}
              </View>

              {/* BOTÕES POR ROLE */}
              {role === 'admin' ? (
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
              ) : (
                <View style={styles.buttonBox}>
                  <Button
                    label="Comprar Ingressos"
                    variant="secondary"
                    onPress={() => router.push(`/ticket?eventId=${event.id}`)}
                  />
                </View>
              )}

              <View style={styles.buttonBox}>
                <Button
                  label="Meus ingressos"
                  variant="outline"
                  onPress={() => router.push(`/my_tickets?eventId=${event.id}`)}
                />
              </View>
            </>
          )}

          {/* MODO EDIÇÃO */}
          {isEditing && (
            <View style={{ gap: 16, paddingBottom: 50 }}>
              <Text style={styles.label}>Banner</Text>
              <Button
                label={uploadingBanner ? 'Enviando...' : 'Alterar Banner'}
                variant="outline"
                onPress={handlePickImage}
              />

              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={editedEvent.nome}
                onChangeText={(t) => setEditedEvent({ ...editedEvent, nome: t })}
              />

              <Text style={styles.label}>Local</Text>
              <TextInput
                style={styles.input}
                value={editedEvent.local}
                onChangeText={(t) => setEditedEvent({ ...editedEvent, local: t })}
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
                  onChange={(_, selected) => {
                    if (selected)
                      setEditedEvent({
                        ...editedEvent,
                        data: parseDateSafe(selected),
                      });
                    setShowPicker((p) => ({ ...p, date: false }));
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
                  onChange={(_, selected) => {
                    if (selected)
                      setEditedEvent({
                        ...editedEvent,
                        starts_at: parseTimeSafe(selected),
                      });
                    setShowPicker((p) => ({ ...p, time: false }));
                  }}
                />
              )}

              <Text style={styles.label}>Capacidade</Text>
              <TextInput
                style={styles.input}
                value={editedEvent.capacity}
                onChangeText={(t) => setEditedEvent({ ...editedEvent, capacity: t })}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Preço (R$)</Text>
              <TextInput
                style={styles.input}
                value={editedEvent.ticket_price}
                onChangeText={(t) => setEditedEvent({ ...editedEvent, ticket_price: t })}
                keyboardType="decimal-pad"
              />

              <Button label="Salvar" variant="primary" onPress={handleSave} />
              <Button label="Cancelar" variant="outline" onPress={() => setIsEditing(false)} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
