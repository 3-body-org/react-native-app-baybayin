import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert
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
    gameStats,
    startGame,
    submitAnswer,
    continueToNext,
    restartGame
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

  const handleContinue = () => {
    if (gameState.isGameComplete) {
      // Don't show alert, let the congratulatory modal handle it
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

  const renderGameMode = () => {
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
          5. Makakakita ng iba't ibang difficulty levels!
        </Text>
      </View>

    </ScrollView>
  );

  const renderGameScreen = () => (
    <View style={styles.gameContainer}>
      <GameStats
        score={gameStats.score}
        lives={gameStats.lives}
        currentQuestionData={currentQuestionData}
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
          style={styles.controlButton}
          onPress={handleRestart}
        >
          <Text style={styles.controlButtonText}>Ulitin</Text>
        </TouchableOpacity>
        

      </View>
    </View>
  );

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
      
      {/* Congratulatory Modal */}
      {gameState.isGameComplete && (
        <View style={styles.congratulationsModal}>
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
            </View>
            

            
            <View style={styles.congratulationsButtons}>
              <TouchableOpacity
                style={[styles.congratulationsButton, styles.tryAgainButton]}
                onPress={restartGame}
              >
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.congratulationsButton, styles.backButton]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Back to Subukan</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  controlButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  congratulationsModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
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
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  tryAgainButton: {
    backgroundColor: '#4CAF50',
  },
  backButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuizScreen;
