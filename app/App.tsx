import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddEditContactScreen from './AddEditContactScreen';
import ContactListScreen from './ContactListScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Contacts" component={ContactListScreen} />
        <Stack.Screen name="AddEditContact" component={AddEditContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
