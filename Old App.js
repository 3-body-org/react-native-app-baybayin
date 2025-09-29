import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LessonScreen from "./src/app/(learning)/not needed anymore lesson-screen";
import MerchScreen from "./src/app/(resources)/merch-screen";
import BillScreen from "./src/app/(resources)/bill-screen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar backgroundColor="#ffffffff" barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LearnScreen" component={LessonScreen} />
            <Stack.Screen name="MerchScreen" component={MerchScreen} />
            <Stack.Screen name="BillScreen" component={BillScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
