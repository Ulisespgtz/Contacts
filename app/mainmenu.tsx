import { Link, router } from "expo-router";
import { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MyContext } from "./Context";

export default function Index() {
    const { loginData } = useContext(MyContext);

    const logout = () => {
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>Pulsa la foto de perfil para cambiarla</Text>
            <Link href="/CambioImagen">
                <Image style={styles.image} source={require('../assets/images/image.png')} />
            </Link>

            <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoText}>ID: {loginData.id}</Text>
                <Text style={styles.userInfoText}>Usuario: {loginData.username}</Text>
                <Text style={styles.userInfoText}>Nombre: {loginData.firstname}</Text>
                <Text style={styles.userInfoText}>Apellido: {loginData.lastname}</Text>
                <Text style={styles.userInfoText}>Correo electrónico: {loginData.email}</Text>
                <Text style={styles.userInfoText}>Experiencia (XP): {loginData.xp}</Text>
                <Text style={styles.userInfoText}>Créditos: {loginData.credits}</Text>
            </View>

            <Pressable onPress={logout} style={styles.logoutButton}>    
                <Text style={styles.logoutButtonText}>Logout</Text>
            </Pressable>

            <View style={styles.footer}>
                <Link href="/creditos">
                    <Text style={styles.footerText}>Créditos del app</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // Fondo blanco limpio
        paddingHorizontal: 20,
    },
    instructionText: {
        fontSize: 16,
        color: '#999999', // Gris opaco para el texto de instrucciones
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: '600',
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderColor: '#B0B0B0', // Borde negro claro
        borderWidth: 1,
        marginBottom: 30,
    },
    userInfoContainer: {
        alignItems: 'center',
        backgroundColor: '#F5F5F5', // Fondo gris claro
        padding: 20,
        borderRadius: 10,
        width: '100%',
        shadowColor: '#000000', // Sombra suave
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    userInfoText: {
        fontSize: 15,
        color: '#000000', // Texto negro para la información del usuario
        marginVertical: 4,
        fontWeight: '500',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#000000', // Fondo negro para el footer
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
    },
    footerText: {
        color: '#FFFFFF', // Texto blanco en el footer
        fontWeight: '600',
        fontSize: 16,
    },
    logoutButton: {
        padding: 10,
        backgroundColor: '#D3D3D3', // Botón gris claro
        borderRadius: 5,
        alignItems: 'center', 
        width: '80%',
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#000000', // Texto negro en el botón de logout
        fontSize: 16,
        fontWeight: '500',
    },
});
