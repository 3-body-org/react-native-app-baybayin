import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import QuizTile from './QuizTile';
import { quizData } from '../../data/quiz-data';

const BaybayinToLatinMode = ({ 
  questionData, 
  onSubmitAnswer, 
  showFeedback, 
  isCorrect, 
  userAnswer 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [options, setOptions] = useState([]);

  // Generate multiple choice options using real words
  const generateOptions = useMemo(() => {
    if (!questionData) return [];
    
    const correctAnswer = questionData.latin;
    const options = [correctAnswer];
    
    // Get all other words from quiz data (excluding the correct answer)
    const otherWords = quizData.words
      .map(word => word.latin)
      .filter(word => word !== correctAnswer);
    
    // Select 3 random words from the other words
    const randomOptions = otherWords
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    return [...options, ...randomOptions].sort(() => 0.5 - Math.random());
  }, [questionData]);

  useEffect(() => {
    setOptions(generateOptions);
    setSelectedAnswer('');
  }, [generateOptions]);

  const handleOptionPress = (option) => {
    if (showFeedback) return;
    
    setSelectedAnswer(option);
    onSubmitAnswer(option);
  };

  const getOptionStatus = (option) => {
    if (!showFeedback) return 'normal';
    
    if (option === questionData.latin) {
      return 'correct';
    } else if (option === selectedAnswer && option !== questionData.latin) {
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
          Piliin ang tamang Latin na salita para sa Baybayin na:
        </Text>
        <Text style={styles.baybayinWord}>{questionData.baybayin}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <Text style={styles.optionsLabel}>Mga pagpipilian:</Text>
        <View style={styles.optionsGrid}>
          {options.map((option, index) => {
            const status = getOptionStatus(option);
            
            return (
              <TouchableOpacity
                key={`option-${index}`}
                style={[
                  styles.optionButton,
                  status === 'correct' && styles.correctOption,
                  status === 'wrong' && styles.wrongOption,
                  selectedAnswer === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionPress(option)}
                disabled={showFeedback}
              >
                <Text style={[
                  styles.optionText,
                  status === 'correct' && styles.correctText,
                  status === 'wrong' && styles.wrongText,
                  selectedAnswer === option && styles.selectedText,
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Feedback */}
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text style={[styles.feedbackText, isCorrect ? styles.correctFeedback : styles.wrongFeedback]}>
            {isCorrect ? 'Tama! 🎉' : 'Mali! 😔'}
          </Text>
          <Text style={styles.correctAnswer}>
            Tamang sagot: {questionData.latin}
          </Text>
          <Text style={styles.explanation}>
            Ang Baybayin na "{questionData.baybayin}" ay katumbas ng Latin na "{questionData.latin}".
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
  baybayinWord: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedOption: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    transform: [{ scale: 1.02 }],
  },
  correctOption: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  selectedText: {
    color: '#2196F3',
  },
  correctText: {
    color: '#4CAF50',
  },
  wrongText: {
    color: '#F44336',
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
  correctFeedback: {
    color: '#4CAF50',
  },
  wrongFeedback: {
    color: '#F44336',
  },
  correctAnswer: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default BaybayinToLatinMode;
