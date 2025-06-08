import { StyleSheet, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { Image, Text } from "react-native";

export default function TabTwoScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            headerImage={
                <View style={styles.container}>
                    <Image
                        style={styles.reactLogo}
                        source={require("@/assets/images/logo_apae.png")}
                    />
                </View>
            }
        >
            <ThemedView style={styles.titleContainer}>
                <Text style={styles.title}>
                    Solicitar uma Conta ao Administrador
                </Text>
            </ThemedView>
            <Text style={styles.text}>
                Para solicitar sua conta, envie um email para um dos
                administradores, com seus dados( Nome, Email, Telefone e Função)
                e aguarde a criação da conta. Você receberá um email de
                confirmação quando a conta for criada.
            </Text>
            <Collapsible title="Administradores">
                <Text style={styles.text}>renanteixeira338@gmail.com</Text>
            </Collapsible>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#001122",
    },
    reactLogo: {
        width: 518,
        height: 316,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "black",
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
});
