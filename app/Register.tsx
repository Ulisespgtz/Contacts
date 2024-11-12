import { Endpoints } from '@/constants/Endpoints';
import * as Crypto from 'expo-crypto';
import { router } from "expo-router";
import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MyContext } from "./Context";

export default function RegisterScreen() {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { setLoginData } = useContext(MyContext);

    const onRegister = async () => {
        const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);

        const formData = new FormData();
        formData.append('token', 'code37');
        formData.append('id', id);
        formData.append('username', username);
        formData.append('pass', hashedPassword);
        formData.append('firstname', firstName);
        formData.append('lastname', lastName);
        formData.append('email', email);

        fetch(Endpoints.REGISTER, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setErrorMessage(data.error);
            } else {
                console.log(data);
                setLoginData(data);
                router.replace('/mainmenu');
            }
        })
        .catch(err => setErrorMessage("Error al conectar con el servidor."));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar Usuario</Text>
            <View style={styles.inputFieldLabel}>
                <Text style={styles.inputLabel}>ID</Text>
                <TextInput placeholder="ID" value={id} onChangeText={setId} style={styles.input} />
            </View>
            <View style={styles.inputFieldLabel}>
                <Text style={styles.inputLabel}>Nombre de usuario</Text>
                <TextInput placeholder="Nombre de usuario" value={username} onChangeText={setUsername} style={styles.input} />
            </View>
            <View style={styles.inputFieldLabel}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
            </View>
            <View style={styles.inputFieldLabel}>
                <Text style={styles.inputLabel}>Nombre</Text>
                <TextInput placeholder="Nombre" value={firstName} onChangeText={setFirstName} style={styles.input} />
            </View>
            <View style={styles.inputFieldLabel}>
                <Text style={styles.inputLabel}>Apellido</Text>
                <TextInput placeholder="Apellido" value={lastName} onChangeText={setLastName} style={styles.input} />
            </View>
            <View style={styles.inputFieldLabel}>
                <Text style={styles.inputLabel}>Correo electrónico</Text>
                <TextInput placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
            </View>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <Pressable style={styles.registerButton} onPress={onRegister}>
                <Text style={styles.registerButtonText}>Registrar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', // Fondo blanco limpio
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000000', // Título en color negro
    },
    inputFieldLabel: {
        width: '100%',
        marginBottom: 15,
    },
    inputLabel: {
        color: '#333333', // Gris oscuro para el texto de las etiquetas
        marginBottom: 5,
        fontWeight: 'bold', // Negrita para el texto de las etiquetas
    },
    input: {
        borderWidth: 1,
        borderColor: '#B0B0B0', // Borde negro claro
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#FFFFFF', // Fondo blanco en los inputs
        color: '#000000', // Texto negro en los inputs
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    registerButton: {
        padding: 15,
        backgroundColor: '#000000', // Botón negro
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    registerButtonText: {
        color: '#FFFFFF', // Texto blanco en el botón
        fontSize: 16,
        fontWeight: '500',
    },
});
