import HomeScreen from "@/app/(tabs)";
import EventDetailsPage from "@/app/event/[eventId]";
import EventsPage from "@/app/list_all_events";
import NewEventScreen from "@/app/new_event";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabTwoScreen from "../app/(tabs)/explore";
import ManagementScreen from "../app/management";
import RegisterScreen from "../app/register";
import TesteScreen from "../app/teste";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: "#6200EE" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Página Inicial" }}
                />
                <Stack.Screen
                    name="TesteScreen"
                    component={TesteScreen}
                    options={{ title: "Teste" }}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ title: "Cadastro" }}
                />
                <Stack.Screen
                    name="About"
                    component={TabTwoScreen}
                    options={{ title: "Explorar" }}
                />
                <Stack.Screen
                    name="Management"
                    component={ManagementScreen}
                    options={{ title: "Gerenciamento" }}
                />
                <Stack.Screen
                    name="NewEvent"
                    component={NewEventScreen}
                    options={{ title: "Novo Evento" }}
                />
                <Stack.Screen
                    name="EventPage"
                    component={EventsPage}
                    options={{ title: "Eventos" }}
                />
                <Stack.Screen
                    name="EventDetails"
                    component={EventDetailsPage}
                    options={{ title: "Detalhes do Evento" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
