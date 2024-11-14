import * as Contacts from 'expo-contacts';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const ContactListScreen = () => {
  const [contacts, setContacts] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactText}>{item.name}</Text>
      <Link href="/AddEditContactScreen"> //change this to link the edit screen 
        <Text style={styles.editText}>Edit</Text>
      </Link>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      
      {contacts.length === 0 ? (
        <Text style={styles.noContactsText}>No Contacts</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <Pressable style={styles.addContactButton}>
        <Link href="/AddEditContactScreen">
          <Text style={styles.addContactButtonText}>Add Contact</Text>
        </Link>
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
    color: '#000',
  },
  contactItem: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 18,
    color: '#000',
  },
  editText: {
    color: '#007bff',
    fontSize: 16,
  },
  noContactsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#777',
    marginVertical: 20,
  },
  addContactButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
  },
  addContactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ContactListScreen;
