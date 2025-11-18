import { StyleSheet } from 'react-native';
import { border, paddings } from '../styles/themes';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  // BANNER FULL WIDTH
  bannerContainer: {
    width: '100%',
    marginBottom: 24,
    overflow: 'hidden',
    // se quiser uma faixa de cor atrás do banner:
    // backgroundColor: "#001122",
  },
  bannerImage: {
    width: '100%',
    height: 200, // aumenta/diminui a altura do banner aqui
    resizeMode: 'cover',
  },

  // CARD DO FORM
  formCard: {
    width: '88%',
    backgroundColor: '#fff',
    padding: paddings.large,
    borderRadius: border.radiusMedium,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 14,
  },

  // se tiver outras telas usando:
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: paddings.medium,
  },
  stepContainer: {
    marginBottom: paddings.medium,
  },
});
