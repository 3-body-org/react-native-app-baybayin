import React, { useState } from "react";
import { Text, Image, SafeAreaView, View, TouchableOpacity } from "react-native";
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
    <SafeAreaView>
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
          source={require("../assets/magandang-araw.png")}
          resizeMode="contain"
          style={{ width: 160, height: 20, alignSelf: "flex-start" }}
        />

        <Card backgroundColor="#FEF3EC">
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Image
              source={require("../assets/boy.png")}
              resizeMode="contain"
              style={{ width: 110, height: 70}}
            />
            <Text style={{ color: "#333", fontSize: 20 , margintTop: 10}}>
              Tayo na't matuto ng baybayin
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
          source={require("../assets/kategorya.png")}
          resizeMode="contain"
          style={{ width: 100, height: 20, alignSelf: "flex-start" }}
        />
      </Container>

      <Carousel data={carouselData} navigation={navigation} />

      <Container>
        {/* <TouchableOpacity onPress={handleOpenBottomSheet}>
          <Card backgroundColor={"#fff"}>
            <Text style={{ color: "#333", fontSize: 20, textAlign: "center" }}>
              I-share ang app
            </Text>
            <Text style={{ color: "#666", fontSize: 14, textAlign: "center", marginTop: 5 }}>
              Pindutin para i-share sa social media
            </Text>
          </Card>
        </TouchableOpacity> */}
        <Card backgroundColor={"#573826"}>
          <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>
            Halina't i-share ang app na ito!
          </Text>
          <Image
            source={require("../assets/phone.png")}
            resizeMode="contain"
            style={{ width: 100, height: 100, alignSelf: "center" }}
          />
          <TouchableOpacity 
            onPress={handleOpenBottomSheet} 
            style={{backgroundColor: "F1E3DA", borderRadius: 10}}>
            <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>
              Ibahagi
            </Text>
            <Share size={20} color="#573826"/>
          </TouchableOpacity>
        </Card>
      </Container>

      <CustomBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={handleCloseBottomSheet}
        title="I-share ang Baybayin App"
        snapPoints={['40%', '60%', '80%']}
        type="social"
      />
    </SafeAreaView>
  );
}
