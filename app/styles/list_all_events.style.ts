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

  card: {
    backgroundColor: '#fff',
    borderRadius: border.radiusLarge,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: 'relative',
  },

  highlightCard: {
    borderWidth: 2,
    borderColor: '#0ea5e9',
    shadowOpacity: 0.12,
    shadowRadius: 10,
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

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },

  info: {
    fontSize: 15,
    color: '#4b5563',
    marginLeft: 6,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },

  tag: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 6,
  },
});

export default styles;
