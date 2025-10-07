import React from "react";
import { View, StyleSheet, ScrollView, Platform, Linking } from "react-native";
import { router } from "expo-router";
import { Asset } from "expo-asset";
import { baybayinBillsData } from "@data/baybayin-bills-data";
import BillCard from "@components/bill-card";
import Container from "@components/container";

const getPdfAsset = (billId) => {
  switch (billId) {
    case '1':
      return require('../../assets/sb-1899.pdf');
    case '2':
      return require('../../assets/sb-2440.pdf');
    case '3':
      return require('../../assets/sb-433.pdf');
    case '4':
      return require('../../assets/sb-2086.pdf');
    case '5':
      return require('../../assets/sb-1866.pdf');
    default:
      throw new Error(`PDF not found for bill id ${billId}`);
  }
};

export default function BillScreen() {
  const handleViewPdf = async (bill) => {
    if (Platform.OS === 'web') {
      try {
        const asset = Asset.fromModule(getPdfAsset(bill.id.toString()));
        await asset.downloadAsync();
        Linking.openURL(asset.uri);
      } catch (error) {
        console.error('Error opening PDF on web:', error);
        // Fallback or show error message
      }
    } else {
      router.push({
        pathname: "/(resources)/pdf-viewer",
        params: { billId: bill.id.toString() },
      });
    }
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
