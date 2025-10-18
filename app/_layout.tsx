import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={DefaultTheme}>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: "#6200EE" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{ title: "Cadastro" }} />
                <Stack.Screen
                    name="management"
                    options={{ title: "Gerenciamento" }}
                />
                <Stack.Screen
                    name="new_event"
                    options={{ title: "Novo Evento" }}
                />
                <Stack.Screen
                    name="list_all_events"
                    options={{ title: "Eventos" }}
                />
                <Stack.Screen
                    name="qrcode"
                    options={{ title: "Validar Ingressos" }}
                />
                <Stack.Screen name="ticket" options={{ title: "Ingressos" }} />
                <Stack.Screen
                    name="event/[eventId]"
                    options={{ title: "Detalhes do Evento" }}
                />
                <Stack.Screen
                    name="report/[eventId]"
                    options={{ title: "Relatórios" }}
                />
            </Stack>
            <StatusBar style="dark" />
        </ThemeProvider>
    );
}
