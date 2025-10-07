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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
          <Text style={[styles.greetingText, { fontSize: wp(5) }]}>
            Magandang araw!
          </Text>
          <Image
            source={require("../assets/magandang-araw.webp")}
            resizeMode="contain"
            style={[
              styles.greetingImage,
              {
                width: wp(40),
                height: hp(3),
                // backgroundColor: "red", // test
              },
            ]}
          />
        </View>

        <View style={styles.cardSection}>
          <Card backgroundColor="#FEF3EC" style={styles.mainCard}>
            <View style={styles.cardContent}>
              <Image
                source={require("@assets/boy.webp")}
                resizeMode="contain"
                style={[
                  styles.boyImage,
                  {
                    width: wp(25),
                    height: hp(10),
                  },
                ]}
              />
              <Text style={styles.learnText}>
                Tayo na't matuto{"\n"}ng Baybayin!
              </Text>
            </View>
          </Card>
        </View>
      </View>

      {/* Category Section */}
      <View style={styles.categorySection}>
        <Text style={[styles.categoryText, { fontSize: wp(5) }]}>
          Kategorya
        </Text>
        <Image
          source={require("@assets/kategorya.webp")}
          resizeMode="contain"
          style={[styles.categoryImage, { width: wp(25), height: hp(3) }]}
        />
        <Carousel data={carouselData} navigation={router} />
      </View>

      {/* Share Section */}
      <View style={styles.shareSection}>
        <Card backgroundColor={"#573826"} style={styles.shareCard}>
          <View style={styles.shareRow}>
            <View style={styles.shareTextContainer}>
              <Text style={[styles.shareTitle, { fontSize: wp(4) }]}>
                Halina't i-share ang app na ito!
              </Text>
              <TouchableOpacity
                onPress={handleOpenBottomSheet}
                style={[
                  styles.shareButton,
                  {
                    width: wp(30),
                  },
                ]}
              >
                <Text style={[styles.shareButtonText, { fontSize: hp(2) }]}>
                  Ibahagi
                </Text>
                <Share size={wp(4)} color="#573826" />
              </TouchableOpacity>
            </View>
            <Image
              source={require("@assets/phone.webp")}
              resizeMode="contain"
              style={[
                styles.phoneImage,
                {
                  width: wp(25),
                  height: hp(10),
                },
              ]}
            />
          </View>
        </Card>
      </View>

      <CustomBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={handleCloseBottomSheet}
        snapPoints={["40%"]}
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
    gap: 10,
  },
  greetingCardSection: {
    justifyContent: "center",
    paddingHorizontal: 20,
    // backgroundColor: "yellow", // test
  },
  greetingSection: {
    marginBottom: 16,
  },
  cardSection: {},
  categorySection: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    // backgroundColor: "blue", // test
  },
  shareSection: {
    justifyContent: "center",
    paddingHorizontal: 20,
    // backgroundColor: "orange", //test
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
    height: hp(18),
    marginVertical: 0,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "violet", // test
    height: hp(14),
  },
  boyImage: {
    marginRight: 16,
  },
  learnText: {
    color: "#333",
    fontWeight: "500",
    textAlign: "right",
    flexWrap: "wrap",
    fontSize: wp(6),
  },
  categoryText: {
    fontWeight: 600,
    color: "#573826",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  categoryImage: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  shareCard: {
    height: hp(18),
    marginVertical: 0,
  },
  shareRow: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "pink", // test
    height: hp(13),
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
    height: hp(4),
  },
  shareButtonText: {
    color: "#573826",
    fontWeight: "600",
  },
  phoneImage: {
    marginLeft: 8,
  },
});
