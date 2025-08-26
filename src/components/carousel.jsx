import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import Pagination from "./pagination";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = Math.round(width * 0.87);
const ITEM_MARGIN = 7;

export default function Carousel({ data = [], navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    if (index >= 0 && index < data.length) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / (ITEM_WIDTH + ITEM_MARGIN * 2),
    );
    setCurrentIndex(newIndex);
  };

  const getItemLayout = (_, index) => ({
    length: ITEM_WIDTH + ITEM_MARGIN * 2,
    offset: (ITEM_WIDTH + ITEM_MARGIN * 2) * index,
    index,
  });

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: false });
    });
  };

  const renderItem = ({ item }) => (
    <View style={{ width: ITEM_WIDTH, marginHorizontal: ITEM_MARGIN }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate(item.screen)}
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
      {currentIndex > 0 && (
        <TouchableOpacity 
          style={[styles.arrowButton, styles.arrowLeft]}
          onPress={() => scrollToIndex(currentIndex - 1)}
        >
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
      )}
      
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToInterval={ITEM_WIDTH + ITEM_MARGIN * 2}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_WIDTH) / 2 - ITEM_MARGIN,
        }}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />

      {currentIndex < data.length - 1 && (
        <TouchableOpacity 
          style={[styles.arrowButton, styles.arrowRight]}
          onPress={() => scrollToIndex(currentIndex + 1)}
        >
          <ChevronRight size={24} color="#000" />
        </TouchableOpacity>
      )}
      
      <Pagination 
        data={data} 
        currentIndex={currentIndex} 
        scrollToIndex={scrollToIndex}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
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
  arrowButton: {
    position: 'absolute',
    top: '45%',
    transform: [{ translateY: -20 }],
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    padding: 12,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLeft: {
    left: 30,
  },
  arrowRight: {
    right: 30,
  },
});
