import { Endpoints } from "@/constants/Endpoints";
import { Camera, CameraType } from 'expo-camera/legacy';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useRef, useState } from 'react';
import { ActivityIndicator, Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MyContext } from "./Context";

export default function App() {
  const { loginData, setLoginData } = useContext(MyContext);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Necesitamos tu permiso para acceder a la cámara</Text>
        <Button onPress={requestPermission} title="Permitir acceso" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      setCapturedPhoto(photo.uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0,
    });

    if (!result.canceled) {
      setCapturedPhoto(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!capturedPhoto) {
      alert("Primero toma o selecciona una foto.");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append('token', 'code37');
    form.append('id', loginData?.id || "1999");
    form.append('username', loginData?.username);
    form.append('image', {
      uri: Platform.OS === 'ios' ? capturedPhoto.replace('file://', '') : capturedPhoto,
      name: 'profile_picture.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch(Endpoints.SET_PROFILE_PICTURE, {
        method: 'POST',
        body: form,
      });

      const data = await response.json();
      if (response.ok && data && !data.error && data.pfp_url) {
        setLoginData({ ...loginData, pfp_url: data.pfp_url });
        alert("¡Imagen cargada con éxito!");
      } else {
        alert("Error al cargar la imagen: " + (data.error || "Error desconocido"));
      }
    } catch (err) {
      console.error("Error durante la carga:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={{ width: 200, height: 200 }}
        type={type}
        ref={cameraRef}
        pictureSize="640x480"
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Cambiar Cámara</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Tomar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.text}>Cargar Imagen</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {capturedPhoto && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedPhoto }} style={styles.preview} />
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.uploadText}>Subir Imagen</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  permissionText: {
    textAlign: 'center',
    color: '#333333',
    margin: 20,
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  uploadText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
