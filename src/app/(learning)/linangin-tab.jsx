import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler"; 
import flashcardCategories from "@data/flashcard-data";

export default function LinanginTab() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [translateX] = useState(new Animated.Value(0));
  const [flipValue] = useState(new Animated.Value(0));
  const [completedCards, setCompletedCards] = useState(new Set());
  const [shuffledCards, setShuffledCards] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);

  // Combine all cards from all categories into one array
  const originalCards = Object.values(flashcardCategories).flatMap(category => category.cards);
  
  // Initialize shuffled cards if not set
  const allCards = shuffledCards.length > 0 ? shuffledCards : originalCards;
  const currentCard = allCards[currentIndex];
  const progress = (completedCards.size / allCards.length) * 100;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const markCardCompleted = (cardIndex) => {
    const newCompleted = new Set(completedCards);
    newCompleted.add(cardIndex);
    setCompletedCards(newCompleted);
  };

  const toggleCardOrder = () => {
    if (isShuffled) {
      // Switch to in-order mode
      setShuffledCards([]);
      setIsShuffled(false);
    } else {
      // Switch to shuffled mode
      const shuffled = [...originalCards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
      setIsShuffled(true);
    }
    
    // Reset to first card and clear completed cards
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedCards(new Set());
    
    // Reset animations
    translateX.setValue(0);
    flipValue.setValue(0);
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, velocityX } = event.nativeEvent;
      
      if (translationX > 100 || velocityX > 500) {
        // Swipe right - previous card
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setIsFlipped(false);
        }
      } else if (translationX < -100 || velocityX < -500) {
        // Swipe left - next card
        if (currentIndex < allCards.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setIsFlipped(false);
        } else {
          // Mark current card as completed when reaching the end
          markCardCompleted(currentIndex);
        }
      }
      
      // Reset position
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipValue, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      // Mark card as completed when user flips it to see the answer
      markCardCompleted(currentIndex);
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <View style={styles.container}>
      {/* Tips Section */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Tips to use:</Text>
        <Text style={styles.tipsText}>
          Use the flashcard to challenge or quiz yourself without pressure. 
          If in latin script try to write the equivalent baybayin script. {'\n'}
          Modes: Choose between shuffled and in order for your learning experience.
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {completedCards.size} / {allCards.length} completed ({Math.round(progress)}%)
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  { translateX: translateX },
                  { 
                    rotateY: flipValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg']
                    })
                  }
                ]
              }
            ]}
          >
            <TouchableOpacity style={styles.cardContent} onPress={flipCard}>
              <Animated.View
                style={[
                  styles.cardFace,
                  {
                    opacity: flipValue.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 0, 0]
                    })
                  }
                ]}
              >
                <View style={styles.frontCard}>
                  <Text style={styles.baybayinText}>{currentCard.baybayin}</Text>
                  <Text style={styles.instructionText}>Tap to reveal</Text>
                  {completedCards.has(currentIndex) && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>✓</Text>
                    </View>
                  )}
                </View>
              </Animated.View>
              
              <Animated.View
                style={[
                  styles.cardFace,
                  styles.backCardContainer,
                  {
                    opacity: flipValue.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 0, 1]
                    })
                  }
                ]}
              >
                <View style={styles.backCard}>
                  <Text style={styles.letterText}>{currentCard.letter}</Text>
                  <Text style={styles.soundText}>{currentCard.sound}</Text>
                  {currentCard.description && (
                    <Text style={styles.descriptionText}>{currentCard.description}</Text>
                  )}

                  <Text style={styles.instructionText}>Tap to flip back</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
          onPress={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
              setIsFlipped(false);
            }
          }}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>

        <View style={styles.modeContainer}>
          <Text style={styles.modeLabel}>Mode:</Text>
          <TouchableOpacity
            style={[styles.shuffleButton, isShuffled && styles.shuffleButtonActive]}
            onPress={toggleCardOrder}
          >
            <Text style={[styles.shuffleButtonText, isShuffled && styles.shuffleButtonTextActive]}>
              {isShuffled ? "🔀 Shuffled" : "📋 In Order"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.navButton, currentIndex === allCards.length - 1 && styles.disabledButton]}
          onPress={() => {
            if (currentIndex < allCards.length - 1) {
              setCurrentIndex(currentIndex + 1);
              setIsFlipped(false);
            } else {
              markCardCompleted(currentIndex);
            }
          }}
          disabled={currentIndex === allCards.length - 1}
        >
          <Text style={styles.navButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.swipeHint}>Swipe left/right or use buttons to navigate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: "#573826",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  tipsContainer: {
    backgroundColor: "#FEF3EC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 2,
    borderLeftColor: "#573826",
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#573826",
    marginBottom: 6,
  },
  tipsText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#573826",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  cardContainer: {
    flex: 1,
    maxHeight: 250,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  card: {
    width: 280,
    height: 200,
    borderRadius: 16,
  },
  cardContent: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  backCardContainer: {
    transform: [{ rotateY: "180deg" }],
  },
  frontCard: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FEF3EC",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#573826",
    position: "relative",
    padding: 16,
  },
  completedBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  completedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backCard: {
    flex: 1,
    width: "100%",
    backgroundColor: "#573826",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  baybayinText: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#573826",
    marginBottom: 8,
  },
  letterText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  soundText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#F5E6D3",
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 12,
    color: "#F5E6D3",
    textAlign: "center",
    marginBottom: 10,
    fontStyle: "italic",
  },
  instructionText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginTop: 8,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },
  navButton: {
    backgroundColor: "#573826",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 100,
    alignItems: "center",
    marginVertical: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  navButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  modeContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  modeLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
    marginBottom: 4,
  },
  shuffleButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#8B4513",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 110,
    alignItems: "center",
  },
  shuffleButtonActive: {
    backgroundColor: "#8B4513",
    borderColor: "#8B4513",
  },
  shuffleButtonText: {
    color: "#8B4513",
    fontSize: 12,
    fontWeight: "600",
  },
  shuffleButtonTextActive: {
    color: "#fff",
  },
  swipeHint: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 10,
  },
});