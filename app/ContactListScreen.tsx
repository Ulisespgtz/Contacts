import { useNavigation } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ContactListScreen() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        });
        setContacts(data);
      }
    })();
  }, []);

  const deleteContact = async (id: string) => {
    await Contacts.removeContactAsync(id);
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('AddEditContact', { contact: item })}
            style={styles.contactItem}
          >
            <Text style={styles.contactName}>{item.name}</Text>
            {item.phoneNumbers?.[0] && (
              <Text style={styles.contactDetails}>{item.phoneNumbers[0].number}</Text>
            )}
            {item.emails?.[0] && (
              <Text style={styles.contactDetails}>{item.emails[0].email}</Text>
            )}
            <Button title="Delete" onPress={() => deleteContact(item.id)} color="#f00" />
          </TouchableOpacity>
        )}
      />
      <Button
        title="Add New Contact"
        onPress={() => navigation.navigate('AddEditContact')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  contactItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contactDetails: {
    color: '#888',
  },
});
