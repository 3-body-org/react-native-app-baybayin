import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from "react-native";
import { Asset } from "expo-asset";
import Pdf from "react-native-pdf";

export default function BillScreen() {
  const [pdfUri, setPdfUri] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load local PDF asset properly
  useEffect(() => {
    async function loadPdf() {
      try {
        const asset = Asset.fromModule(require("../assets/baybayin-law.pdf"));
        await asset.downloadAsync(); // Ensures it's available locally
        setPdfUri(asset.localUri || asset.uri); // Use valid file path
        setIsLoading(false);
      } catch (err) {
        console.error("PDF Load Error:", err);
        setError("Failed to load PDF");
        setIsLoading(false);
      }
    }
    loadPdf();
  }, []);

  return (
    <View style={styles.container}>
      {/* Loading State */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#573826" />
          <Text style={styles.loadingText}>Loading PDF...</Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ Failed to load PDF</Text>
          <Text style={styles.errorSubtext}>
            Please make sure the file exists and is accessible.
          </Text>
        </View>
      )}

      {/* Render PDF */}
      {pdfUri && (
        <Pdf
          source={{ uri: pdfUri }}
          onLoadComplete={(pages) => {
            console.log(`PDF loaded: ${pages} pages`);
            setIsLoading(false);
          }}
          onError={(err) => {
            console.log("PDF Render Error:", err);
            setError("Failed to render PDF");
            setIsLoading(false);
          }}
          style={styles.pdf}
          enablePaging={true}
          enableRTL={false}
          enableAnnotationRendering={true}
          trustAllCerts={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  pdf: { flex: 1, width: Dimensions.get("window").width },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#573826",
    fontWeight: "500",
  },
  errorContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 1,
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
