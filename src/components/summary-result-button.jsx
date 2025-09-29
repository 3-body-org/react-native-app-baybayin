import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { BarChart3 } from "lucide-react-native";

export default function SummaryResultButton() {
  const router = useRouter();

  const handlePress = () => {
      router.replace('/(learning)/summary-results');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.backButton}
    >
      <View style={styles.container}>
        <BarChart3 size={18} color="#573826" style={{ marginRight: 8 }} />
        <Text style={styles.text}>View Summary of Results</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#573826",
    fontSize: 14,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F1E3DA",
    borderColor: "#573826",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
