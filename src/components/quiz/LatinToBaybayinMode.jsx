import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import QuizTile from './QuizTile';
import { baybayinCharacters } from '../../data/quiz-data';

const LatinToBaybayinMode = ({ 
  questionData, 
  onSubmitAnswer, 
  showFeedback, 
  isCorrect, 
  userAnswer 
}) => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [availableCharacters, setAvailableCharacters] = useState([]);

  // Generate available characters for the current question
  const generateAvailableCharacters = useMemo(() => {
    if (!questionData) return [];
    
    const correctAnswer = questionData.baybayin;
    const correctChars = correctAnswer.split('');
    
    // Add correct characters
    const chars = [...correctChars];
    
    // Add some random characters to make it challenging
    const allChars = baybayinCharacters.katinig.map(char => char.character);
    
    // Add 3-5 random incorrect characters
    const randomChars = allChars
      .filter(char => !correctChars.includes(char))
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 3);
    
    return [...chars, ...randomChars].sort(() => 0.5 - Math.random());
  }, [questionData]);

  useEffect(() => {
    setAvailableCharacters(generateAvailableCharacters);
    setSelectedCharacters([]);
  }, [generateAvailableCharacters]);

  const handleCharacterPress = (character) => {
    if (showFeedback) return;
    
    setSelectedCharacters(prev => {
      const newSelection = [...prev, character];
      
      // Check if we have enough characters
      if (newSelection.length === questionData.baybayin.length) {
        const answer = newSelection.join('');
        onSubmitAnswer(answer);
      }
      
      return newSelection;
    });
  };

  const handleRemoveCharacter = (index) => {
    if (showFeedback) return;
    
    setSelectedCharacters(prev => {
      const newSelection = [...prev];
      newSelection.splice(index, 1);
      return newSelection;
    });
  };

  const clearSelection = () => {
    if (showFeedback) return;
    setSelectedCharacters([]);
  };

  const getCharacterStatus = (character, index) => {
    if (!showFeedback) return 'normal';
    
    const correctAnswer = questionData.baybayin;
    const correctChars = correctAnswer.split('');
    
    if (correctChars.includes(character)) {
      return 'correct';
    }
    
    return 'wrong';
  };

  const getSelectedCharacterStatus = (character, index) => {
    if (!showFeedback) return 'normal';
    
    const correctAnswer = questionData.baybayin;
    const correctChars = correctAnswer.split('');
    const userChars = userAnswer.split('');
    
    if (userChars[index] === character && correctChars[index] === character) {
      return 'correct';
    } else if (userChars[index] === character && correctChars[index] !== character) {
      return 'wrong';
    }
    
    return 'normal';
  };

  if (!questionData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading question...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Question Display */}
      <View style={styles.questionContainer}>
        <Text style={styles.instruction}>
          Piliin ang tamang Baybayin para sa salitang:
        </Text>
        <Text style={styles.latinWord}>{questionData.latin}</Text>
        <Text style={styles.meaning}>({questionData.meaning})</Text>
      </View>

      {/* Selected Characters Display */}
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedLabel}>Inyong sagot:</Text>
        <View style={styles.selectedRow}>
          {selectedCharacters.map((character, index) => (
            <QuizTile
              key={`selected-${index}`}
              character={character}
              onPress={() => handleRemoveCharacter(index)}
              isSelected={true}
              isCorrect={getSelectedCharacterStatus(character, index) === 'correct'}
              isWrong={getSelectedCharacterStatus(character, index) === 'wrong'}
              size="medium"
            />
          ))}
          {/* Empty slots */}
          {Array.from({ length: questionData.baybayin.length - selectedCharacters.length }).map((_, index) => (
            <View key={`empty-${index}`} style={styles.emptySlot} />
          ))}
        </View>
        
        {selectedCharacters.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
            <Text style={styles.clearButtonText}>Burahin</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Available Characters */}
      <View style={styles.availableContainer}>
        <Text style={styles.availableLabel}>Mga karakter na pwedeng piliin:</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.availableRow}
        >
          {availableCharacters.map((character, index) => {
            const isUsed = selectedCharacters.includes(character);
            const status = getCharacterStatus(character, index);
            
            return (
              <QuizTile
                key={`available-${index}`}
                character={character}
                onPress={() => handleCharacterPress(character)}
                disabled={isUsed || showFeedback}
                isCorrect={status === 'correct'}
                isWrong={status === 'wrong'}
                size="medium"
              />
            );
          })}
        </ScrollView>
      </View>

      {/* Feedback */}
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text style={[styles.feedbackText, isCorrect ? styles.correctText : styles.wrongText]}>
            {isCorrect ? 'Tama! 🎉' : 'Mali! 😔'}
          </Text>
          <Text style={styles.correctAnswer}>
            Tamang sagot: {questionData.baybayin}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
  },
  questionContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  latinWord: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  meaning: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  selectedContainer: {
    marginBottom: 20,
  },
  selectedLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  selectedRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  emptySlot: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
    margin: 4,
    backgroundColor: '#F5F5F5',
  },
  clearButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  availableContainer: {
    marginBottom: 20,
  },
  availableLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  availableRow: {
    paddingHorizontal: 10,
  },
  feedbackContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  correctText: {
    color: '#4CAF50',
  },
  wrongText: {
    color: '#F44336',
  },
  correctAnswer: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default LatinToBaybayinMode;
