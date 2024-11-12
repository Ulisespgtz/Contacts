import { Endpoints } from "@/constants/Endpoints.ts";
import * as Crypto from 'expo-crypto';
import { useFonts } from "expo-font";
import { Link, router } from "expo-router";
import { useContext, useState } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { MyContext } from "./Context";
import LogoutIcon from './logouticon';
import StarIcon from './staricon';

export default function Index() {
	const [loaded, error] = useFonts({
		'poppins': require('../assets/fonts/PoppinsSemiBold.ttf'), // Asegúrate de tener la fuente adecuada
	});

	const [userValue, setUserValue] = useState('');
	const [passValue, setPassValue] = useState('');
	const [failedLogin, setFailedLogin] = useState(false);

	const { loginData, setLoginData } = useContext(MyContext);

	const onButtonlogin = async () => {
		console.log("loggin in");

		const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,
			passValue);

		const form = new FormData();
		form.append('token', 'code37');
		form.append('user', userValue);
		form.append('pass', digest);

		fetch(Endpoints.LOGIN, {
			method: 'POST',
			body: form
		})
			.then(response => response.json())
			.then(data => {
				if (!data.error && data.id) {
					console.log("Login exitoso");

					console.log(data);
					setLoginData(data);
					router.replace('/mainmenu');
				}
				else
					setFailedLogin(true);
			})
			.catch(err => { console.log(err) });
	}

	return (
		<View style={styles.container}>
			<StarIcon width='100' height='100'></StarIcon>
			<Text style={styles.title}>Dyderot</Text>
			<Text style={styles.welcomeText}>Bienvenido</Text> 
			<View style={styles.inputfieldlabel}>
				<Text style={styles.inputLabel}>Usuario</Text> 
				<TextInput style={styles.input} onChangeText={setUserValue}></TextInput>
			</View>
			<View style={styles.inputfieldlabel}>
				<Text style={styles.inputLabel}>Contraseña</Text> 
				<TextInput style={styles.input} onChangeText={setPassValue} secureTextEntry></TextInput>
			</View>
			{failedLogin ? (<Text style={styles.error}>Usuario o contraseña incorrectos</Text>) : undefined}
			<Pressable style={styles.botonconlogo} onPress={onButtonlogin}>
				<LogoutIcon width='32' height='32'></LogoutIcon>
				<Text style={styles.loginButtonText}>Iniciar sesión</Text> 
			</Pressable>
			<Link href="/Register" asChild>
				<TouchableOpacity style={styles.flatButton}>
					<Text style={styles.buttonText}>Regístrate</Text>
				</TouchableOpacity>
			</Link>
			<Link href="/mainmenu" asChild>
				<TouchableOpacity style={styles.flatButton}>
					<Text style={styles.buttonText}>Menú inicial</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF', // Fondo blanco
		paddingHorizontal: 20,
	},
	title: {
		fontFamily: 'poppins',
		fontSize: 36,
		color: '#000000', // Negro para el texto del título
		marginBottom: 10,
	},
	welcomeText: {
		fontFamily: 'poppins',
		fontSize: 30, // Tamaño de letra del mensaje de bienvenida, un poco menor que el título
		color: 'rgba(0, 0, 0, 0.6)', // Gris opaco
		marginBottom: 30,
		fontWeight: 'bold', // Negrita
	},
	inputfieldlabel: {
		width: '60%',
		marginBottom: 10,
	},
	inputLabel: {
		color: '#1E3A5F', // Color del texto de usuario y contraseña
		marginBottom: 5,
		fontWeight: 'bold', // Negrita
	},
	input: {
		height: 45,
		width: '100%',
		margin: 10,
		borderWidth: 1,
		borderColor: '#B0C4DE', // Light blue border
		paddingHorizontal: 10,
		borderRadius: 8,
		backgroundColor: '#FFFFFF', // White background for input fields
		color: '#1E3A5F',
	},
	botonconlogo: {
		backgroundColor: '#D3D3D3', // Gris claro para el botón de iniciar sesión
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 12,
		borderColor: '#1E3A5F', // Dark blue border
		borderWidth: 1,
		marginVertical: 10,
	},
	error: {
		color: '#FF6347', // Soft red for errors
		padding: 5,
		marginBottom: 10,
		fontSize: 14,
	},
	flatButton: {
		backgroundColor: '#000000', // Negro para los botones planos
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 8,
		alignItems: 'center',
		marginVertical: 10, // Spacing between buttons
	},
	loginButtonText: {
		color: '#000000', // Texto del botón de iniciar sesión en negro
		fontSize: 16,
		fontWeight: '600',
		marginLeft: 10, // Espacio entre el ícono y el texto
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
});
