import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "./card";

export default function BillCard({ bill, onViewPdf }) {
  return (
    <Card style={styles.billCard}>
      <View style={styles.container}>
        <Text style={styles.title}>{bill.title}</Text>
        <Text style={styles.description}>{bill.description}</Text>
        <TouchableOpacity style={styles.button} onPress={onViewPdf}>
          <Ionicons name="document-text-outline" size={20} color="#573826" />
          <Text style={styles.buttonText}>{`${bill.title} (PDF)`}</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  billCard: {
    backgroundColor: "#FEF3EC",
    borderWidth: 1,
    borderColor: "#573826",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#573826",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#f6e0d2",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#573826",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});
