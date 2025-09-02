import React from "react";
import { Text, SafeAreaView, Button, TouchableOpacity } from "react-native";
import Card from "../components/card";
import Container from "../components/container";
import BackButton from "../components/back-button";
import Accordion from "../components/accordion";
import { ScrollView } from "react-native-gesture-handler";
import PdfButton from "../components/pdf-button.rm";

export default function BillScreen() {
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
            Baybayin Bill
          </Text>
        </Card>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }}
        >  
          <Text
            style={{
              color: "#5c3219",
              fontSize: 16,
              textAlign: "justify",
              marginBottom: 25,
            }}
          >
            AN ACT PROMOTING THE USE OF BAYBAYIN AS A TOOL FOR CULTURAL
            DEVELOPMENT OF THE PHILIPPINES, PROVIDING FOR IT PROMOTION,
            PROTECTION, PRESERVATION AND CONSERVATION, AND FOR OTHER PURPOSES
          </Text>

          <PdfButton />

          <Text
            style={{
              color: "#5c3219",
              fontSize: 16,
              textAlign: "justify",
              marginBottom: 25,
              fontWeight: "500",
            }}
          >
           Maari mo ring basahin ang mga ito.
          </Text>
          
          <Accordion />
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}