import React from "react";
import { StyleSheet, View } from "react-native";

// pede icustomize si backgroundColor kapag irereuse
export default function Card({ children, backgroundColor }) {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 18,
    marginVertical: 30,
    flexShrink: 1,

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    // Android Shadow
    elevation: 3,

    // Background + Border
    borderRadius: 15,
  },
  content: {
    justifyContent: "flex-start",
    flexShrink: 1,
  },
});
