import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, Text, ImageBackground } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import Pagination from "./pagination"; 

const { width } = Dimensions.get("window");
console.log("Carousel width:", width); // Debugging line to check width
const ITEM_WIDTH = Math.round(width * 0.87); // this width is sa scroll view
const ITEM_MARGIN = 7; 

export default function Carousel ({ data = [] , navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to scroll to a specific index and update the current index
  const scrollToIndex = (index) => {
    if (index >= 0 && index < data.length) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / (ITEM_WIDTH + ITEM_MARGIN * 2));
    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item }) => (
    <View style={{ width: ITEM_WIDTH, marginHorizontal: ITEM_MARGIN }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate(item.screen)} // navigate to item's screen
      >
        <ImageBackground
          source={item.backgroundImage}
          style={styles.slide}
          imageStyle={{ borderRadius: 15 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={[styles.arrow, { left: 10 }]}
        onPress={() => scrollToIndex(currentIndex - 1)}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={28} color="#fff" />
      </TouchableOpacity> */}
      

      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        snapToInterval={ITEM_WIDTH + ITEM_MARGIN * 2}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{
          //paddingHorizontal: (width - ITEM_WIDTH) / 2,
          paddingHorizontal: 18,
        }}
      />
      {/* <Pagination data={data} currentIndex={currentIndex} /> */}

      {/* <TouchableOpacity
        style={[styles.arrow, { right: 10 }]}
        onPress={() => scrollToIndex(currentIndex + 1)}
        disabled={currentIndex === data.length - 1}
      >
        <ChevronRight size={28} color="#fff" />
      </TouchableOpacity> */}
  
    </View>



  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
  },
  slide: {
    width: "100%",
    height: 240,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  arrow: {
    position: "absolute",
    top: "45%",
    zIndex: 1,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 50,
  },
});