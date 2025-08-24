import React, { useState } from "react";
import { Text, Image, TouchableOpacity, View, StyleSheet } from "react-native";

export default function ProductCard({ product }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <TouchableOpacity 
            style={[
                styles.card,
                isHovered && styles.cardHover
            ]}
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            activeOpacity={1} // Prevents the default opacity change on press
        >
            <Image source={product.image} style={styles.image} resizeMode="cover" />
            <View style={styles.cardContent}>
                <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                </Text>
                <Text style={styles.price}>{product.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#573826',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent', // Default transparent border
},
cardHover: {
  backgroundColor: '#FEF3EC',
  borderColor: '#573826',
  transform: [{ scale: 1.02 }], // Slight scale up effect
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 5,
},
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#573826',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#573826',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});