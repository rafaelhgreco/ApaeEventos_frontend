import { StyleSheet } from 'react-native';
import { border, colors, paddings } from './themes';

export const publicRegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: paddings.large,
    justifyContent: 'flex-start',
  },

  /* ------------------------------
        BANNER — some ao abrir teclado
  ------------------------------ */
  bannerContainer: {
    width: '100%',
    height: 280, // altura recomendada (pode ajustar entre 140–220)
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden', // garante que nada vaze das bordas arredondadas
    backgroundColor: '#e9eef5', // fallback suave (sem tela branca enquanto carrega)
  },

  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // hero de verdade: preenche e corta se precisar
  },

  /* ------------------------------
        FORM
  ------------------------------ */
  formWrapper: {
    backgroundColor: colors.backgroundLight,
    padding: 22,
    borderRadius: border.radiusLarge,
    marginTop: 10,

    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,

    // ESSENCIAL para o input não ficar atrás do teclado
    marginBottom: 60,
  },
});
