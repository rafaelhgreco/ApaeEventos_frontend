import { StyleSheet } from 'react-native';
import { border, colors, font, paddings } from '../../../app/styles/themes';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: paddings.large,
  },

  label: {
    fontWeight: '700',
    fontSize: font.sizeMedium,
    marginBottom: paddings.small,
    color: colors.text,
  },

  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,

    paddingVertical: paddings.medium,
    paddingHorizontal: paddings.large,

    borderRadius: border.radiusLarge,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.backgroundLight,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  dateText: {
    color: colors.text,
    fontSize: font.sizeMedium,
    fontWeight: '500',
    flex: 1,
  },
});
