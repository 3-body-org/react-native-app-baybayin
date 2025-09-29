import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SectionHeader({ title }) {
  const [underlineWidth, setUnderlineWidth] = useState(12);
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        onLayout={e => setUnderlineWidth(e.nativeEvent.layout.width)}
      >
        {title}
      </Text>
      <View style={[styles.underline, { width: underlineWidth }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 , alignItems:"flex-start"},
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#573826",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  underline: {
    height: 3,
    backgroundColor: '#573826',
    borderRadius: 2,
    alignSelf:"flex-start"
  },
});
