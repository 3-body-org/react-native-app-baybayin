import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

const QuizResult = ({ 
  showGameOverModal, 
  showCongratulationsModal, 
  gameStats, 
  onRestart, 
  onBackToMenu,
  onHideGameOver,
  onHideCongratulations 
}) => {
  // Game Over Modal
  const renderGameOverModal = () => {
    if (!showGameOverModal) return null;

    return (
      <View style={styles.gameOverModal}>
        <TouchableWithoutFeedback>
          <View style={styles.gameOverContent}>
            <Text style={styles.gameOverIcon}>💔</Text>
            <Text style={styles.gameOverTitle}>Game Over!</Text>
            <Text style={styles.gameOverSubtitle}>Nawala ang lahat ng iyong buhay!</Text>
            
            <View style={styles.finalStats}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Final Score:</Text>
                <Text style={styles.statValue}>{gameStats.score}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Correct Answers:</Text>
                <Text style={styles.statValue}>{gameStats.correctAnswers}/{gameStats.totalQuestionsInPool}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Lives Remaining:</Text>
                <Text style={[styles.statValue, { color: '#F44336' }]}>0</Text>
              </View>
            </View>
            
            <View style={styles.gameOverButtons}>
              <TouchableOpacity
                style={[styles.gameOverButton, styles.tryAgainButton]}
                onPress={onRestart}
              >
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.gameOverButton, styles.cancelButton]}
                onPress={onBackToMenu}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  // Victory Modal
  const renderVictoryModal = () => {
    if (!showCongratulationsModal) return null;

    return (
      <View style={styles.victoryModal}>
        <TouchableWithoutFeedback>
          <View style={styles.victoryContent}>
            {/* Victory Header */}
            <View style={styles.victoryHeader}>
              <Text style={styles.victoryIcon}>🏆</Text>
              <Text style={styles.victoryTitle}>Congratulations!</Text>
              <Text style={styles.victorySubtitle}>Nakumpleto mo ang lahat ng tanong!</Text>
            </View>
            
            {/* Victory Stats */}
            <View style={styles.victoryStats}>
              <View style={styles.victoryStatCard}>
                <Text style={styles.victoryStatIcon}>⭐</Text>
                <Text style={styles.victoryStatLabel}>Final Score</Text>
                <Text style={styles.victoryStatValue}>{gameStats.score}</Text>
              </View>
              
              <View style={styles.victoryStatCard}>
                <Text style={styles.victoryStatIcon}>✅</Text>
                <Text style={styles.victoryStatLabel}>Correct</Text>
                <Text style={styles.victoryStatValue}>{gameStats.correctAnswers}/{gameStats.totalQuestionsInPool}</Text>
              </View>
              
              <View style={styles.victoryStatCard}>
                <Text style={styles.victoryStatIcon}>❤️</Text>
                <Text style={styles.victoryStatLabel}>Lives Left</Text>
                <Text style={[styles.victoryStatValue, { color: '#4CAF50' }]}>{gameStats.lives}</Text>
              </View>
            </View>
            
            {/* Victory Message */}
            <View style={styles.victoryMessage}>
              <Text style={styles.victoryMessageText}>
                Mahusay! Natapos mo ang lahat ng tanong na may natitirang buhay!
              </Text>
            </View>
            
            {/* Victory Buttons */}
            <View style={styles.victoryButtons}>
              <TouchableOpacity
                style={[styles.victoryButton, styles.playAgainButton]}
                onPress={onRestart}
              >
                <Text style={styles.victoryButtonText}>Ulitin</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.victoryButton, styles.backToMenuButton]}
                onPress={onBackToMenu}
              >
                <Text style={styles.victoryButtonText}>Bumalik</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <>
      {renderGameOverModal()}
      {renderVictoryModal()}
    </>
  );
};

const styles = StyleSheet.create({
  // Game Over Modal Styles
  gameOverModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 9999,
  },
  gameOverContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  gameOverIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  gameOverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 8,
    textAlign: 'center',
  },
  gameOverSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  finalStats: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  gameOverButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  gameOverButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tryAgainButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  // Victory Modal Styles
  victoryModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 9999,
  },
  victoryContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    width: '92%',
    maxWidth: 420,
    alignItems: 'center',
    shadowColor: '#573826',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
    borderWidth: 2,
    borderColor: '#FEF3EC',
  },
  victoryHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  victoryIcon: {
    fontSize: 72,
    marginBottom: 12,
  },
  victoryTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#573826',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  victorySubtitle: {
    fontSize: 18,
    color: '#8B4513',
    textAlign: 'center',
    fontWeight: '500',
  },
  victoryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
    gap: 8,
  },
  victoryStatCard: {
    flex: 1,
    backgroundColor: '#FEF3EC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#573826',
    shadowColor: '#573826',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  victoryStatIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  victoryStatLabel: {
    fontSize: 12,
    color: '#8B4513',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  victoryStatValue: {
    fontSize: 18,
    color: '#573826',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  victoryMessage: {
    backgroundColor: '#FEF3EC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  victoryMessageText: {
    fontSize: 16,
    color: '#573826',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  victoryButtons: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  victoryButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    shadowColor: '#573826',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  playAgainButton: {
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#45A049',
  },
  backToMenuButton: {
    backgroundColor: '#573826',
    borderWidth: 2,
    borderColor: '#4A2F1A',
  },
  victoryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default QuizResult;
