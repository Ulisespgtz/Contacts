import { Stack } from "expo-router";

import { MyContextProvider } from "./Context";

export default function RootLayout() {
  return (
    <MyContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="mainmenu"/>
        <Stack.Screen name="creditos"/>
        <Stack.Screen name="Register"/>
        <Stack.Screen name="CambioImagen"/>
      </Stack>
    </MyContextProvider>
  );
}
