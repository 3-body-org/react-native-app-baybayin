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
import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import Pagination from "@components/pagination";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = Math.round(width * 0.9);
const ITEM_MARGIN = 7;

export default function Carousel({ data = [] }) {
  const router = useRouter();
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
      event.nativeEvent.contentOffset.x / (ITEM_WIDTH + ITEM_MARGIN * 2)
    );
    setCurrentIndex(newIndex);
  };

  const getItemLayout = (_, index) => ({
    length: ITEM_WIDTH + ITEM_MARGIN * 2,
    offset: (ITEM_WIDTH + ITEM_MARGIN * 2) * index,
    index,
  });

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: false,
      });
    });
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        width: wp(90), //90 muna, will test again later
        marginHorizontal: ITEM_MARGIN,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push(item.screen)}
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
          <ChevronLeft size={wp(4)} color="black" />
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
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />

      {currentIndex < data.length - 1 && (
        <TouchableOpacity
          style={[styles.arrowButton, styles.arrowRight]}
          onPress={() => scrollToIndex(currentIndex + 1)}
        >
          <ChevronRight size={wp(4)} color="black" />
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
    width: wp(85),
    height: hp(30),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overlay: {
    alignItems: "center",
    padding: 15,
    paddingBottom: 20,
  },
  title: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  description: {
    fontSize: hp(1.8),
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
  },
  arrowButton: {
    position: "absolute",
    top: "45%",
    transform: [{ translateY: -20 }],
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowLeft: {
    left: 30,
  },
  arrowRight: {
    right: 30,
  },
});
ChevronRight;
