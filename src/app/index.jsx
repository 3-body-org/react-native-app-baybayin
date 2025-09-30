import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
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
  const { width, height } = useWindowDimensions();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Greeting and Learning Card Section Combined */}
      <View style={styles.greetingCardSection}>
        <View style={styles.greetingSection}>
          <Text
            style={[styles.greetingText, { fontSize: width > 400 ? 28 : 22 }]}
          >
            Magandang araw!
          </Text>
          <Image
            source={require("../assets/magandang-araw.webp")}
            resizeMode="contain"
            style={[styles.greetingImage, {
              width: width > 400 ? 220 : 180,
              height: width > 400 ? 28 : 24
            }]}
          />
        </View>

        <View style={styles.cardSection}>
          <Card backgroundColor="#FEF3EC" style={styles.mainCard}>
            <View style={styles.cardContent}>
              <Image
                source={require("../assets/boy.webp")}
                resizeMode="contain"
                style={[
                  styles.boyImage,
                  {
                    width: width > 400 ? 110 : width > 300 ? 90 : 75,
                    height: width > 400 ? 110 : width > 300 ? 90 : 75,
                  },
                ]}
              />
              <Text
                style={[
                  styles.learnText,
                  {
                    fontSize: width > 400 ? 30 : width > 300 ? 24 : 20,
                    marginTop: width > 400 ? 15 : 10,
                  },
                ]}
              >
                Tayo na't matuto{"\n"}ng Baybayin!
              </Text>
            </View>
          </Card>
        </View>
      </View>

      {/* Category Section */}
      <View style={styles.categorySection}>
        <Text
          style={[styles.categoryText, { fontSize: width > 400 ? 26 : 20 }]}
        >
          Kategorya
        </Text>
        <Image
          source={require("@assets/kategorya.webp")}
          resizeMode="contain"
          style={[styles.categoryImage, { width: width > 400 ? 140 : 110 }]}
        />
        <Carousel data={carouselData} navigation={router} />
      </View>

      {/* Share Section */}
      <View style={styles.shareSection}>
        <Card backgroundColor={"#573826"} style={styles.shareCard}>
          <View style={styles.shareRow}>
            <View style={styles.shareTextContainer}>
              <Text
                style={[styles.shareTitle, { fontSize: width > 400 ? 24 : 18 }]}
              >
                Halina't i-share ang app na ito!
              </Text>
              <TouchableOpacity
                onPress={handleOpenBottomSheet}
                style={[
                  styles.shareButton,
                  {
                    maxWidth: width > 400 ? 150 : 130,
                    paddingHorizontal: width > 400 ? 20 : 16,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.shareButtonText,
                    { fontSize: width > 400 ? 18 : 16 },
                  ]}
                >
                  Ibahagi
                </Text>
                <Share size={width > 400 ? 18 : 16} color="#573826" />
              </TouchableOpacity>
            </View>
            <Image
              source={require("../assets/phone.webp")}
              resizeMode="contain"
              style={[
                styles.phoneImage,
                {
                  width: width > 400 ? 130 : width > 300 ? 110 : 90,
                  height: width > 400 ? 130 : width > 300 ? 110 : 90,
                },
              ]}
            />
          </View>
        </Card>
      </View>

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
    paddingVertical: 16,
  },
  greetingCardSection: {
    flex: 3,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  greetingSection: {
    marginBottom: 16,
  },
  cardSection: {
    // No flex here since it's contained in greetingCardSection
  },
  categorySection: {
    flex: 3,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  shareSection: {
    flex: 2,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  greetingText: {
    fontWeight: 600,
    color: "#573826",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  greetingImage: {
    alignSelf: "flex-start",
  },
  mainCard: {
    marginVertical: 0,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boyImage: {
    marginRight: 16,
  },
  learnText: {
    color: "#333",
    fontWeight: "500",
    textAlign: "right",
    flexWrap: "wrap",
    flex: 1,
  },
  categoryText: {
    fontWeight: 600,
    color: "#573826",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  categoryImage: {
    height: 24,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  shareCard: {
    marginVertical: 0,
  },
  shareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shareTextContainer: {
    flex: 1,
    marginRight: 12,
    paddingLeft: 12,
  },
  shareTitle: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 12,
  },
  shareButton: {
    backgroundColor: "#F1E3DA",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  shareButtonText: {
    color: "#573826",
    fontWeight: "600",
  },
  phoneImage: {
    marginLeft: 8,
  },
});
