import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Asset } from "expo-asset";
import { useLocalSearchParams } from "expo-router";

const Pdf = Platform.OS !== 'web' ? lazy(() => import('react-native-pdf')) : null;

export default function PdfViewer() {
  const { billId } = useLocalSearchParams();
  const [pdfSource, setPdfSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const loadPdf = async () => {
        try {
          const asset = Asset.fromModule(getPdfAsset(billId));
          await asset.downloadAsync();
          setPdfSource({ uri: asset.localUri || asset.uri, cache: false });
        } catch (err) {
          console.log("Asset error:", err);
          setError(err.message);
        }
        setIsLoading(false);
      };

      loadPdf();
    } else {
      setIsLoading(false);
    }
  }, [billId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#573826" />
        <Text style={styles.loadingText}>Loading PDF...</Text>
      </View>
    );
  }

  if (error || (!pdfSource && Platform.OS !== 'web')) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ Failed to load PDF</Text>
        <Text style={styles.errorSubtext}>Error: {error}</Text>
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text>PDF viewer is not available on web.</Text>
      </View>
    );
  }

  return (
    <Suspense fallback={
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#573826" />
        <Text style={styles.loadingText}>Loading PDF Viewer...</Text>
      </View>
    }>
      <View style={styles.container}>
        <Pdf
          source={pdfSource}
          onPageChanged={(page, numberOfPages) => {
            console.log(`📖 Page ${page} of ${numberOfPages}`);
          }}
          onError={(err) => {
            console.log("❌ PDF Error:", err);
            setError(err.message);
          }}
          style={styles.pdf}
          trustAllCerts={false}
          enablePaging={false}
          spacing={0}
          minZoom={1}
          maxZoom={3}
        />
      </View>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#573826",
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#d32f2f",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  errorSubtext: {
    fontSize: 14,
    color: "#8B7355",
    textAlign: "center",
    lineHeight: 20,
  },
});