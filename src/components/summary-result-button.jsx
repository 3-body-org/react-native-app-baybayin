import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { BarChart3 } from "lucide-react-native";

export default function SummaryResultButton() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const handlePress = () => {
    router.replace("/(learning)/summary-results");
  };

  // Responsive text based on screen width
  const getButtonText = () => {
    if (width > 400) {
      return "Tingnan ang Buod ng";
    } else if (width > 300) {
      return "Buod ng Resulta";
    } else {
      return "";
    }
  };

  const showIcon = width <= 300;

  return (
    <TouchableOpacity onPress={handlePress} style={styles.backButton}>
      <View style={styles.container}>
        <BarChart3
          size={18}
          color="#573826"
          style={{ marginRight: showIcon ? 0 : 8 }}
        />
        {!showIcon && <Text style={styles.text}>{getButtonText()}</Text>}
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
