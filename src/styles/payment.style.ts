import { StyleSheet } from 'react-native';
import { border, borderWidth, colors, font, paddings, shadows } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: paddings.large,
    backgroundColor: colors.background,
  },

  card: {
    backgroundColor: colors.backgroundLight,
    borderRadius: border.radiusLarge,
    padding: paddings.extraLarge,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    ...shadows,
  },

  title: {
    fontSize: font.sizeExtraLarge,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: paddings.large,
  },

  eventInfo: {
    backgroundColor: colors.backgroundDark,
    padding: paddings.medium,
    borderRadius: border.radiusMedium,
    marginBottom: paddings.large,
    borderWidth: borderWidth.thin,
    borderColor: colors.borderLight,
  },

  eventName: {
    fontSize: font.sizeMedium,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: paddings.small,
  },

  quantityText: {
    fontSize: font.sizeSmall,
    color: colors.text,
    marginBottom: paddings.small,
  },

  paymentMethodText: {
    fontSize: font.sizeSmall,
    color: colors.secondary,
    fontWeight: '600',
  },

  priceContainer: {
    alignItems: 'center',
    marginBottom: paddings.large,
    paddingVertical: paddings.small,
  },

  label: {
    fontSize: font.sizeMedium,
    color: colors.textSecondary,
    marginBottom: paddings.small,
  },

  valor: {
    fontSize: font.sizeExtraLarge * 1.4,
    fontWeight: '800',
    color: colors.successDark,
  },

  loadingContainer: {
    marginVertical: paddings.large,
    alignItems: 'center',
  },

  loadingText: {
    marginTop: paddings.small,
    fontSize: font.sizeSmall,
    color: colors.textSecondary,
  },

  payButton: {
    backgroundColor: colors.button,
    paddingVertical: paddings.medium,
    borderRadius: border.radiusLarge,
    alignItems: 'center',
    ...shadows,
  },

  payButtonDisabled: {
    opacity: 0.5,
  },

  payButtonText: {
    color: colors.backgroundLight,
    fontSize: font.sizeMedium,
    fontWeight: '700',
  },

  disclaimer: {
    fontSize: font.sizeSmall - 1,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: paddings.medium,
  },
});
