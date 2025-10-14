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
import { gameConfig } from '@data/quiz-data';
import GameStats from '@components/quiz/game-stats';
import ProgressBar from '@components/quiz/progress-bar';
import QuizResult from '@components/quiz/quiz-result';
import BaybayinToLatinMode from '@components/quiz/baybayin-to-latin-mode';
import LatinToBaybayinMode from '@components/quiz/latin-to-baybayin-mode';


const QuizScreen = () => {
  const router = useRouter();
  const { mode = 'latin-to-baybayin', lessonId } = useLocalSearchParams();
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

  // Auto-start the game when the component mounts
  useEffect(() => {
    if (!gameState.isGameActive && !gameState.isGameComplete) {
      startGame(mode, lessonId);
    }
  }, [mode, lessonId, gameState.isGameActive, gameState.isGameComplete, startGame]);

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
    continueToNext();
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
            key={currentQuestionData?.latin || 'question'}
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

  const renderGameScreen = () => {
    // If the game is not active and not complete, it's in a loading state.
    if (!gameState.isGameActive && !gameState.isGameComplete) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading Quiz...</Text>
        </View>
      );
    }

    // If the game is complete, show nothing (modal will be visible)
    if (gameState.isGameComplete) {
      return null;
    }

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
              total={gameConfig.questions.questionsPerLesson}
              label="Mga Tanong"
              showPercentage={false}
            />
            
            <View style={styles.quizContent}>
              <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
                {renderGameMode()}
              </ScrollView>
              
              {showFeedback && (
                <TouchableOpacity
                  style={[styles.continueButton, isCorrect ? styles.continueButtonCorrect : styles.continueButtonIncorrect]}
                  onPress={handleContinue}
                >
                  <Text style={styles.continueButtonText}>SUSUNOD</Text>
                </TouchableOpacity>
              )}
            </View>
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
      {renderGameScreen()}
      
      {/* Quiz Result Modals */}
      <QuizResult
        showGameOverModal={showGameOverModal}
        showCongratulationsModal={showCongratulationsModal}
        gameState={gameState}
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
    // backgroundColor: 'yellow', // test
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
    // padding: 15,
    paddingHorizontal: 20,
    // backgroundColor: 'yellow', // test
  },

  gameContainer: {
    flex: 1,
    // backgroundColor: 'green', // test
  },
  quizContent: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    // backgroundColor: 'blue', //test
  },
  questionContainer: {
    flex: 1,
    width: '100%',
    // backgroundColor: "red", // test
  },
  errorText: {
    color: '#F44336',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  continueButton: {
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  continueButtonCorrect: {
    backgroundColor: '#4CAF50',
  },
  continueButtonIncorrect: {
    backgroundColor: '#F44336',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;
