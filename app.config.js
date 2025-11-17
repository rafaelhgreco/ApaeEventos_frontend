import "dotenv/config";

export default {
  expo: {
    name: "ApaeEventos",
    slug: "apae-eventos",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "apaeeventos",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    // 🔐 AQUI ficam as variáveis do .env
    extra: {
      eas: {
        projectId: "b5941c7a-ff26-495c-9a3d-23dc1bf716ea",
      },
      apiUrl: "http://15.229.194.81:3000",

      // ✅ Variáveis Cognito vindas do .env
      COGNITO_REGION: process.env.COGNITO_REGION,
      COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
      COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "apae.android", // ajuste se necessário
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.anonymous.apaeeventos",
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",
      "expo-build-properties",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
    },

    owner: "rafaelhgreco",
  },
};
