import { StyleSheet } from "react-native";
import { border, colors } from "../../app/styles/themes";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: colors.background,
  },

  // CARD PRINCIPAL
  box: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: border.radiusLarge,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: 8,
  },

  date: {
    fontSize: 16,
    color: "#6b7280",
    fontStyle: "italic",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
  },

  error: {
    color: "#dc2626",
    textAlign: "center",
    marginTop: 40,
    fontSize: 18,
    fontWeight: "600",
  },

  // INPUT NO MODO EDIÇÃO
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: border.radiusMedium,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#f9fafb",
  },

  // LABEL DOS CAMPOS
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginTop: 10,
    marginBottom: 4,
  },

  // BOX DE BOTÕES
  buttonBox: {
    marginTop: 24,
    gap: 16,
  },
});

export default styles;
