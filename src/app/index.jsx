import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import Card from "@components/card";
import Container from "@components/container";
import Carousel from "@components/carousel";
import CustomBottomSheet from "@components/bottom-sheet";
import { carouselData } from "@data/carousel-data";
import { Share } from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  return (
      <View style={styles.container}>
      <Container >
        <Text style={styles.greetingText}>
          Magandang araw!
        </Text>

        <Image
          source={require("../assets/magandang-araw.webp")}
          resizeMode="contain"
          style={styles.greetingImage}
        />

        <Card backgroundColor="#FEF3EC">
          <View style={styles.cardContent}>
            <Image
              source={require("../assets/boy.webp")}
              resizeMode="contain"
              style={styles.boyImage}
            />
            <Text style={styles.learnText}>
              Tayo na't matuto{'\n'}ng Baybayin!
            </Text>
          </View>
        </Card>

        <Text style={styles.categoryText}>
          Kategorya
        </Text>

        <Image
          source={require("../assets/kategorya.webp")}
          resizeMode="contain"
          style={styles.categoryImage}
        />
      </Container>

      <Carousel data={carouselData} navigation={router} />

      <Container style={styles.shareContainer}>
        <Card backgroundColor={"#573826"} style={styles.shareCard}>
          <View style={styles.shareRow}>
            <View style={styles.shareTextContainer}>
              <Text style={styles.shareTitle}>
                Halina't i-share ang app na ito!
              </Text>
              <TouchableOpacity
                onPress={handleOpenBottomSheet}
                style={styles.shareButton}
              >
                <Text style={styles.shareButtonText}>
                  Ibahagi
                </Text>
                <Share size={16} color="#573826" />
              </TouchableOpacity>
            </View>
            <Image
              source={require("../assets/phone.webp")}
              resizeMode="contain"
              style={styles.phoneImage}
            />
          </View>
        </Card>
      </Container>

      <CustomBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={handleCloseBottomSheet}
        title="I-share ang Baybayin App"
        snapPoints={["40%", "60%", "80%"]}
        type="social"
      />
      
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#573826",
    marginBottom: 5,
    marginTop: 14,
    alignSelf: "flex-start",
  },
  greetingImage: {
    width: 160,
    height: 20,
    alignSelf: "flex-start",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boyImage: {
    width: 80,
    height: 80,
  },
  learnText: {
    color: "#333",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "right",
    marginTop: 10,
    flexWrap: "wrap",
    flex: 1,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#573826",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  categoryImage: {
    width: 100,
    height: 20,
    alignSelf: "flex-start",
  },
  shareContainer: {
    paddingVertical: 0,
    marginVertical: 0,
  },
  shareCard: {
    marginTop: 0,
  },
  shareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shareTextContainer: {
    flex: 1,
    marginRight: 10,
    paddingLeft: 10,
  },
  shareTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: "#F1E3DA",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    maxWidth: 120,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  shareButtonText: {
    color: "#573826",
    fontSize: 16,
    fontWeight: "600",
  },
  phoneImage: {
    width: 100,
    height: 100,
  },
});
