import React, { useState } from "react";
import {
  Text,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import Card from "../components/card";
import Container from "../components/container";
import Carousel from "../components/carousel";
import CustomBottomSheet from "../components/bottom-sheet";
import { carouselData } from "../data/carousel-data";
import { Share } from "lucide-react-native";

export default function HomeScreen({ navigation }) {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Container>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#573826",
            marginBottom: 5,
            alignSelf: "flex-start",
          }}
        >
          Magandang araw!
        </Text>

        <Image
          source={require("../assets/magandang-araw.webp")}
          resizeMode="contain"
          style={{ width: 160, height: 20, alignSelf: "flex-start" }}
        />

        <Card backgroundColor="#FEF3EC">
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Image
              source={require("../assets/boy.webp")}
              resizeMode="contain"
              style={{ width: 110, height: 110 }}
            />
            <Text
              style={{
                color: "#333",
                fontSize: 25,
                fontWeight: "600",
                textAlign: "right",
                marginTop: 10,
                flexWrap: "wrap",
                flex: 1,
              }}
            >
              Tayo na't matuto ng Baybayin!
            </Text>
          </View>
        </Card>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#573826",
            marginBottom: 5,
            alignSelf: "flex-start",
          }}
        >
          Kategorya
        </Text>

        <Image
          source={require("../assets/kategorya.webp")}
          resizeMode="contain"
          style={{ width: 100, height: 20, alignSelf: "flex-start"}}
        />
      </Container>

      <Carousel data={carouselData} navigation={navigation} />

      <Container style={{ paddingVertical: 0, marginVertical: 0 }}>
        <Card backgroundColor={"#573826"} style={{ marginTop: 0}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1, marginRight: 10, paddingLeft: 10 }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                Halina't i-share ang app na ito!
              </Text>
              <TouchableOpacity
                onPress={handleOpenBottomSheet}
                style={{
                  backgroundColor: "#F1E3DA",
                  borderRadius: 8,
                  paddingVertical: 8,
                  alignItems: "center",
                  maxWidth: 120,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Text
                  style={{ color: "#573826", fontSize: 16, fontWeight: "600" }}
                >
                  Ibahagi
                </Text>
                <Share size={16} color="#573826" />
              </TouchableOpacity>
            </View>
            <Image
              source={require("../assets/phone.webp")}
              resizeMode="contain"
              style={{ width: 100, height: 100 }}
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
    </SafeAreaView>
  );
}
