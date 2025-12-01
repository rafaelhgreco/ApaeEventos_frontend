import { StyleSheet } from 'react-native';
import { border, colors, font, paddings, shadows } from './themes';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: paddings.large,
    backgroundColor: colors.background,
    gap: 24,
  },

  /* LOADING */
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: paddings.large,
  },
  loadingText: {
    marginTop: 12,
    fontSize: font.sizeMedium,
    color: colors.textSecondary,
  },

  /* EVENTO */
  eventCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: border.radiusLarge,
    overflow: 'hidden',
    ...shadows,
  },
  banner: {
    width: '100%',
    height: 180,
  },
  eventInfoBox: {
    padding: paddings.large,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  eventSubtitle: {
    fontSize: 16,
    color: colors.secondary,
    marginTop: 4,
  },
  eventDate: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 6,
  },

  /* BOX DE PREÇO */
  priceBox: {
    backgroundColor: colors.backgroundLight,
    borderRadius: border.radiusLarge,
    padding: paddings.large,
    ...shadows,
    gap: 12,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: 16,
    color: colors.text,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },

  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 6,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.successDark,
  },

  formTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },
});
