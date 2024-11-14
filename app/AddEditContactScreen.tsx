import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const AddEditContactScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSave = () => {
    // Here, you would typically save the data to your contacts or backend system
    if (!firstName || !lastName || !email || !phone) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Example: Sending data to a server or saving locally
    console.log({ firstName, lastName, email, phone });

    // Navigate back to the contacts list
    router.back(); // This will go back to the previous screen, which is ContactListScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Contact</Text>

      <View style={styles.inputFieldLabel}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputFieldLabel}>
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputFieldLabel}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
      </View>

      <View style={styles.inputFieldLabel}>
        <Text style={styles.inputLabel}>Phone</Text>
        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Pressable style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>Save Contact</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={styles.goBackButton}>
        <Text style={styles.goBackText}>Go Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputFieldLabel: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0B0B0',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  saveButton: {
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  goBackButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  goBackText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default AddEditContactScreen;

