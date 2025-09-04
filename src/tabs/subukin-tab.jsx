import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import QuizScreen from "../screen/quiz-screen";

export default function SubukanTab() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);

  const handleStartQuiz = (mode) => {
    setSelectedMode(mode);
    setShowQuiz(true);
  };

  const handleBackToMenu = () => {
    setShowQuiz(false);
    setSelectedMode(null);
  };

  if (showQuiz) {
    return <QuizScreen navigation={{ goBack: handleBackToMenu }} initialMode={selectedMode} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Subukan</Text>
        <Text style={styles.subtitle}>
          Subukan ang iyong kaalaman sa Baybayin!
        </Text>
      </View>

      <View style={styles.modeContainer}>
        <TouchableOpacity 
          style={styles.modeButton} 
          onPress={() => handleStartQuiz('latin-to-baybayin')}
          activeOpacity={0.7}
        >
          <View style={styles.modeCard}>
            <Text style={styles.modeIcon}>🔤</Text>
            <Text style={styles.modeTitle}>Latin → Baybayin</Text>
            <Text style={styles.modeDescription}>
              Piliin ang tamang Baybayin characters
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.modeButton} 
          onPress={() => handleStartQuiz('baybayin-to-latin')}
          activeOpacity={0.7}
        >
          <View style={styles.modeCard}>
            <Text style={styles.modeIcon}>📝</Text>
            <Text style={styles.modeTitle}>Baybayin → Latin</Text>
            <Text style={styles.modeDescription}>
              Piliin ang tamang Latin na salita
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.instructionsContainer}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,  
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  heading: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: "#573826",
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modeContainer: {
    padding: 16,
  },
  modeButton: {
    marginBottom: 15,
  },
  modeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modeIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  modeDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  instructionsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },


});   