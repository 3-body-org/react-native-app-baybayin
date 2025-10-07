import { StyleSheet, View, useWindowDimensions } from "react-native";

export default function Container({ children, style, ...props }) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { padding: width > 400 ? 24 : width > 300 ? 20 : 16 }, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // padding: 20,
    // paddingHorizontal: 25,
    // position: 'relative',
  },
});
