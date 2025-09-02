import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screen/home-screen";
import LessonScreen from "./src/screen/lesson-screen";
import MerchScreen from "./src/screen/merch-screen";
import BillScreen from "./src/screen/bill-screen";
import PDFViewerScreen from "./src/screen/bill-screen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar backgroundColor="#ffffffff" barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LearnScreen" component={LessonScreen} />
            <Stack.Screen name="MerchScreen" component={MerchScreen} />
            <Stack.Screen name="BillScreen" component={BillScreen} />
            <Stack.Screen name="PDFViewerScreen" component={PDFViewerScreen} />
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
