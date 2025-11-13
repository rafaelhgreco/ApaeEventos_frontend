import Constants from "expo-constants";

export const ENV = {
    API_BASE_URL:
        Constants.expoConfig?.extra?.apiUrl || "http://15.229.194.81:3000",
    COGNITO_REGION: Constants.expoConfig?.extra?.cognitoRegion || "us-east-1",
    COGNITO_USER_POOL_ID: Constants.expoConfig?.extra?.cognitoUserPoolId || "",
    COGNITO_CLIENT_ID: Constants.expoConfig?.extra?.cognitoClientId || "",
    STRIPE_PUBLISHABLE_KEY:
        Constants.expoConfig?.extra?.stripePublishableKey || "",
};

// Debug em desenvolvimento
if (__DEV__) {
    console.log("🔧 ENV Config:", {
        API_BASE_URL: ENV.API_BASE_URL,
        COGNITO_REGION: ENV.COGNITO_REGION,
        COGNITO_USER_POOL_ID: ENV.COGNITO_USER_POOL_ID
            ? "✅ SET"
            : "❌ NOT SET",
        COGNITO_CLIENT_ID: ENV.COGNITO_CLIENT_ID ? "✅ SET" : "❌ NOT SET",
        STRIPE_PUBLISHABLE_KEY: ENV.STRIPE_PUBLISHABLE_KEY
            ? "✅ SET"
            : "❌ NOT SET",
    });
}

// Backwards compatibility
export const env = ENV;
