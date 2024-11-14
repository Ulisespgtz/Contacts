import { useNavigation, useRoute } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

export default function AddEditContactScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const contact = route.params?.contact || {};
  
  const [name, setName] = useState(contact.name || '');
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumbers?.[0]?.number || '');
  const [email, setEmail] = useState(contact.emails?.[0]?.email || '');

  const saveContact = async () => {
    if (!name || !phoneNumber || !email) {
      Alert.alert('All fields are required');
      return;
    }

    const newContact = {
      [Contacts.Fields.FirstName]: name,
      [Contacts.Fields.PhoneNumbers]: [{ label: 'mobile', number: phoneNumber }],
      [Contacts.Fields.Emails]: [{ email }],
    };

    if (contact.id) {
      await Contacts.updateContactAsync({ id: contact.id, ...newContact });
    } else {
      await Contacts.addContactAsync(newContact);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <Button title="Save Contact" onPress={saveContact} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
});
