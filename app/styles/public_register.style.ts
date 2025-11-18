import { StyleSheet } from 'react-native';
import { border, colors, paddings } from './themes';

export const publicRegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: paddings.extraLarge,
    justifyContent: 'flex-start',
  },

  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
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

  logo: {
    width: '100%', // 👈 full width
    height: 180, // 👈 tamanho tipo banner
    resizeMode: 'contain',
  },

  formWrapper: {
    backgroundColor: colors.backgroundLight,
    padding: 20,
    borderRadius: border.radiusLarge,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});
