import { border, colors, font, paddings } from '@/src/styles/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: paddings.large,
  },

  label: {
    fontSize: font.sizeMedium,
    fontWeight: '600',
    color: colors.text,
    marginBottom: paddings.small,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: border.radiusLarge,

    backgroundColor: colors.backgroundLight,

    paddingHorizontal: paddings.medium,
    minHeight: 48,

    // sombra suave (premium)
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },

  input: {
    flex: 1,
    fontSize: font.sizeMedium,
    color: colors.text,
    paddingVertical: paddings.small,
  },

  iconLeft: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconRight: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    marginTop: paddings.small,
    color: colors.error,
    fontSize: font.sizeSmall,
    fontWeight: '500',
  },
});
