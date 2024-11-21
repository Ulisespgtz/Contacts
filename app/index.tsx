import * as Contacts from 'expo-contacts';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ContactsScreen: React.FC = () => {
  const [contactList, setContactList] = useState<Contacts.Contact[]>([]); // Estado para guardar los contactos
  const router = useRouter();

  useEffect(() => {
    const requestContactPermission = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });
        setContactList(data); // Actualiza la lista de contactos
      } else {
        console.warn('Permission denied');
      }
    };

    requestContactPermission(); // Solicitar permisos al cargar el componente
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <FlatList
  data={contactList}
  keyExtractor={(item) => item.id || `${item.name}-${Math.random()}`}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => {
        router.push({
          pathname: '/contactDetails',
          params: { data: JSON.stringify(item) },
        });
      }}
    >
      <View style={styles.contactInfo}>
        <Image
          source={require('../images/user.png')}
          style={styles.contactImage}
        />
        <View style={styles.contactText}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactNumber}>
            {item.phoneNumbers?.[0]?.number || 'No number'}
          </Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() =>
            item.phoneNumbers?.[0]?.number &&
            Linking.openURL(`sms:${item.phoneNumbers[0].number}`)
          }
        >
          <Image
            source={require('../images/message.png')}
            style={styles.actionIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            item.phoneNumbers?.[0]?.number &&
            Linking.openURL(`tel:${item.phoneNumbers[0].number}`)
          }
        >
          <Image
            source={require('../images/call.png')}
            style={styles.actionIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )}
/>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/addContact')}
      >
        <Image source={require('../images/plus.png')} style={styles.addIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contactItem: {
    width: '90%',
    height: 70,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactImage: {
    width: 40,
    height: 40,
    marginLeft: 15,
  },
  contactText: {
    padding: 10,
  },
  contactName: {
    color: '#fff',
  },
  contactNumber: {
    color: '#fff',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingRight: 15,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginRight: 20,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 30,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 24,
    height: 24,
  },
});

export default ContactsScreen;
