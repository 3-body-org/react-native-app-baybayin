import React from "react";
import { Text, SafeAreaView, Button } from "react-native";
import Card from "../components/card";
import Container from "../components/container";
import BackButton from "../components/back-button";

export default function LearnScreen() {
  return (
    <SafeAreaView>
      <Container>
        <BackButton />

        <Card backgroundColor={"#573826"}>
          <Text
            style={{
              color: "#ffffffff",
              fontSize: 20,
              textAlign: "flex-start",
            }}
          >
            Ang Baybayin
          </Text>
        </Card>

        <Card backgroundColor={"#573826"}>
          <Text
            style={{
              color: "#ffffffff",
              fontSize: 20,
              textAlign: "flex-start",
            }}
          ></Text>
        </Card>
      </Container>
    </SafeAreaView>
  );
}
