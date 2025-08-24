import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screen/home-screen";
import LearnScreen from "./src/screen/learn-screen";
import BackButton from "./src/components/back-button";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#ffffffff" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LearnScreen" component={LearnScreen} />
          <Stack.Screen name="MerchScreen" component={MerchScreen} />
          <Stack.Screen name="BillScreen" component={BillScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
