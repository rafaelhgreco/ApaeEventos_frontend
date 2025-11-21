import { StyleSheet } from 'react-native';
import { border, colors, font, paddings, shadows } from './themes';

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
    backgroundColor: colors.background,
  },

  loadingText: {
    marginTop: paddings.medium,
    fontSize: font.sizeMedium,
    color: colors.text,
  },

  errorIcon: {
    fontSize: 60,
    marginBottom: paddings.medium,
  },

  error: {
    textAlign: 'center',
    color: colors.error,
    fontSize: font.sizeMedium,
    marginBottom: paddings.medium,
  },

  retryButton: {
    backgroundColor: colors.button,
    paddingHorizontal: paddings.extraLarge,
    paddingVertical: paddings.medium,
    borderRadius: border.radiusMedium,
    ...shadows,
  },

  retryButtonText: {
    color: colors.backgroundLight,
    fontSize: font.sizeMedium,
    fontWeight: '600',
  },

  emptyIcon: {
    fontSize: 60,
    marginBottom: paddings.medium,
  },

  emptyTitle: {
    fontSize: font.sizeLarge,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
  },

  emptySubtitle: {
    marginTop: paddings.small,
    color: colors.text,
    fontSize: font.sizeSmall,
    textAlign: 'center',
    paddingHorizontal: paddings.extraLarge,
  },

  /* ----- BUSCA ----- */
  searchContainer: {
    padding: paddings.medium,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    ...shadows,
  },

  /* ----- LISTA ----- */
  listContent: {
    padding: paddings.large,
    paddingBottom: 40,
  },

  /* ----- CARD DE EVENTO ----- */
  card: {
    backgroundColor: colors.backgroundLight,
    borderRadius: border.radiusLarge,
    marginBottom: paddings.extraLarge,
    overflow: 'hidden',
    ...shadows,
    elevation: 4,
  },

  cardHighlight: {
    borderWidth: 2,
    borderColor: colors.terceary,
    transform: [{ scale: 1.02 }],
    elevation: 12,
    shadowOpacity: 0.2,
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
    fontSize: font.sizeExtraLarge,
    fontWeight: '800',
    color: colors.primaryDark,
    marginBottom: 4,
  },

  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
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
