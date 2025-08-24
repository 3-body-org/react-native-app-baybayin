// not yet done
import React from "react";
import { View, StyleSheet } from "react-native";

const Pagination = ({ data, currentIndex }) => {
  return (
    <View style={styles.container}>
      {data.map((_, index) => (
        <View
          key={index}
          style={[styles.dot, currentIndex === index && styles.activeDot]}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
  },
});
