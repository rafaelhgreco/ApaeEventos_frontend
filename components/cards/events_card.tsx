// // import { useEventStore } from "@/stores/event_store";

// // import { useEventStore } from "@/src/infrastructure/stores/event_store";
// import { border, colors } from "@/styles/themes";
// import { Link } from "expo-router";
// import React, { useEffect } from "react";
// import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
// import SubmitButton from "../ATOMIC/atoms/submit_button";
// import { EventItem } from "./event_item";

// export default function EventsCard() {
//     const { events, loading, fetchEvents } = useEventStore();

//     useEffect(() => {
//         fetchEvents();
//     }, [fetchEvents]);

//     if (loading) {
//         return (
//             <View>
//                 <Text>Carregando eventos...</Text>
//             </View>
//         );
//     }

//     function handleClick(): void {
//         console.log("Cadastrar Evento");
//         // Implementar a lógica para cadastrar um evento
//     }

//     return (
//         <View>
//             <View style={styles.container}>
//                 <Text style={styles.title}>Próximos Eventos</Text>
//                 <ScrollView style={styles.scrollView}>
//                     {events.map((event) => (
//                         <EventItem key={event.id} event={event} />
//                     ))}
//                 </ScrollView>
//                 <View>
//                     <Link href="/explore" style={styles.linkBox}>
//                         <Text style={styles.link}>Ver todos os eventos</Text>
//                     </Link>
//                 </View>
//             </View>
//             <View style={styles.actionsBox}>
//                 <Text style={styles.title}>Ações</Text>
//                 <View style={styles.buttonRow}>
//                     <View style={styles.buttonContainer}>
//                         <SubmitButton
//                             label="Novo evento"
//                             onClick={handleClick}
//                         />
//                     </View>
//                     <View style={styles.buttonContainer}>
//                         <SubmitButton
//                             label="Validar Ingresso"
//                             onClick={handleClick}
//                         />
//                     </View>
//                 </View>
//                 <View style={styles.buttonRow}>
//                     <View style={styles.buttonContainer}>
//                         <SubmitButton label="Dashboard" onClick={handleClick} />
//                     </View>
//                     <View style={styles.buttonContainer}>
//                         <SubmitButton
//                             label="Relatorios"
//                             onClick={handleClick}
//                         />
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         height: Dimensions.get("window").height * 0.3,
//         width: 350,
//         maxHeight: 250,
//         backgroundColor: "#fff",
//         borderRadius: border.radiusLarge,
//     },
//     actionsBox: {
//         marginTop: 10,
//         flex: 1,
//         padding: 20,
//         backgroundColor: "#fff",
//         width: 350,
//         maxHeight: 195,
//         borderRadius: border.radiusLarge,
//     },
//     buttonRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         padding: 10,
//     },
//     buttonContainer: {
//         width: "48%", // Largura com espaço entre os botões
//         height: "100%", // Altura total da linha
//     },
//     button: {
//         padding: 10,
//         borderRadius: border.radiusMedium,
//         width: 110,
//         alignItems: "center",
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: colors.primary,
//         marginBottom: 10,
//     },
//     scrollView: {
//         flex: 1,
//     },
//     link: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "green",
//         textDecorationLine: "underline",
//     },
//     linkBox: {
//         padding: 10,
//         alignSelf: "flex-end",
//     },
// });
