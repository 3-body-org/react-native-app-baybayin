import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import Pdf from "react-native-pdf";
import { Asset } from "expo-asset";

export default function BillScreen() {
  const [pdfSource, setPdfSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAsset = async () => {
      try {
        // Load your local PDF file
        const asset = Asset.fromModule(require("@assets/baybayin-law.pdf"));
        await asset.downloadAsync();
        setPdfSource({ uri: asset.localUri || asset.uri, cache: false });
        setIsLoading(false);
      } catch (err) {
        console.log("Asset error:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadAsset();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#573826" />
        <Text style={styles.loadingText}>Loading PDF...</Text>
      </View>
    );
  }

  if (error || !pdfSource) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ Failed to load PDF</Text>
        <Text style={styles.errorSubtext}>Error: {error}</Text>
      </View>
    );
  }

  return (
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

// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from "react-native";
// import Pdf from "react-native-pdf";

// export default function BillScreen() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Try different source approaches
//   const pdfSource = {
//     uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
//     cache: true
//   };

//   return (
//     <View style={styles.container}>
//       {/* Loading State */}
//       {isLoading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#573826" />
//           <Text style={styles.loadingText}>Loading PDF...</Text>
//         </View>
//       )}

//       {/* Error State */}
//       {error && (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>⚠️ Failed to load PDF</Text>
//           <Text style={styles.errorSubtext}>
//             {error}
//           </Text>
//         </View>
//       )}

//       {/* Render PDF */}
//       <Pdf
//           source={pdfSource}
//           onLoadComplete={(numberOfPages) => {
//             console.log(`PDF loaded: ${numberOfPages} pages`);
//             setIsLoading(false);
//           }}
//           onError={(err) => {
//             console.log("PDF Error:", err);
//             setError("Could not display the PDF file");
//             setIsLoading(false);
//           }}
//           style={styles.pdf}
//           enablePaging={true}
//           enableRTL={false}
//           enableAnnotationRendering={true}
//           trustAllCerts={false}
//           spacing={0}
//           minZoom={1}
//           maxZoom={3}
//         />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   pdf: { flex: 1, width: Dimensions.get("window").width },
//   loadingContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     zIndex: 1,
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#573826",
//     fontWeight: "500",
//   },
//   errorContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     zIndex: 1,
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 18,
//     color: "#d32f2f",
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   errorSubtext: {
//     fontSize: 14,
//     color: "#8B7355",
//     textAlign: "center",
//     lineHeight: 20,
//   },
// });
