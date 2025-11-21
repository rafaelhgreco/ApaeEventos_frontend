import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  /* ---------------------------------------------------------
     HEADER / TÍTULO (se necessário no GenericForm)
  --------------------------------------------------------- */
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  /* ---------------------------------------------------------
     LOGO DO TOPO (com animação)
  --------------------------------------------------------- */
  logoWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 16,
  },

  reactLogo: {
    width: 180, // antes estava 518px, gigante
    height: 180,
    resizeMode: 'contain',
  },

  /* ---------------------------------------------------------
     CONTAINER PRINCIPAL
  --------------------------------------------------------- */
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#001122', // seu tema atual
  },

  /* ---------------------------------------------------------
     FORMULÁRIO
  --------------------------------------------------------- */
  registerForm: {
    width: '100%',
    marginTop: 10,
    paddingBottom: 40,
  },

  /* ---------------------------------------------------------
     TÍTULO PRINCIPAL DO FORM
  --------------------------------------------------------- */
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
});
