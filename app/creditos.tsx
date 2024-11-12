// pantalla main menu
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Text style={styles.title}>Equipo Dyderot</Text>
                <Text style={styles.memberName}>Ulises Pineda Gutiérrez</Text>
                <Text style={styles.memberName}>Salomé Robin</Text>
                <Text style={styles.memberName}>Mustapha El Mesoudi</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 Dyderot</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF", // Fondo blanco para un diseño limpio
        padding: 20,
    },
    profile: {
        backgroundColor: "#F5F5F5", // Gris claro para el fondo del perfil
        width: 300,
        padding: 20, // Espaciado interno
        borderRadius: 10, // Esquinas redondeadas
        shadowColor: "transparent", // Sin sombras para un diseño plano
        alignItems: 'center', // Centrar el contenido del perfil
    },
    title: {
        fontSize: 24,
        color: '#333333', // Gris oscuro para el título
        marginBottom: 15,
        fontWeight: '600',
    },
    memberName: {
        fontSize: 18,
        color: '#555555', // Gris medio para los nombres
        marginVertical: 5,
        fontWeight: '500',
    },
    footer: {
        position: "absolute",
        bottom: 20,
        backgroundColor: "#333333", // Fondo gris oscuro para el footer
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%', // Ancho completo para el footer
    },
    footerText: {
        color: '#FFFFFF', // Texto blanco en el footer
        fontWeight: '600',
        fontSize: 16,
    },
});
