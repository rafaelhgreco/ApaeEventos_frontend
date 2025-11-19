import { StyleSheet } from 'react-native';
import { border, colors, font, paddings, shadows } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: paddings.large,
    backgroundColor: colors.background,
  },

  searchContainer: {
    padding: paddings.medium,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    ...shadows,
  },

  listContent: {
    padding: paddings.large,
  },

  card: {
    backgroundColor: colors.backgroundLight,
    borderRadius: border.radiusLarge,
    marginBottom: paddings.large,
    overflow: 'hidden',
    ...shadows,
    elevation: 4,
  },

  cardHighlight: {
    borderWidth: 2,
    borderColor: colors.terceary,
    transform: [{ scale: 1.02 }],
    elevation: 8,
    shadowOpacity: 0.2,
  },

  eventBanner: {
    width: '100%',
    height: 180,
    backgroundColor: '#eee',
  },

  eventContent: {
    padding: paddings.large,
  },

  eventTitle: {
    fontSize: font.sizeExtraLarge,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: paddings.small,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: paddings.medium,
  },

  eventInfo: {
    fontSize: font.sizeSmall,
    color: colors.textSecondary,
  },

  metadataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  chip: {
    backgroundColor: colors.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
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
});
