import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../components/card";
import Container from "../components/container";
import BackButton from "../components/back-button";
import { products } from "../data/product-data";
import ProductCard from "../components/product-card";

export default function MerchScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Container>
        <BackButton />
        <Card backgroundColor={"#573826"}>
          <Text style={styles.headerText}>Merchs</Text>
        </Card>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 50 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.productsContainer}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </ScrollView>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Karla-Medium",
  },
  scrollContent: {
    paddingBottom: 20, // Base padding
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
