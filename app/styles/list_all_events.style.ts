import { StyleSheet } from 'react-native';
import { border } from '../../app/styles/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },

  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },

  /* TÍTULO DAS SEÇÕES (NOVO) */
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
    marginTop: 16,
  },

  /* CARD BASE */
  card: {
    backgroundColor: '#fff',
    borderRadius: border.radiusLarge,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,

    overflow: 'hidden',
    position: 'relative',
  },

  /* CARD DESTACADO (PRÓXIMO EVENTO) */
  highlightCard: {
    borderWidth: 2,
    borderColor: '#0ea5e9',
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 6,
    backgroundColor: '#f0faff', // leve azul para reforçar destaque
  },
  /* BADGE */
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#0284c7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 10,
  },

  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.3,
  },

  /* BANNER */
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },

  bannerPlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  bannerText: {
    color: '#6b7280',
    fontSize: 16,
    fontStyle: 'italic',
  },

  /* TÍTULO DO EVENTO */
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
  },

  /* LINHAS */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },

  info: {
    fontSize: 15,
    color: '#475569',
    flexShrink: 1,
  },

  tag: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginLeft: 6,
  },

  /* LISTA */
  listContent: {
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
});

export default styles;
