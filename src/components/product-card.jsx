import React, { useState, useEffect, memo } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import ProductImageModal from "./image-modal";

function ProductCard({ product }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={[styles.card, styles.loadingContainer]}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.card, isHovered && styles.cardHover]}
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.5}
      >
        <Image source={product.image} style={styles.image} resizeMode="cover" />
        <View style={styles.cardContent}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.price}>{product.price}</Text>
          <TouchableOpacity style={styles.addButton}
          onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>View Image</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <ProductImageModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        imageSource={product.image}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardHover: {
    backgroundColor: "#FEF3EC",
    borderColor: "#573826",
    transform: [{ scale: 1.02 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#573826",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#573826",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
});

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
        headers: PropTypes.objectOf(PropTypes.string),
      }),
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.shape({
          uri: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
          headers: PropTypes.objectOf(PropTypes.string),
        }),
      ),
    ]).isRequired,
  }).isRequired,
};

export default memo(ProductCard);
