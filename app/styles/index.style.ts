import { StyleSheet } from "react-native";
import { border, paddings } from "../styles/themes";

export const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: paddings.medium, 
    },
    stepContainer: {
        
        marginBottom: paddings.medium,
    },
    loginForm: {
        flex: 1,
        justifyContent: "center",
        padding: paddings.large,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: border.radiusMedium,
    },
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    backgroundColor: '#001122', 
  },
  reactLogo: {
    width: 518,
    height: 316,
  },
});