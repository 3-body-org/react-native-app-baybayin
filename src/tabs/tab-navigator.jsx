import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AralinTab from "./aralin-tab.jsx";
import LinanginTab from "./linangin-tab.jsx";
import SubukanTab from "./subukin-tab.jsx";
import BackButton from "../components/back-button.jsx";
import Card from "../components/card.jsx";

export default function TabNavigator() {
  const [activeTab, setActiveTab] = useState("Aralin");

  const tabs = [
    { key: "Aralin", label: "Aralin", component: AralinTab },
    { key: "Linangin", label: "Linangin", component: LinanginTab },
    { key: "Subukan", label: "Subukan", component: SubukanTab },
  ];

  const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component || LinanginTab;

  return (
    <View style={styles.container}>
      {/* <View style={styles.backButton}>
           <BackButton />
      </View> */}
   
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>
        <ActiveComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    marginHorizontal: 16,
    marginBottom: 15,
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
    marginTop: 50,
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