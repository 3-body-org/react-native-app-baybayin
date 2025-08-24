import React from "react";
import { Text, SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import Card from "../components/card";
import Container from "../components/container";
import BackButton from "../components/back-button";
import { products } from "../data/product-data";

import ProductCard from "../components/product-card";

export default function MerchScreen() {
  return (
    <SafeAreaView>
      <Container>
        <BackButton />

        <Card backgroundColor={"#573826"}>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              textAlign: "start",
              fontFamily: "Karla-Medium",
            }}
          >
            Merch
          </Text>
        </Card>

        <ScrollView
              contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
          <View style={styles.productsContainer}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

   scrollContent: {
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 8,
  },
});
