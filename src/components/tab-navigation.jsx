import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function TabNavigator() {
  const router = useRouter();
  const path = usePathname().replace("/", "");


  const tabs = [
    { key: "aralin-tab", label: "Aralin"},
    { key: "linangin-tab", label: "Linangin"},
    { key: "subukan-tab", label: "Subukan",},
  ];


  return (
    <View style={styles.container}>
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const active = path === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, active && styles.activeTab]}
            onPress={() => router.push(`/${tab.key}`)}
          >
            <Text style={[styles.tabText, active && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  titleSection: {
    backgroundColor: "#573826",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4A90E2",
    alignItems: "center",
  },
  titleText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 15,
    marginTop: 20,
    borderRadius: 50,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  activeTab: {
    backgroundColor: "#F5E6D3",
    borderLeftColor: "#D4A574",
    borderRadius: 50,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#573826",
  },
  activeTabText: {
    color: "#573826",
    fontWeight: "700",
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
  },
});