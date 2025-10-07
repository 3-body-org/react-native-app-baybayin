import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handlePress = () => {
    if (
      pathname.includes("/latin-to-baybayin") ||
      pathname.includes("/baybayin-to-latin")
    ) {
      router.replace("/(learning)/subukan-tab");
    } else if (pathname.includes("/summary-results")) {
      router.replace("/(learning)/subukan-tab");
    } else if (pathname.includes("/pdf-viewer")) {
      router.replace("/bill-screen");
    } else {
      router.replace("/");
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.backButton}>
      <View style={styles.container}>
        <ArrowLeft size={25} color="#573826" />
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
  },
});
