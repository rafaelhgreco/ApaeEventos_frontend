import { StyleSheet } from 'react-native';
import { border, colors, font, paddings, shadows } from './themes';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: paddings.large,
  },

  title: {
    fontSize: font.sizeLarge,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: paddings.large,
  },

  ticketCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: border.radiusLarge,
    padding: paddings.large,
    marginBottom: paddings.large,
    ...shadows,
    elevation: 3,
  },

  eventTitle: {
    fontSize: font.sizeMedium,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: paddings.small,
  },

  eventDetails: {
    fontSize: font.sizeSmall,
    color: colors.textSecondary,
    marginBottom: paddings.small,
    lineHeight: 20,
  },

  price: {
    fontSize: font.sizeDefault,
    color: colors.successDark,
    fontWeight: '700',
    marginBottom: paddings.small,
  },

  status: {
    fontSize: font.sizeDefault,
    fontWeight: '600',
    color: colors.text,
    marginBottom: paddings.medium,
  },

  qrBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundDark,
    padding: paddings.large,
    borderRadius: border.radiusMedium,
    marginTop: paddings.small,
  },

  qrImage: {
    width: 180,
    height: 180,
    marginBottom: paddings.small,
  },

  code: {
    fontSize: font.sizeSmall,
    fontWeight: '700',
    color: colors.primary,
  },

  missingQr: {
    textAlign: 'center',
    color: colors.error,
    fontStyle: 'italic',
    marginTop: paddings.small,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontSize: font.sizeMedium,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: paddings.small,
    fontSize: font.sizeDefault,
    color: colors.textSecondary,
  },
});
