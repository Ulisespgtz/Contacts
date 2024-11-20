import { useRoute } from '@react-navigation/native';
import { Stack, useNavigation } from 'expo-router';
import React from 'react';
import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
;

const ContactDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const contactData = route.params?.data as {
    displayName: string;
    phoneNumbers: { number: string }[];
    recordID: string;
  };

  const requestDeleteContactPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app needs permission to delete contacts.',
          buttonPositive: 'Allow',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await Contacts.deleteContact({ recordID: contactData.recordID });
        navigation.goBack();
      } else {
        console.warn('Permission denied');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
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
      <Text style={styles.displayName}>{contactData.displayName}</Text>
      <View style={styles.contactInfo}>
        <Text style={styles.phoneNumber}>
          {contactData.phoneNumbers[0]?.number}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity>
            <Image
              source={require('../images/message.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../images/call.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={requestDeleteContactPermission}
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
