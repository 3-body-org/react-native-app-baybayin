import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Undo2 } from "lucide-react-native";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();

  const handlePress = () => {
    if (pathname.includes('/latin-to-baybayin') || pathname.includes('/baybayin-to-latin')) {
      router.replace('/(learning)/subukan-tab');
    } else if (pathname.includes('/summary-results')) {
      router.replace('/(learning)/subukan-tab');
    } else {
      router.replace("/");
    }
  };

  // Responsive text based on screen width
  const getButtonText = () => {
    if (width > 300) {
      return "Bumalik";
    } else {
      return "";
    }
  };

  const showIcon = width <= 300;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.backButton}
    >
      <View style={styles.container}>
        <Undo2 size={16} color="#573826" style={{ marginRight: showIcon ? 0 : 5 }} />
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
