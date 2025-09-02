import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

const QuizTile = ({ 
  character, 
  onPress, 
  isSelected = false, 
  isCorrect = false, 
  isWrong = false,
  disabled = false,
  size = 'medium' 
}) => {
  const getTileStyle = () => {
    let style = [styles.tile, styles[size]];
    
    if (isSelected) {
      style.push(styles.selected);
    }
    
    if (isCorrect) {
      style.push(styles.correct);
    }
    
    if (isWrong) {
      style.push(styles.wrong);
    }
    
    if (disabled) {
      style.push(styles.disabled);
    }
    
    return style;
  };

  const getTextStyle = () => {
    let style = [styles.text, styles[`${size}Text`]];
    
    if (isSelected || isCorrect || isWrong) {
      style.push(styles.selectedText);
    }
    
    return style;
  };

  return (
    <TouchableOpacity
      style={getTileStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{character}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  small: {
    width: 50,
    height: 50,
  },
  medium: {
    width: 60,
    height: 60,
  },
  large: {
    width: 80,
    height: 80,
  },
  selected: {
    backgroundColor: '#4CAF50',
    borderColor: '#45A049',
    transform: [{ scale: 1.05 }],
  },
  correct: {
    backgroundColor: '#4CAF50',
    borderColor: '#45A049',
  },
  wrong: {
    backgroundColor: '#F44336',
    borderColor: '#D32F2F',
  },
  disabled: {
    backgroundColor: '#E0E0E0',
    borderColor: '#BDBDBD',
    opacity: 0.6,
  },
  text: {
    fontWeight: 'bold',
    color: '#333',
  },
  smallText: {
    fontSize: 16,
  },
  mediumText: {
    fontSize: 20,
  },
  largeText: {
    fontSize: 24,
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

export default QuizTile;
