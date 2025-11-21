import { useRouter } from 'expo-router';
import { Calendar, MapPin, Ticket } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  event: any;
  highlight?: boolean;
}

export function EventCarouselCard({ event, highlight = false }: Props) {
  const router = useRouter();

  const sold = Number(event.sold_count || 0);
  const cap = Number(event.capacity || 1);
  const progress = Math.min((sold / cap) * 100, 100);

  // ---------------------------
  // 🎯 Função: data humana
  // ---------------------------
  const formatEventDate = (dateString: string) => {
    if (!dateString) return 'Data não informada';

    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffMs = date.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Amanhã';
    if (diffDays === 2) return 'Depois de amanhã';

    // Nome do dia da semana
    const weekDays = [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ];
    const dayName = weekDays[date.getDay()];

    if (diffDays > 2 && diffDays < 7) {
      return `Próxima ${dayName}`;
    }

    if (diffDays > 7 && diffDays < 30) {
      return `Daqui ${diffDays} dias`;
    }

    // Formatação padrão
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const readableDate = formatEventDate(event.data);

  return (
    <TouchableOpacity
      style={[styles.card, highlight && styles.highlightCard]}
      onPress={() => router.push(`/event/${event.id}`)}
      activeOpacity={0.9}
    >
      {/* Banner */}
      {event.bannerUrl && (
        <Image source={{ uri: event.bannerUrl }} style={styles.banner} resizeMode="cover" />
      )}

      {/* Badge de destaque */}
      {highlight && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PRÓXIMO EVENTO</Text>
        </View>
      )}

      <View style={styles.content}>
        {/* Nome */}
        <Text style={styles.title} numberOfLines={2}>
          {event.nome}
        </Text>

        {/* Data */}
        <View style={styles.row}>
          <Calendar size={16} color="#4b5563" strokeWidth={2} />
          <Text style={styles.rowText}>{readableDate}</Text>
        </View>

        {/* Local */}
        <View style={styles.row}>
          <MapPin size={16} color="#4b5563" strokeWidth={2} />
          <Text style={styles.rowText}>{event.local}</Text>
        </View>

        {/* Ingressos vendidos */}
        <View style={styles.row}>
          <Ticket size={16} color="#374151" strokeWidth={2} />
          <Text style={styles.ticketText}>
            {sold} / {cap} vendidos
          </Text>
        </View>

        {/* Barra de progresso */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginRight: 18,
    marginBottom: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    overflow: 'hidden',
  },

  highlightCard: {
    borderWidth: 2,
    borderColor: '#0ea5e9',
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 10,
  },

  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },

  banner: {
    width: '100%',
    height: 180,
  },

  content: {
    padding: 16,
    gap: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },

  rowText: {
    fontSize: 14,
    color: '#4b5563',
    flex: 1,
  },

  ticketText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },

  progressTrack: {
    marginTop: 8,
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#0ea5e9',
  },
});
