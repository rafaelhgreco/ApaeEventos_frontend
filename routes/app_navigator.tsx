import HomeScreen from "@/app/(tabs)";
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
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Home" }}
                />
                <Stack.Screen
                    name="TesteScreen"
                    component={TesteScreen}
                    options={{ title: "TesteScreen" }}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                />
                <Stack.Screen
                    name="About"
                    component={TabTwoScreen}
                    options={{ title: "TabTwoScreen" }}
                />
                <Stack.Screen
                    name="Management"
                    component={ManagementScreen}
                    options={{ title: "Management" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
