import { Stack } from 'expo-router';
import React from 'react';

export default function AppNavigator() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e', // Set a consistent header background color.
        },
        headerTintColor: '#fff', // Set header text color.
        headerTitleStyle: {
          fontWeight: 'bold', // Bold header titles.
        },
      }}
    >
      <Stack.Screen
        name="contacts"
        options={{
          headerTitle: 'Contacts',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="addContact"
        options={{
          headerTitle: 'Add Contact',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="contactDetails"
        options={{
          headerTitle: 'Contact Details',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
