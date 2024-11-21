import { Stack } from 'expo-router';
import React from 'react';

export default function AppNavigator() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e', // Color de fondo del encabezado.
        },
        headerTintColor: '#fff', // Color del texto del encabezado.
        headerTitleStyle: {
          fontWeight: 'bold', // Texto del encabezado en negrita.
        },
      }}
    >
      <Stack.Screen
        name="Contacts"
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
