import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native";
import QuizScreen from "../screen/quiz-screen";

export default function SubukanTab() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  
  // Animation values
  const latinToBaybayinScale = useRef(new Animated.Value(1)).current;
  const baybayinToLatinScale = useRef(new Animated.Value(1)).current;
  const latinToBaybayinOpacity = useRef(new Animated.Value(1)).current;
  const baybayinToLatinOpacity = useRef(new Animated.Value(1)).current;
  const latinToBaybayinElevation = useRef(new Animated.Value(5)).current;
  const baybayinToLatinElevation = useRef(new Animated.Value(5)).current;

  const handleStartQuiz = (mode) => {
    setSelectedMode(mode);
    setShowQuiz(true);
  };

  const handleLatinToBaybayinPress = () => {
    // Scale down animation with shadow
    Animated.parallel([
      Animated.timing(latinToBaybayinScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(latinToBaybayinOpacity, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(latinToBaybayinElevation, {
        toValue: 2,
        duration: 100,
        useNativeDriver: false,
      })
    ]).start(() => {
      // Scale back up with bounce effect
      Animated.sequence([
        Animated.timing(latinToBaybayinScale, {
          toValue: 1.05,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(latinToBaybayinScale, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        })
      ]).start();
      
      // Fade back in and restore shadow
      Animated.parallel([
        Animated.timing(latinToBaybayinOpacity, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(latinToBaybayinElevation, {
          toValue: 5,
          duration: 160,
          useNativeDriver: false,
        })
      ]).start(() => {
        handleStartQuiz('latin-to-baybayin');
      });
    });
  };

  const handleBaybayinToLatinPress = () => {
    // Scale down animation with shadow
    Animated.parallel([
      Animated.timing(baybayinToLatinScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(baybayinToLatinOpacity, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(baybayinToLatinElevation, {
        toValue: 2,
        duration: 100,
        useNativeDriver: false,
      })
    ]).start(() => {
      // Scale back up with bounce effect
      Animated.sequence([
        Animated.timing(baybayinToLatinScale, {
          toValue: 1.05,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(baybayinToLatinScale, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        })
      ]).start();
      
      // Fade back in and restore shadow
      Animated.parallel([
        Animated.timing(baybayinToLatinOpacity, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(baybayinToLatinElevation, {
          toValue: 5,
          duration: 160,
          useNativeDriver: false,
        })
      ]).start(() => {
        handleStartQuiz('baybayin-to-latin');
      });
    });
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
          onPress={handleLatinToBaybayinPress}
          activeOpacity={1}
        >
          <Animated.View 
            style={[
              styles.animatedCard,
              {
                transform: [{ scale: latinToBaybayinScale }],
                opacity: latinToBaybayinOpacity,
                elevation: latinToBaybayinElevation,
              }
            ]}
          >
            <Text style={styles.modeIcon}>🔤</Text>
            <Text style={styles.modeTitle}>Latin → Baybayin</Text>
            <Text style={styles.modeDescription}>
              Piliin ang tamang Baybayin characters
            </Text>
          </Animated.View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.modeButton} 
          onPress={handleBaybayinToLatinPress}
          activeOpacity={1}
        >
          <Animated.View 
            style={[
              styles.animatedCard,
              {
                transform: [{ scale: baybayinToLatinScale }],
                opacity: baybayinToLatinOpacity,
                elevation: baybayinToLatinElevation,
              }
            ]}
          >
            <Text style={styles.modeIcon}>📝</Text>
            <Text style={styles.modeTitle}>Baybayin → Latin</Text>
            <Text style={styles.modeDescription}>
              Piliin ang tamang Latin na salita
            </Text>
          </Animated.View>
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
  animatedCard: {
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