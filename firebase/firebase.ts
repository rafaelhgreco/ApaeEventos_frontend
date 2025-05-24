import Constants from "expo-constants";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
const {
    firebaseApiKey,
    firebaseAuthDomain,
    firebaseProjectId,
    firebaseStorageBucket,
    firebaseMessagingSenderId,
    firebaseAppId,
} = Constants.expoConfig?.extra || {};
const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

export const initializeFirebaseApp = () => {
    if (!app) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app); // Inicializa o Auth
        db = getFirestore(app); // Inicializa o Firestore
        console.log("Firebase app initialized."); // Opcional: para depuração
    }
    return { app, auth, db };
};

// Exporte as instâncias para usar na sua aplicação
export const getFirebaseApp = () => app;
export const getFirebaseAuth = () => auth; // Exporte a instância de Auth
export const getFirebaseFirestore = () => db; // Exporte a instância de Firestore
