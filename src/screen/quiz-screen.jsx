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
import GameStats from '../components/quiz/game-stats';
import ProgressBar from '../components/quiz/progress-bar';
import FeedbackModal from '../components/quiz/feedback-modal';

import LatinToBaybayinMode from '../components/quiz/latin-to-baybayin-mode';
import BaybayinToLatinMode from '../components/quiz/baybayin-to-latin-mode';

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



      {/* Victory Modal - when user completes game successfully */}
      {showCongratulationsModal && (
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
                  onPress={restartGame}
                >
                  <Text style={styles.victoryButtonText}>Ulitin</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.victoryButton, styles.backToMenuButton]}
                  onPress={() => {
                    hideCongratulationsModal();
                    navigation.goBack();
                  }}
                >
                  <Text style={styles.victoryButtonText}>Bumalik</Text>
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
