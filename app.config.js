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
        newArchEnabled: false, // ✅ Desabilitado para estabilidade

        extra: {
            eas: {
                projectId: "b5941c7a-ff26-495c-9a3d-23dc1bf716ea",
            },
            // ✅ Hard-code a URL para builds locais (ou use process.env com fallback)
            apiUrl:
                process.env.EXPO_PUBLIC_API_BASE_URL ||
                "http://15.229.194.81:3000",
            cognitoRegion:
                process.env.EXPO_PUBLIC_COGNITO_REGION || "us-east-1",
            cognitoUserPoolId:
                process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID || "",
            cognitoClientId: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID || "",
            stripePublishableKey:
                process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
        },

        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.apaeeventos.app", // ✅ Formato correto
        },

        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
            package: "com.apaeeventos.app", // ✅ Mesmo package que o bundle identifier
            usesCleartextTraffic: true, // ✅ Permite HTTP
        },

        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png",
        },

        plugins: [
            "expo-router",
            [
                "expo-build-properties",
                {
                    android: {
                        compileSdkVersion: 35,
                        targetSdkVersion: 35,
                        buildToolsVersion: "35.0.0",
                    },
                },
            ],
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
