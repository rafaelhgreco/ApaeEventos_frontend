import { StyleSheet } from 'react-native';
import { border, paddings } from '../styles/themes';

export const styles = StyleSheet.create({
  scrollContent: {
    padding: paddings.extraLarge,
    paddingBottom: 40,
    gap: 24,
    backgroundColor: '#f5f6fa',
  },

  // Card branco com sombra suave
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
    gap: 12,
  },

  actionItem: {
    width: '42%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
