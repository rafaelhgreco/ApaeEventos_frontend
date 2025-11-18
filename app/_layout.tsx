// eslint-disable-next-line import/no-unresolved
import { STRIPE_PUBLISHABLE_KEY } from "@env";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    if (!loaded) return null;

    return (
        <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
            <ThemeProvider value={DefaultTheme}>
                <Stack
                    screenOptions={{
                        headerShown: true,
                        animation: "fade",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: "#fff" },
                        headerShadowVisible: false,
                        contentStyle: { backgroundColor: "#f2f2f2" },
                    }}
                >
                    {/* GRUPO DAS TABS — sem header */}
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />

                    {/* Not found */}
                    <Stack.Screen name="+not-found" />
                </Stack>

                <StatusBar style="dark" />
            </ThemeProvider>
        </StripeProvider>
    );
}
