import { RouteProp, useRoute } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';
import { Stack, useNavigation } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ContactDetailsParams = {
  data: {
    id: string; // Expo Contacts usa `id` para identificar contactos
    name: string; // Nombre del contacto
    phoneNumbers: { number: string }[]; // Números de teléfono
  };
};

const ContactDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: ContactDetailsParams }, 'params'>>();

  const contactData = route.params?.data;

  const handleDeleteContact = async () => {
    try {
      Alert.alert(
        'Delete Contact',
        `Are you sure you want to delete ${contactData.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              const result = await Contacts.removeContactAsync(contactData.id);
              if (result) {
                Alert.alert('Success', 'Contact deleted successfully');
                navigation.goBack();
              } else {
                Alert.alert('Error', 'Failed to delete the contact');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error deleting contact:', error);
      Alert.alert('Error', 'An unexpected error occurred while deleting the contact');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../images/back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../images/user.png')}
        style={styles.userImage}
      />
      <Text style={styles.displayName}>{contactData.name}</Text>
      <View style={styles.contactInfo}>
        <Text style={styles.phoneNumber}>
          {contactData.phoneNumbers?.[0]?.number || 'No number available'}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              contactData.phoneNumbers?.[0]?.number &&
              Linking.openURL(`sms:${contactData.phoneNumbers[0].number}`)
            }
          >
            <Image
              source={require('../images/message.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              contactData.phoneNumbers?.[0]?.number &&
              Linking.openURL(`tel:${contactData.phoneNumbers[0].number}`)
            }
          >
            <Image
              source={require('../images/call.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteContact}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
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
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  userImage: {
    width: 60,
    height: 60,
    marginTop: 50,
    alignSelf: 'center',
  },
  displayName: {
    color: '#fff',
    alignSelf: 'center',
    marginTop: 20,
  },
  contactInfo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    marginTop: 50,
  },
  phoneNumber: {
    color: '#fff',
    marginLeft: 20,
  },
  actions: {
    flexDirection: 'row',
    paddingRight: 15,
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginRight: 20,
  },
  deleteButton: {
    width: '70%',
    height: 50,
    borderRadius: 10,
    marginTop: 100,
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: 'red',
  },
});

export default ContactDetails;
