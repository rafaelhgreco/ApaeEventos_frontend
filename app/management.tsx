import { QuickActionCard } from '@/components/ATOMIC/molecules/quick_action_card';
import { EventCarouselCard } from '@/components/cards/event_carousel_card';
import { useEvents } from '@/hooks/useEvents';
import { getIdToken } from '@/lib/cognito';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { BarChart3, CalendarPlus, QrCode, UserPlus } from 'lucide-react-native';
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Alert, Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles/management.style';

export default function ManagementScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  // Carregar eventos
  const { events, fetchEvents, loading, error } = useEvents();

  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // Custom header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Carrega eventos sempre que entra na tela
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          const token = await getIdToken();
          await fetchEvents(token);
        } catch (e) {
          console.log('Erro ao carregar eventos:', e);
        }
      };

      load();
    }, [fetchEvents]),
  );

  // Animações de entrada
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        bounciness: 6,
        speed: 1.2,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Logout
  const handleSignOut = async () => {
    router.push('/');
    Alert.alert('Sucesso', 'Logout realizado com sucesso!');
  };

  // -----------------------------
  // 🔥 Destacar o próximo evento
  // -----------------------------
  const getSortedEvents = () => {
    return [...events].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  };

  const getNextEvent = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    return getSortedEvents().find((ev) => new Date(ev.data).getTime() >= today);
  };

  const sortedEvents = getSortedEvents();
  const nextEvent = getNextEvent();

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER CUSTOM */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Gerenciamento</Text>
            <Text style={styles.headerSubtitle}>Painel Administrativo</Text>
          </View>

          <TouchableOpacity onPress={handleSignOut} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* AÇÕES RÁPIDAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>

          <View style={styles.quickActionsGrid}>
            <QuickActionCard
              label="Cadastrar"
              icon={CalendarPlus}
              onPress={() => router.push('/new_event')}
              color="#2980b9"
            />

            <QuickActionCard
              label="Validar"
              icon={QrCode}
              onPress={() => router.push('/qrcode')}
              color="#27ae60"
            />

            <QuickActionCard
              label="Dashboard"
              icon={BarChart3}
              onPress={() => router.push('/dashboard')}
              color="#8e44ad"
            />

            <QuickActionCard
              label="Registrar"
              icon={UserPlus}
              onPress={() => router.push('/admin_register')}
              color="#c0392b"
            />
          </View>
        </View>

        {/* CARROSSEL DE EVENTOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos Eventos</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
          >
            {loading && <Text style={{ padding: 10 }}>Carregando...</Text>}

            {error && <Text style={{ color: 'red', padding: 10 }}>{error}</Text>}

            {!loading && events.length === 0 && (
              <Text style={{ padding: 10 }}>Nenhum evento encontrado</Text>
            )}

            {sortedEvents.map((ev: any) => (
              <EventCarouselCard key={ev.id} event={ev} highlight={ev.id === nextEvent?.id} />
            ))}
          </ScrollView>

          {/* 🔥 Botão de listar eventos */}
          <TouchableOpacity
            style={{
              marginTop: 16,
              paddingVertical: 12,
              backgroundColor: '#0ea5e9',
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={() => router.push('/list_all_events')}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 16,
              }}
            >
              Ver todos os eventos
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
