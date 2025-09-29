import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';

const QuizResult = ({ 
  showGameOverModal, 
  showCongratulationsModal, 
  gameStats, 
  onRestart, 
  onBackToMenu,
  onHideGameOver,
  onHideCongratulations 
}) => {
  const router = useRouter();

  const handleViewSummary = () => {
    router.push({
      pathname: '/(learning)/summary-results',
      params: {
        score: gameStats.score,
        correctAnswers: gameStats.correctAnswers,
        totalQuestions: gameStats.totalQuestionsInPool,
        mode: 'baybayin'
      }
    });
  };

  // Game Over Modal
  const renderGameOverModal = () => {
    if (!showGameOverModal) return null;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showGameOverModal}
        onRequestClose={onHideGameOver}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.victoryModal}>
            <View style={styles.victoryContent}>
              {/* Game Over Header */}
              <View style={styles.victoryHeader}>
                <Text style={styles.victoryIcon}>💔</Text>
                <Text style={styles.victoryTitle}>Game Over!</Text>
                <Text style={styles.victorySubtitle}>Subukan muli upang mas mapabuti ang iyong iskor!</Text>
              </View>
              
              {/* Game Over Stats */}
              <View style={styles.victoryStats}>
                <View style={styles.victoryStatCard}>
                  <Text style={styles.victoryStatIcon}>⭐</Text>
                  <Text style={styles.victoryStatLabel}>Huling Iskor</Text>
                  <Text style={styles.victoryStatValue}>{gameStats.score}</Text>
                </View>
                
                <View style={styles.victoryStatCard}>
                  <Text style={styles.victoryStatIcon}>✅</Text>
                  <Text style={styles.victoryStatLabel}>Tamang Nasagot</Text>
                  <Text style={styles.victoryStatValue}>{gameStats.correctAnswers}/{gameStats.totalQuestionsInPool}</Text>
                </View>
                
                <View style={styles.victoryStatCard}>
                  <Text style={styles.victoryStatIcon}>❤️</Text>
                  <Text style={styles.victoryStatLabel}>Natitirang Buhay</Text>
                  <Text style={[styles.victoryStatValue, { color: '#F44336' }]}>0</Text>
                </View>
              </View>
              
              {/* Game Over Buttons */}
              <View style={styles.victoryButtons}>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.victoryButton, styles.playAgainButton]}
                    onPress={onRestart}
                  >
                    <Text style={styles.victoryButtonText}>Subukan Muli</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.victoryButton, styles.backToMenuButton]}
                    onPress={onBackToMenu}
                  >
                    <Text style={styles.victoryButtonText}>Bumalik</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.victoryButton, styles.summaryButton]}
                  onPress={handleViewSummary}
                >
                  <Text style={styles.victoryButtonText}>Tingnan ang Buod</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // Victory Modal
  const renderVictoryModal = () => {
    if (!showCongratulationsModal) return null;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showCongratulationsModal}
        onRequestClose={onHideCongratulations}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.victoryModal}>
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
                  <Text style={styles.victoryStatLabel}>Huling Iskor</Text>
                  <Text style={styles.victoryStatValue}>{gameStats.score}</Text>
                </View>
                
                <View style={styles.victoryStatCard}>
                  <Text style={styles.victoryStatIcon}>✅</Text>
                  <Text style={styles.victoryStatLabel}>Tamang Nasagot</Text>
                  <Text style={styles.victoryStatValue}>{gameStats.correctAnswers}/{gameStats.totalQuestionsInPool}</Text>
                </View>
                
                <View style={styles.victoryStatCard}>
                  <Text style={styles.victoryStatIcon}>❤️</Text>
                  <Text style={styles.victoryStatLabel}>Natitirang Buhay</Text>
                  <Text style={[styles.victoryStatValue, { color: '#4CAF50' }]}>{gameStats.lives}</Text>
                </View>
              </View>
              
              {/* Victory Buttons */}
              <View style={styles.victoryButtons}>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.victoryButton, styles.playAgainButton]}
                    onPress={onRestart}
                  >
                    <Text style={styles.victoryButtonText}>Subukan Muli</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.victoryButton, styles.backToMenuButton]}
                    onPress={onBackToMenu}
                  >
                    <Text style={styles.victoryButtonText}>Bumalik</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.victoryButton, styles.summaryButton]}
                    onPress={handleViewSummary}
                  >
                    <Text style={styles.victoryButtonText}>Tingnan ang Buod</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <React.Fragment>
      {renderGameOverModal()}
      {renderVictoryModal()}
    </React.Fragment>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  
  // Game over modal styles
  
  // Modal styles
  victoryModal: {
    maxWidth: 350,
    backgroundColor: '#FFF5E6',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  victoryContent: {
    width: '100%',
  },
  victoryHeader: {
    alignItems: 'center',
    marginBottom: 24,
    // backgroundColor: 'red',
  },
  victoryIcon: {
    fontSize: 72,
    marginBottom: 12,
  },
  victoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#573826',
    marginBottom: 8,
    textAlign: 'center',
  },
  victorySubtitle: {
    fontSize: 16,
    color: '#8B4513',
    textAlign: 'center',
    fontWeight: '500',
  },
  victoryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
    gap: 16,
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
  victoryButtons: {
    width: '100%',
    gap: 16,
    // backgroundColor: 'red',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  victoryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    shadowColor: '#573826',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
  summaryButton: {
    backgroundColor: '#2196F3',
    borderWidth: 2,
    borderColor: '#1976D2',
    width: '100%',
  },
  victoryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QuizResult;
