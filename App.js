import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DriverQRScanner from "./screens/DriverQRScanner";
import PassengerGetOnScreen from "./screens/PassengerGetOnScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          //options={{ headerShown: false }}
          name="QR Scanner"
          component={DriverQRScanner}
        />
        <Stack.Screen
          //options={{ headerShown: false }}
          name="Passenger Get On"
          component={PassengerGetOnScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
