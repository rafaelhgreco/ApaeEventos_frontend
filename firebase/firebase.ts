// firebaseConfig.ts

// Importações corretas para @react-native-firebase
import firebaseAuth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// --- REMOVA TUDO ISSO ---
// import Constants from "expo-constants";
// const {
//     firebaseApiKey,
//     firebaseAuthDomain,
//     firebaseProjectId,
//     firebaseStorageBucket,
//     firebaseMessagingSenderId,
//     firebaseAppId,
// } = Constants.expoConfig?.extra || {};

// const firebaseConfig = {
//     apiKey: firebaseApiKey,
//     authDomain: firebaseAuthDomain,
//     projectId: firebaseProjectId,
//     storageBucket: firebaseStorageBucket,
//     messagingSenderId: firebaseMessagingSenderId,
//     appId: firebaseAppId,
// };
// --- FIM DO QUE DEVE SER REMOVIDO ---

export const getFirebaseAuth = () => firebaseAuth();
export const getFirebaseFirestore = () => firestore();

// Se você precisar da instância do App principal (menos comum com @react-native-firebase,
// a menos que esteja gerenciando múltiplos apps), você importaria assim:
// import firebaseApp from '@react-native-firebase/app';
// export const getFirebaseApp = () => firebaseApp;
