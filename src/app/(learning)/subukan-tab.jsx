import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { lessonModules } from "@data/lesson-data";

export default function SubukanTab() {
  const router = useRouter();
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLessonSelect = (lessonId) => {
    setSelectedLesson(lessonId);
  };

  const handleModeSelect = (mode) => {
    router.push({
      pathname: `/(learning)/${mode}`,
      params: { lessonId: selectedLesson },
    });
  };

  const renderLessonSelection = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.heading}>Pumili ng Aralin</Text>
        <Text style={styles.subtitle}>Piliin ang aralin na nais mong subukan.</Text>
      </View>
      <View style={styles.cardsContainer}>
        {Object.values(lessonModules).map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            onPress={() => handleLessonSelect(lesson.id)}
            activeOpacity={.8}
          >
            <View style={styles.lessonCard}>
              <View style={styles.lessonHeader}>
                <View style={styles.iconContainer}>
                  <Text style={styles.lessonIcon}>{lesson.icon}</Text>
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDescription}>{lesson.description}</Text>
                </View>
              </View>
              <View style={styles.learnMoreContainer}>
                <Text style={styles.tapToLearn}>Tap to select</Text>
                <Text style={styles.arrowIcon}>→</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderModeSelection = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.heading}>Pumili ng Mode</Text>
        <Text style={styles.subtitle}>Piliin ang direksyon ng pagsusulit.</Text>
      </View>
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          onPress={() => handleModeSelect("latin-to-baybayin")}
          activeOpacity={0.8}
        >
          <View style={[styles.lessonCard, styles.modeCard]}>
            <View style={styles.lessonHeader}>
              <View style={styles.iconContainer}>
                <Text style={styles.lessonIcon}>🔤</Text>
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>Latin → Baybayin</Text>
                <Text style={styles.lessonDescription}>Piliin ang tamang Baybayin characters</Text>
              </View>
            </View>
            <View style={styles.learnMoreContainer}>
              <Text style={styles.tapToLearn}>Tap to select</Text>
              <Text style={styles.arrowIcon}>→</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleModeSelect("baybayin-to-latin")}
          activeOpacity={0.8}
        >
          <View style={[styles.lessonCard, styles.modeCard]}>
            <View style={styles.lessonHeader}>
              <View style={styles.iconContainer}>
                <Text style={styles.lessonIcon}>📝</Text>
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>Baybayin → Latin</Text>
                <Text style={styles.lessonDescription}>Piliin ang tamang Latin na salita</Text>
              </View>
            </View>
            <View style={styles.learnMoreContainer}>
              <Text style={styles.tapToLearn}>Tap to select</Text>
              <Text style={styles.arrowIcon}>→</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={[styles.lessonCard, styles.modeCard, { marginTop: 20 }]}>
        <Text style={styles.instructionsTitle}>Paano Laruin:</Text>
        <Text style={styles.instruction}>
          1. Pumili ng mode: Latin → Baybayin o Baybayin → Latin
        </Text>
        <Text style={styles.instruction}>
          2. Sagutin ang 10 tanong.
        </Text>
        <Text style={styles.instruction}>
          3. May 10 points sa bawat tamang sagot.
        </Text>
        <Text style={styles.instruction}>
          4. May 3 buhay - mawawala ang isa sa maling sagot
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {selectedLesson ? renderModeSelection() : renderLessonSelection()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
  },
  heading: { 
    fontSize: 32, 
    fontWeight: "700", 
    color: "#573826",
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  cardsContainer: {
    marginTop: 8,
  },
  modeContainer: {
    padding: 16,
  },
  lessonCard: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FEF3EC",
    shadowColor: "#573826",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: "#F5E6D3",
    borderRadius: 12,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  lessonIcon: {
    fontSize: 32,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#573826",
    marginBottom: 6,
  },
  lessonDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  learnMoreContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  tapToLearn: {
    fontSize: 14,
    color: "#573826",
    fontWeight: "600",
    marginRight: 8,
  },
  arrowIcon: {
    fontSize: 16,
    color: "#573826",
    fontWeight: "bold",
  },
  modeCard: {
    backgroundColor: '#FFFFFF',
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#573826",
    marginBottom: 12,
  },
  instruction: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 8,
  },
});   