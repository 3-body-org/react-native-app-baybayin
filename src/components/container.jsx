import { StyleSheet, View } from "react-native";

export default function Container({ children, style, ...props }) {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    // paddingHorizontal: 25,

    position: "relative",
  },
});
