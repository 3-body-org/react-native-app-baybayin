import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import QuizTile from '../../components/quiz/quiz-tile';
import { baybayinCharacters, pangaltasReplacement, getRandomWordsFromLesson } from '../../data/quiz-data';

const LatinToBaybayinMode = ({ 
  questionData, 
  onSubmitAnswer, 
  showFeedback, 
  isCorrect, 
  userAnswer 
}) => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [availableCharacters, setAvailableCharacters] = useState([]);

  // Function to replace special characters for display
  const replaceSpecialCharsForDisplay = (char) => {
    if (char === '᜔') return pangaltasReplacement; // Pangaltas
    if (char === '᜵') return '•'; // Danda (period)
    return char;
  };

  // Generate available characters for the current question
  const generateAvailableCharacters = useMemo(() => {
    if (!questionData) return [];
    
    const correctAnswer = questionData.baybayin;
    // Split into characters but keep the kudlit and pangaltas with their base characters
    const correctChars = [];
    for (let i = 0; i < correctAnswer.length; i++) {
      const char = correctAnswer[i];
      if (char === '᜔' && i > 0) {
        // If it's a pangaltas, combine with previous character
        correctChars[correctChars.length - 1] += char;
      } else if (['ᜒ', 'ᜓ'].includes(char) && i > 0) {
        // If it's a kudlit, combine with previous character
        correctChars[correctChars.length - 1] += char;
      } else {
        correctChars.push(char);
      }
    }
    
    // Add correct character combinations
    const chars = [...new Set(correctChars)]; // Remove duplicates
    
    // Add some random characters to make it challenging
    // Filter out special characters from the available characters
    const allChars = baybayinCharacters.filter(char => 
      char !== '᜔' && char !== 'ᜒ' && char !== 'ᜓ' && char !== '᜵'
    );
    
    // Add 5-8 random incorrect characters
    const randomChars = allChars
      .filter(char => !chars.includes(char))
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 4) + 5);
    
    return [...chars, ...randomChars].sort(() => 0.5 - Math.random());
  }, [questionData]);

  useEffect(() => {
    setAvailableCharacters(generateAvailableCharacters);
    setSelectedCharacters([]);
  }, [generateAvailableCharacters]);

  // Submit answer when selection is complete
  useEffect(() => {
    if (!showFeedback && selectedCharacters.length >= questionData?.inputCount) {
      const currentAnswer = selectedCharacters.join('');
      onSubmitAnswer(currentAnswer);
    }
  }, [selectedCharacters, questionData?.inputCount, showFeedback, onSubmitAnswer]);

  const handleCharacterPress = (character) => {
    if (showFeedback) return;

    setSelectedCharacters(prev => [...prev, character]);
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

  const getCharacterStatus = (character) => {
    if (!showFeedback) return 'normal';
    
    // Check if this character is part of the correct answer
    const correctAnswer = questionData.baybayin;
    // Get all unique characters in the correct answer
    const correctChars = [];
    for (let i = 0; i < correctAnswer.length; i++) {
      const char = correctAnswer[i];
      if (['᜔', 'ᜒ', 'ᜓ'].includes(char) && i > 0) {
        correctChars[correctChars.length - 1] += char;
      } else {
        correctChars.push(char);
      }
    }
    
    return correctChars.includes(character) ? 'correct' : 'wrong';
  };

  const getSelectedCharacterStatus = (character, index) => {
    if (!showFeedback) return 'normal';
    
    const correctAnswer = questionData.baybayin;
    
    // Split correct answer into logical characters (combining kudlits/pangaltas)
    const correctChars = [];
    for (let i = 0; i < correctAnswer.length; i++) {
      const char = correctAnswer[i];
      if (['᜔', 'ᜒ', 'ᜓ'].includes(char) && i > 0) {
        correctChars[correctChars.length - 1] += char;
      } else {
        correctChars.push(char);
      }
    }
    
    // If we've selected more characters than the correct answer, mark as wrong
    if (index >= correctChars.length) return 'wrong';
    
    // Check if the character at this position is correct
    return character === correctChars[index] ? 'correct' : 'wrong';
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

      {/* Feedback */}
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text style={[styles.feedbackText, isCorrect ? styles.correctText : styles.wrongText]}>
            {isCorrect ? 'Tama! 🎉' : 'Mali! 😔'}
          </Text>
          <Text style={styles.correctAnswer}>
            Tamang sagot: {questionData.baybayin}
          </Text>
          <Text style={styles.meaningText}>
            {questionData.latin} = {questionData.meaning || 'walang kahulugan'}
          </Text>
        </View>
      )}

      {/* Selected Characters Display */}
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedLabel}>Inyong sagot:</Text>
        <View style={styles.selectedRow}>
          {Array.from({ length: questionData.inputCount }).map((_, index) => {
            const character = selectedCharacters[index];
            if (!character) {
              return <View key={`empty-${index}`} style={styles.emptySlot} />;
            }
            
            return (
              <QuizTile
                key={`selected-${index}`}
                character={replaceSpecialCharsForDisplay(character)}
                onPress={() => handleRemoveCharacter(index)}
                isSelected={true}
                isCorrect={getSelectedCharacterStatus(character, index) === 'correct'}
                isWrong={getSelectedCharacterStatus(character, index) === 'wrong'}
                size="medium"
              />
            );
          })}
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
        <View style={styles.availableRow}>
          {availableCharacters.map((character, index) => {
            const status = getCharacterStatus(character);
            const isDisabled = showFeedback;
            
            return (
              <QuizTile
                key={`available-${index}`}
                character={replaceSpecialCharsForDisplay(character)}
                onPress={() => handleCharacterPress(character)}
                disabled={isDisabled}
                isCorrect={status === 'correct'}
                isWrong={status === 'wrong'}
                size="medium"
                opacity={isDisabled ? 0.7 : 1}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'violet', // test
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
    paddingHorizontal: 10,
    flex: 1,
  },
  emptySlot: {
    width: 50,
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#BDBDBD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    flex: 1,
    // backgroundColor: 'blue', // test
  },
  feedbackContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
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
