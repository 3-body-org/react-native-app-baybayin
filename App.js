import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
<<<<<<< Updated upstream
import { SafeAreaProvider } from "react-native-safe-area-context";
=======
import { GestureHandlerRootView } from 'react-native-gesture-handler';
>>>>>>> Stashed changes
import HomeScreen from "./src/screen/home-screen";
import LearnScreen from "./src/screen/learn-screen";
import MerchScreen from "./src/screen/merch-screen";
import BillScreen from "./src/screen/bill-screen";

const Stack = createStackNavigator();

export default function App() {
  return (
<<<<<<< Updated upstream
    <SafeAreaProvider>
      <StatusBar backgroundColor="#ffffffff" barStyle="dark-content" />
      <NavigationContainer>
        <View style={styles.container}>
=======
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#ffffffff" barStyle="dark-content" />
        <NavigationContainer >
>>>>>>> Stashed changes
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LearnScreen" component={LearnScreen} />
            <Stack.Screen name="MerchScreen" component={MerchScreen} />
            <Stack.Screen name="BillScreen" component={BillScreen} />
          </Stack.Navigator>
<<<<<<< Updated upstream
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
=======
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
>>>>>>> Stashed changes
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
