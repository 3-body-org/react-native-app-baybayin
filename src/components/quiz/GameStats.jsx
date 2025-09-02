import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameStats = ({ 
  score, 
  lives, 
  streak, 
  accuracy, 
  timeRemaining,
  currentLevel 
}) => {
  const getLivesColor = () => {
    if (lives >= 3) return '#4CAF50';
    if (lives === 2) return '#FF9800';
    return '#F44336';
  };

  const getStreakColor = () => {
    if (streak >= 5) return '#9C27B0';
    if (streak >= 3) return '#FF9800';
    return '#2196F3';
  };

  const getAccuracyColor = () => {
    if (accuracy >= 90) return '#4CAF50';
    if (accuracy >= 70) return '#FF9800';
    return '#F44336';
  };

  const getTimeColor = () => {
    if (timeRemaining > 20) return '#4CAF50';
    if (timeRemaining > 10) return '#FF9800';
    return '#F44336';
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Score</Text>
          <Text style={[styles.statValue, { color: '#4CAF50' }]}>{score}</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Lives</Text>
          <Text style={[styles.statValue, { color: getLivesColor() }]}>
            {'❤️'.repeat(lives)}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Streak</Text>
          <Text style={[styles.statValue, { color: getStreakColor() }]}>
            {streak} 🔥
          </Text>
        </View>
      </View>
      
      <View style={styles.row}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Accuracy</Text>
          <Text style={[styles.statValue, { color: getAccuracyColor() }]}>
            {accuracy}%
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Level</Text>
          <Text style={[styles.statValue, { color: '#2196F3' }]}>
            {currentLevel}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Time</Text>
          <Text style={[styles.statValue, { color: getTimeColor() }]}>
            {timeRemaining}s
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameStats;
