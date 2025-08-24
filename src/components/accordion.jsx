import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
} from "react-native";
import { ChevronDown } from "lucide-react-native";
import { billData } from "../data/bill-data";

export default function Accordion() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <View>
      {billData.map((item) => {
        const isOpen = activeSection === item.id;

        return (
          <View
            key={item.id}
            style={[styles.card, isOpen && styles.cardOpen]}
          >
            {/* Accordion Header */}
            <TouchableOpacity
              onPress={() => toggleSection(item.id)}
              activeOpacity={0.7}
              style={styles.header}
            >
              <Text style={styles.title}>{item.title}</Text>
              <ChevronDown
                size={22}
                color="#5c3219"
                style={{
                  transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
                }}
              />
            </TouchableOpacity>

            {/* Accordion Content */}
            {isOpen && (
              <View style={styles.content}>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            )}
          </View>
        );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#7b4b2f",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#fcefe6",
    overflow: "hidden",
  },
  cardOpen: {
    backgroundColor: "#fcefe6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fcefe6",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5c3219",
  },
  content: {
    backgroundColor: "#f4e4db",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  description: {
    fontSize: 14,
    color: "#5c3219",
  },
});
