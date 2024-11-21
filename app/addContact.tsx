import * as Contacts from 'expo-contacts';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AddContact: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const addContact = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const newPerson: Contacts.Contact = {
          contactType: 'person', // Se agrega el campo requerido
          name,
          emails: email ? [{ label: 'work', email }] : undefined,
          phoneNumbers: number ? [{ label: 'mobile', number }] : undefined,
        };

        const contactId = await Contacts.addContactAsync(newPerson);

        if (contactId) {
          Alert.alert('Success', 'Contact added successfully');
          navigation.goBack();
        } else {
          Alert.alert('Error', 'Failed to add contact');
        }
      } else {
        Alert.alert('Permission Denied', 'Cannot add contacts without permission');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={require('../images/user.png')}
        style={styles.userIcon}
      />

      <TextInput
        placeholder="Enter Name"
        placeholderTextColor="#fff"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Mobile"
        placeholderTextColor="#fff"
        value={number}
        onChangeText={setNumber}
        maxLength={10}
        keyboardType="number-pad"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={addContact}
      >
        <Text style={styles.saveButtonText}>Save Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  userIcon: {
    width: 60,
    height: 60,
    marginTop: 50,
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#fff',
    paddingLeft: 15,
    alignSelf: 'center',
    marginTop: 20,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 50,
    width: '90%',
    marginTop: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
  },
});

export default AddContact;
