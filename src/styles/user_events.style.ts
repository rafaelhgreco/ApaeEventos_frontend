import { StyleSheet } from 'react-native';
import { border, colors, font, paddings } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* ----- CENTRO (loading / error / empty) ----- */
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: paddings.large,
  },

  loadingText: {
    marginTop: paddings.medium,
    fontSize: font.sizeMedium,
    color: colors.text,
    opacity: 0.8,
  },

  errorIcon: {
    fontSize: 56,
    marginBottom: paddings.medium,
  },

  error: {
    textAlign: 'center',
    color: colors.error,
    fontSize: font.sizeMedium,
    marginBottom: paddings.medium,
    lineHeight: 22,
  },

  retryButton: {
    backgroundColor: colors.button,
    paddingVertical: paddings.medium,
    paddingHorizontal: paddings.extraLarge,
    borderRadius: border.radiusLarge,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  retryButtonText: {
    color: colors.backgroundLight,
    fontSize: font.sizeMedium,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  emptyIcon: {
    fontSize: 60,
    marginBottom: paddings.medium,
  },

  emptyTitle: {
    fontSize: font.sizeLarge,
    fontWeight: '800',
    color: colors.primaryDark,
    textAlign: 'center',
  },

  emptySubtitle: {
    marginTop: paddings.small,
    color: colors.textSecondary,
    fontSize: font.sizeSmall,
    textAlign: 'center',
    paddingHorizontal: paddings.extraLarge,
    lineHeight: 18,
  },

  /* ----- BUSCA ----- */
  searchContainer: {
    padding: paddings.medium,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  /* ----- LISTA ----- */
  listContent: {
    padding: paddings.large,
    paddingBottom: 120,
    gap: paddings.large,
  },

  /* ----- SEÇÃO ----- */
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primaryDark,
    marginBottom: 12,
    marginTop: 10,
    paddingHorizontal: 6,
  },

  /* ----- CARD DE EVENTO ----- */
  card: {
    backgroundColor: colors.backgroundLight,
    borderRadius: border.radiusLarge,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardHighlight: {
    borderWidth: 2,
    borderColor: colors.terceary,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
    transform: [{ scale: 1.01 }],
  },

  pastCard: {
    opacity: 0.6,
  },

  eventBanner: {
    width: '100%',
    height: 200,
    backgroundColor: '#e5e7eb',
  },

  eventContent: {
    padding: paddings.large,
    gap: 10,
  },

  eventTitle: {
    fontSize: font.sizeLarge,
    fontWeight: '800',
    color: colors.primaryDark,
    marginBottom: 4,
  },

  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },

  eventInfo: {
    fontSize: font.sizeSmall,
    color: colors.textSecondary,
    marginRight: 10,
  },

  metadataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 6,
  },

  chipText: {
    fontSize: font.sizeSmall,
    color: colors.text,
  },

  priceChip: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },

  priceChipText: {
    fontSize: font.sizeSmall,
    fontWeight: '700',
    color: colors.successDark,
  },
});

export default styles;
