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
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },

  info: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 4,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  tag: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
});

export default styles;
