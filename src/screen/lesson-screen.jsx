import React from "react";
import { View, StyleSheet } from "react-native";
import TabNavigator from "../tabs/tab-navigator.jsx";

export default function LessonScreen() {
  return (
    <View style={styles.container}>
      <TabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});