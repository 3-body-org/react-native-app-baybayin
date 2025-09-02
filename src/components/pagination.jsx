import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";

const Pagination = ({ data, currentIndex, scrollToIndex }) => {
  if (!data || data.length <= 1) return null;

  return (
    <View style={styles.container}>
      {data.map((_, index) => {
        const isActive = currentIndex === index;
        const scale = isActive ? 1.2 : 0.8;
        const opacity = isActive ? 1 : 0.5;
        
        return (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToIndex(index)}
            activeOpacity={0.7}
            style={styles.dotContainer}
          >
            <Animated.View
              style={[
                styles.dot,
                {
                  transform: [{ scale }],
                  opacity,
                  backgroundColor: isActive ? "#573826" : "rgba(47, 78, 43, 0.2)",
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  dotContainer: {
    padding: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    transition: 'transform 150ms ease, opacity 150ms ease',
  },
});

export default React.memo(Pagination);
