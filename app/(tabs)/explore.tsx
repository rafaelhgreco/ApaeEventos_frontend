import { StyleSheet } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabTwoScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            headerImage={
                <IconSymbol
                    size={310}
                    color="#808080"
                    name="chevron.left.forwardslash.chevron.right"
                    style={styles.headerImage}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">
                    Solicitar uma Conta ao Administrador
                </ThemedText>
            </ThemedView>
            <ThemedText>
                Para solicitar sua conta, envie um email para um dos
                administradores, com seus dados( Nome, Email, Telefone e Função)
                e aguarde a criação da conta. Você receberá um email de
                confirmação quando a conta for criada.
            </ThemedText>
            <Collapsible title="E-mail dos administradores">
                <ThemedText>
                    <ThemedText type="defaultSemiBold">
                        renanteixeira338@gmail.com
                    </ThemedText>{" "}
                </ThemedText>
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
});
