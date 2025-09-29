import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuizGame } from '@hooks/useQuizGame';
import GameStats from '@components/quiz/game-stats';
import ProgressBar from '@components/quiz/progress-bar';
import FeedbackModal from '@components/quiz/feedback-modal';
import QuizResult from '@components/quiz/quiz-result';
import BaybayinToLatinMode from '@components/quiz/baybayin-to-latin-mode';
import LatinToBaybayinMode from '@components/quiz/latin-to-baybayin-mode';


const QuizScreen = () => {
  const router = useRouter();
  const { mode, lessonId } = useLocalSearchParams();
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
    startGame(mode, lessonId);
  };

  // Auto-start with initial mode if provided
  useEffect(() => {
    if (mode && !gameState.isGameActive) {
      startGame(mode, lessonId);
    }
  }, [mode, lessonId, gameState.isGameActive, startGame]);

  const handleSubmitAnswer = (answer) => {
    submitAnswer(answer);
  };

  // Debug logging to help troubleshoot
  useEffect(() => {
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
        { text: 'Oo', onPress: () => router.back() }
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
          <View style={styles.contentContainer}>
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
            
            <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
              {renderGameMode()}
            </ScrollView>
          </View>
          
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
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.errorText}>Loading game...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!gameState.isGameActive ? renderStartScreen() : renderGameScreen()}
      
      <FeedbackModal
        visible={showFeedback && !gameState.isGameComplete}
        isCorrect={isCorrect}
        message={isCorrect ? 'Magaling!' : 'Subukan ulit!'}
        onContinue={handleContinue}
        onRestart={handleRestart}
        showRestart={false}
      />
      
      {/* Quiz Result Modals */}
      <QuizResult
        showGameOverModal={showGameOverModal}
        showCongratulationsModal={showCongratulationsModal}
        gameStats={gameStats}
        onRestart={restartGame}
        onBackToMenu={() => router.back()}
        onHideGameOver={hideGameOverModal}
        onHideCongratulations={hideCongratulationsModal}
      />
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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

  contentContainer: {
    flex: 1,
    padding: 15,
  },

  gameContainer: {
    flex: 1,
  },
  questionContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  gameControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,

    // backgroundColor: 'blue',
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
