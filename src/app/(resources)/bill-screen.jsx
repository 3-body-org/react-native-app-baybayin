import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { baybayinBillsData } from "@data/baybayin-bills-data";
import BillCard from "@components/bill-card";
import Container from "@components/container";

export default function BillScreen() {
  const handleViewPdf = (bill) => {
    router.push({
      pathname: "/(resources)/pdf-viewer",
      params: { billId: bill.id.toString() },
    });
  };

  return (
    <Container style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {baybayinBillsData.map((bill, index) => (
          <View key={index}>
            <BillCard bill={bill} onViewPdf={() => handleViewPdf(bill)} />
          </View>
        ))}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  scrollView: {
    flex: 1,
  },
});
