import { RouteProp, useRoute } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';
import { Stack, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type ContactDetailsParams = {
  data: string; // JSON stringified contact data
};

const ContactDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: ContactDetailsParams }, 'params'>>();
  const contactData = JSON.parse(route.params?.data || '{}');

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(contactData.name || '');
  const [phoneNumber, setPhoneNumber] = useState(contactData.phoneNumbers?.[0]?.number || '');

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Cannot access contacts without permission.');
        navigation.goBack();
      }
    })();
  }, [navigation]);

  const requestWritePermissions = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Write permission is required to modify contacts.');
      return false;
    }
    return true;
  };

  const handleDeleteContact = async () => {
    if (!(await requestWritePermissions())) return;

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
                navigation.goBack(); // Return to the previous screen
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

  const handleSaveContact = async () => {
    if (!name || !phoneNumber) {
      Alert.alert('Error', 'Name and phone number cannot be empty.');
      return;
    }

    if (!(await requestWritePermissions())) return;

    try {
      const updatedContact = {
        ...contactData,
        name,
        phoneNumbers: [{ label: 'mobile', number: phoneNumber }],
      };

      const result = await Contacts.updateContactAsync(updatedContact);
      if (result) {
        Alert.alert('Success', 'Contact updated successfully.');
        setIsEditing(false);
      } else {
        Alert.alert('Error', 'Failed to update the contact.');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      Alert.alert('Error', 'An unexpected error occurred while updating the contact.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../images/back.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Image source={require('../images/user.png')} style={styles.userImage} />
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            placeholderTextColor="#fff"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            placeholderTextColor="#fff"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </>
      ) : (
        <>
          <Text style={styles.displayName}>{name}</Text>
          <Text style={styles.phoneNumber}>{phoneNumber || 'No number available'}</Text>
        </>
      )}
      <View style={styles.actions}>
        {!isEditing && (
          <>
            <TouchableOpacity
              onPress={() =>
                phoneNumber && Linking.openURL(`sms:${phoneNumber}`)
              }
            >
              <Image
                source={require('../images/message.png')}
                style={styles.actionIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                phoneNumber && Linking.openURL(`tel:${phoneNumber}`)
              }
            >
              <Image
                source={require('../images/call.png')}
                style={styles.actionIcon}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteContact}>
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
  phoneNumber: {
    color: '#fff',
    alignSelf: 'center',
    marginTop: 10,
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginHorizontal: 20,
  },
  editButton: {
    width: '70%',
    height: 50,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#fff',
  },
  saveButton: {
    width: '70%',
    height: 50,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
  },
  deleteButton: {
    width: '70%',
    height: 50,
    borderRadius: 10,
    marginTop: 30,
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
