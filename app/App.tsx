
import { Stack } from "expo-router";


export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="ContactListScreen" options={{headerShown: false}} />
        <Stack.Screen name="AddEditContactScreen"/>
      </Stack>
  );
}