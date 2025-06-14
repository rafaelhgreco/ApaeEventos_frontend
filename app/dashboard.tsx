import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

export default function DashboardPage() {
    const navigation = useNavigation();
    const router = useRouter();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Dashboard",
        });
    }, [navigation]);

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Bem-vindo ao Dashboard!</Text>
        </View>
    );
}
