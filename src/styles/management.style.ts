import { StyleSheet } from 'react-native';
import { border, paddings } from '@/src/styles/themes';

export const styles = StyleSheet.create({
  scrollContent: {
    padding: paddings.large,
    paddingBottom: 50,
    gap: 28,
    backgroundColor: '#f3f5f9',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: -4,
  },

  logoutBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
  },

  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },

  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: border.radiusLarge,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 18,
  },

  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },

  carousel: {
    paddingRight: 10,
    gap: 16,
  },
});
