import GenericForm from "@/components/ATOMIC/molecules/form";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { Image, Text, View } from "react-native";
import { useHome } from "../../hooks/use-home";
import { styles } from "../styles/index.style";

export default function HomeScreen() {
    const { formFields, error } = useHome();

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <View style={styles.container}>
                    <Image
                        style={styles.reactLogo}
                        source={require("@/assets/images/logo_apae.png")}
                    />
                </View>
            }
        >
            <ThemedView>
                <View style={styles.loginForm}>
                    <GenericForm title="Login" fields={formFields} />
                    {error && (
                        <Text
                            style={{
                                color: "red",
                                marginTop: 12,
                                textAlign: "center",
                                fontSize: 14,
                            }}
                        >
                            {error}
                        </Text>
                    )}
                </View>
            </ThemedView>
        </ParallaxScrollView>
    );
}
