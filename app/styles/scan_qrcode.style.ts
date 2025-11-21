import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },

  camera: {
    flex: 1,
  },

  scanFrameContainer: {
    position: 'absolute',
    top: '25%',
    left: '12%',
    width: '76%',
    height: '40%',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanFrame: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: '#00Eaff',
    borderRadius: 20,
    opacity: 0.8,
  },

  closeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#00000088',
    padding: 12,
    borderRadius: 50,
  },

  loadingOverlay: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
