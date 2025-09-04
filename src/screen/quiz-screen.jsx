import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import { useQuizGame } from '../hooks/useQuizGame';
import GameStats from '../components/quiz/GameStats';
import ProgressBar from '../components/quiz/ProgressBar';
import FeedbackModal from '../components/quiz/FeedbackModal';

import LatinToBaybayinMode from '../components/quiz/LatinToBaybayinMode';
import BaybayinToLatinMode from '../components/quiz/BaybayinToLatinMode';

const QuizScreen = ({ navigation, initialMode = null }) => {
  const {
    gameState,
    currentQuestionData,
    userAnswer,
    showFeedback,
    isCorrect,
    showGameOverModal,
    showCongratulationsModal,
    setShowCongratulationsModal,
    gameStats,
    startGame,
    submitAnswer,
    continueToNext,
    restartGame,
    hideGameOverModal,
    hideCongratulationsModal
  } = useQuizGame();



  const handleStartGame = (mode) => {
    startGame(mode);
  };

  // Auto-start with initial mode if provided
  React.useEffect(() => {
    if (initialMode && !gameState.isGameActive) {
      startGame(initialMode);
    }
  }, [initialMode, gameState.isGameActive, startGame]);

  const handleSubmitAnswer = (answer) => {
    submitAnswer(answer);
  };

  // Debug logging to help troubleshoot
  React.useEffect(() => {
    console.log('Game State Debug:', {
      isGameActive: gameState.isGameActive,
      isGameComplete: gameState.isGameComplete,
      isGameOver: gameState.isGameOver,
      showGameOverModal: showGameOverModal,
      showCongratulationsModal: showCongratulationsModal,
      lives: gameStats.lives,
      score: gameStats.score,
      totalQuestions: gameStats.totalQuestions,
      totalQuestionsInPool: gameStats.totalQuestionsInPool,
      currentQuestionData: currentQuestionData ? 'exists' : 'null'
    });
  }, [gameState, gameStats, showGameOverModal, showCongratulationsModal, currentQuestionData]);

  const handleContinue = () => {
    if (gameState.isGameComplete || gameState.isGameOver) {
      // Don't show alert, let the modals handle it
      return;
    } else {
      continueToNext();
    }
  };

  const handleRestart = () => {
    Alert.alert(
      'Ulitin ang laro?',
      'Mawawala ang iyong kasalukuyang progress.',
      [
        { text: 'Hindi', style: 'cancel' },
        { text: 'Oo', onPress: restartGame }
      ]
    );
  };

  const handleBackToSubukan = () => {
    Alert.alert(
      'Bumalik sa Subukan?',
      'Mawawala ang iyong kasalukuyang progress.',
      [
        { text: 'Hindi', style: 'cancel' },
        { text: 'Oo', onPress: () => navigation.goBack() }
      ]
    );
  };

  const renderGameMode = () => {
    try {
      if (gameState.gameMode === 'latin-to-baybayin') {
        return (
          <LatinToBaybayinMode
            questionData={currentQuestionData}
            onSubmitAnswer={handleSubmitAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            userAnswer={userAnswer}
          />
        );
      } else {
        return (
          <BaybayinToLatinMode
            questionData={currentQuestionData}
            onSubmitAnswer={handleSubmitAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            userAnswer={userAnswer}
          />
        );
      }
    } catch (error) {
      console.error('Error rendering game mode:', error);
      return (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={styles.errorText}>Error loading question. Please try again.</Text>
        </View>
      );
    }
  };

  const renderStartScreen = () => (
    <ScrollView style={styles.startContainer}>
      <Text style={styles.title}>Fill-in-the-Baybayin ✍️</Text>
      <Text style={styles.subtitle}>
        Subukan ang inyong kaalaman sa Baybayin!
      </Text>
      
      <View style={styles.modeContainer}>
        <TouchableOpacity
          style={styles.modeButton}
          onPress={() => handleStartGame('latin-to-baybayin')}
        >
          <Text style={styles.modeIcon}>🔤</Text>
          <Text style={styles.modeTitle}>Latin → Baybayin</Text>
          <Text style={styles.modeDescription}>
            Piliin ang tamang Baybayin characters
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.modeButton}
          onPress={() => handleStartGame('baybayin-to-latin')}
        >
          <Text style={styles.modeIcon}>📝</Text>
          <Text style={styles.modeTitle}>Baybayin → Latin</Text>
          <Text style={styles.modeDescription}>
            Piliin ang tamang Latin na salita
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Paano Maglaro:</Text>
        <Text style={styles.instruction}>
          1. Piliin ang mode: Latin → Baybayin o Baybayin → Latin
        </Text>
        <Text style={styles.instruction}>
          2. Sagutin ang mga tanong (walang paulit-ulit)
        </Text>
        <Text style={styles.instruction}>
          3. Makakuha ng 10 points bawat tamang sagot
        </Text>
        <Text style={styles.instruction}>
          4. May 3 buhay - mawawala ang isa sa maling sagot
        </Text>
        <Text style={styles.instruction}>
          5. Matuto ng mga salitang Baybayin!
        </Text>
      </View>

      {/* Test button for debugging - remove after testing */}
      <View style={styles.testContainer}>
        <TouchableOpacity
          style={styles.testButton}
          onPress={() => {
            console.log('Test button pressed from start screen');
            setShowCongratulationsModal(true);
          }}
        >
          <Text style={styles.testButtonText}>🧪 Test Congratulations Modal</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );

  const renderGameScreen = () => {
    try {
      return (
        <View style={styles.gameContainer}>
          <GameStats
            score={gameStats.score}
            lives={gameStats.lives}
          />
          
          <ProgressBar
            current={gameStats.totalQuestions}
            total={gameStats.totalQuestionsInPool}
            label="Mga Tanong"
            showPercentage={false}
          />
          
          <ScrollView style={styles.questionContainer}>
            {renderGameMode()}
          </ScrollView>
          
                <View style={styles.gameControls}>
        <TouchableOpacity
          style={[styles.controlButton, styles.restartButton]}
          onPress={handleRestart}
        >
          <Text style={styles.controlButtonText}>Ulitin</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.controlButton, styles.backToSubukanButton]}
          onPress={handleBackToSubukan}
        >
          <Text style={styles.controlButtonText}>Back to Subukan</Text>
        </TouchableOpacity>
        
        {/* Temporary test button - remove after testing */}
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: '#FF9800' }]}
          onPress={() => {
            console.log('Test button pressed - showing congratulations modal');
            setShowCongratulationsModal(true);
          }}
        >
          <Text style={styles.controlButtonText}>Test Win</Text>
        </TouchableOpacity>
      </View>
        </View>
      );
    } catch (error) {
      console.error('Error rendering game screen:', error);
      return (
        <View style={styles.gameContainer}>
          <Text style={styles.errorText}>Error loading game. Please try again.</Text>
        </View>
      );
    }
  };

  // Fallback if gameState is not properly initialized
  if (!gameState) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.errorText}>Loading game...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!gameState.isGameActive ? renderStartScreen() : renderGameScreen()}
      
      <FeedbackModal
        visible={showFeedback && !gameState.isGameComplete}
        isCorrect={isCorrect}
        message={isCorrect ? 'Magaling!' : 'Subukan ulit!'}
        onContinue={handleContinue}
        onRestart={handleRestart}
        showRestart={false}
      />
      
      {/* Game Over Modal - when user loses all lives */}
      {showGameOverModal && (
        <View style={styles.gameOverModal}>
          <TouchableWithoutFeedback>
            <View style={styles.gameOverContent}>
              <Text style={styles.gameOverIcon}>💔</Text>
              <Text style={styles.gameOverTitle}>Game Over!</Text>
              {/* <Text style={styles.gameOverSubtitle}>Nawala ang lahat ng iyong buhay</Text> */}
              
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
                  onPress={restartGame}
                >
                  <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.gameOverButton, styles.cancelButton]}
                  onPress={() => {
                    hideGameOverModal();
                    navigation.goBack();
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}

      {/* Debug indicator */}
      {showCongratulationsModal && (
        <View style={{ 
          position: 'absolute', 
          top: 100, 
          left: 20, 
          right: 20,
          backgroundColor: 'red', 
          padding: 15, 
          zIndex: 99999,
          borderRadius: 8,
          borderWidth: 3,
          borderColor: 'yellow'
        }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
            🚨 CONGRATULATIONS MODAL SHOULD BE VISIBLE 🚨
          </Text>
        </View>
      )}

      {/* Simple test modal */}
      {showCongratulationsModal && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 0, 0, 0.9)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
        }}>
          <View style={{
            backgroundColor: 'white',
            padding: 30,
            borderRadius: 10,
            margin: 20,
          }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'red', textAlign: 'center' }}>
              TEST MODAL WORKS!
            </Text>
            <Text style={{ fontSize: 16, color: 'black', textAlign: 'center', marginTop: 10 }}>
              If you can see this, the modal system works
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
              }}
              onPress={() => {
                console.log('Closing test modal');
                setShowCongratulationsModal(false);
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                Close Test Modal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Congratulatory Modal - when user completes game successfully */}
      {showCongratulationsModal && (
        <View style={styles.congratulationsModal}>
          <TouchableWithoutFeedback>
            <View style={styles.congratulationsContent}>
            <Text style={styles.congratulationsIcon}>🎉</Text>
            <Text style={styles.congratulationsTitle}>Congratulations!</Text>
            <Text style={styles.congratulationsSubtitle}>Tapos na ang laro!</Text>
            
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
                <Text style={[styles.statValue, { color: '#4CAF50' }]}>{gameStats.lives}</Text>
              </View>
            </View>
            
            <View style={styles.congratulationsButtons}>
              <TouchableOpacity
                style={[styles.congratulationsButton, styles.tryAgainButton]}
                onPress={restartGame}
              >
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.congratulationsButton, styles.cancelButton]}
                onPress={() => {
                  hideCongratulationsModal();
                  navigation.goBack();
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
      

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  startContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
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
  modeContainer: {
    marginBottom: 30,
  },
  modeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
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

  gameContainer: {
    flex: 1,
  },
  questionContainer: {
    flex: 1,
  },
  gameControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  controlButton: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  restartButton: {
    backgroundColor: '#4CAF50',
  },
  backToSubukanButton: {
    backgroundColor: '#757575',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },

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
  congratulationsModal: {
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
  congratulationsContent: {
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
  congratulationsIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  congratulationsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
    textAlign: 'center',
  },
  congratulationsSubtitle: {
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

  congratulationsButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  congratulationsButton: {
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
  errorText: {
    color: '#F44336',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  testContainer: {
    padding: 16,
    marginTop: 10,
  },
  testButton: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    padding: 16,
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
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuizScreen;
