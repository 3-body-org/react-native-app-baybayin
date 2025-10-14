import React, { useEffect, useState, lazy, Suspense, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Asset } from "expo-asset";
import { useLocalSearchParams, router, useNavigation } from "expo-router";

const Pdf =
  Platform.OS !== "web" ? lazy(() => import("react-native-pdf")) : null;

export default function PdfViewer() {
  const { billId } = useLocalSearchParams();
  const pdfRef = useRef(null);
  const [pdfSource, setPdfSource] = useState(null);
  const [isPdfVisible, setIsPdfVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const getPdfAsset = (billId) => {
    switch (billId) {
      case "1":
        return require("@assets/sb-1899.pdf");
      case "2":
        return require("@assets/sb-2440.pdf");
      case "3":
        return require("@assets/sb-433.pdf");
      case "4":
        return require("@assets/sb-2086.pdf");
      case "5":
        return require("@assets/sb-1866.pdf");
      default:
        throw new Error(`PDF not found for bill id ${billId}`);
    }
  };

  useEffect(() => {
    if (Platform.OS !== "web") {
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
        // Start countdown after loading is complete
        setCountdown(2); // Start countdown from 2 seconds
        const intervalId = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(intervalId);
              setIsFullyLoaded(true);
              return null;
            }
            return prev - 1;
          });
        }, 1000); // Update every second
      };

      loadPdf();
    } else {
      setIsLoading(false);
    }

    return () => {
      setIsPdfVisible(false);
    };
  }, [billId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // If a page is loading or PDF is not fully loaded, prevent the user from leaving the screen
      if (isPageLoading || !isFullyLoaded) {
        e.preventDefault();
        console.log("Back action prevented while PDF is loading or finalizing.");
        return;
      }

      // If we are ready to go back, unmount the PDF viewer first
      // to ensure resources are released before the screen transition.
      if (isPdfVisible) {
        e.preventDefault(); // Stop the original navigation event
        setIsPdfVisible(false); // Trigger the unmount of the PDF component
        setTimeout(() => {
          router.back(); // Programmatically navigate back after a delay
        }, 100);
      }
    });

    return unsubscribe;
  }, [navigation, isPageLoading, isFullyLoaded, isPdfVisible]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#573826" />
        <Text style={styles.loadingText}>Loading PDF...</Text>
      </View>
    );
  }

  if (error || (!pdfSource && Platform.OS !== "web")) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ Failed to load PDF</Text>
        <Text style={styles.errorSubtext}>Error: {error}</Text>
      </View>
    );
  }

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Text>PDF viewer is not available on web.</Text>
      </View>
    );
  }

  return (
    <Suspense
      fallback={
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#573826" />
          <Text style={styles.loadingText}>Loading PDF Viewer...</Text>
        </View>
      }
    >
      <View style={styles.container}>
        {countdown !== null && (
          <View style={styles.countdownOverlay}>
            <Text style={styles.countdownText}>
              Finalizing PDF... {countdown}s
            </Text>
          </View>
        )}
        {isPdfVisible && (
          <Pdf
            ref={pdfRef}
            source={pdfSource}
            onLoadComplete={(numberOfPages, filePath) => {
              setIsPageLoading(false);
            }}
            onPageChanged={(page, numberOfPages) => {
              setIsPageLoading(true);
              // Since there's no "onPageChangeComplete", we'll assume it's fast
              // and re-enable the back button after a short delay.
              setTimeout(() => setIsPageLoading(false), 200);
            }}
            onError={(err) => {
              console.error("PDF Error:", err);
              setError(err.message);
            }}
            style={styles.pdf}
            trustAllCerts={false}
            enablePaging={false}
            spacing={0}
            minZoom={1}
            maxZoom={3}
          />
        )}
      </View>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  countdownOverlay: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 10,
    zIndex: 10,
  },
  countdownText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
