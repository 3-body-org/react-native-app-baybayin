import React from "react";
import { Text, Image, SafeAreaView } from "react-native";
import Card from "../components/card";
import Container from "../components/container";
import Carousel from "../components/carousel";
import { carouselData } from "../data/carousel-data";

export default function HomeScreen({ navigation }) {
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
          <Text style={{ color: "#333", fontSize: 20 }}>
            Tayo na't matuto ng baybayin
          </Text>
          <Text style={{ color: "#333", fontSize: 20 }}>
            Tayo na't matuto ng baybayin
          </Text>
          <Text style={{ color: "#333", fontSize: 20 }}>
            Tayo na't matuto ng baybayin
          </Text>
          {/* there  image here */}
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
        <Card backgroundColor={"#fff"}>
          <Text style={{ color: "#333", fontSize: 20, textAlign: "center" }}>
            Iba pang mga kategorya
          </Text>
          <Text style={{ color: "#333", fontSize: 20, textAlign: "center" }}>
            Iba pang mga kategorya
          </Text>
          <Text style={{ color: "#333", fontSize: 20, textAlign: "center" }}>
            Iba pang mga kategorya
          </Text>
        </Card>
      </Container>
    </SafeAreaView>
  );
}
