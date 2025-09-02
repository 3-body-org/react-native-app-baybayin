import { useState, useEffect, useCallback } from 'react';
import { quizData, gameConfig } from '../data/quiz-data';

export const useQuizGame = () => {
  // Game state
  const [gameState, setGameState] = useState({
    currentLevel: 1,
    currentQuestion: 0,
    score: 0,
    lives: gameConfig.lives.maxLives,
    totalQuestions: 0,
    correctAnswers: 0,
    gameMode: 'latin-to-baybayin', // 'latin-to-baybayin' or 'baybayin-to-latin'
    isGameActive: false,
    isGameComplete: false,
    startTime: null,
    endTime: null
  });

  // Current question data
  const [currentQuestionData, setCurrentQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);


  // Get current level data
  const getCurrentLevelData = useCallback(() => {
    const levelKey = `level${gameState.currentLevel}`;
    return quizData[levelKey] || quizData.level1;
  }, [gameState.currentLevel]);

  // Get random question from current level
  const getRandomQuestion = useCallback(() => {
    const levelData = getCurrentLevelData();
    const availableWords = levelData.words;
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    return availableWords[randomIndex];
  }, [getCurrentLevelData]);

  // Start new game
  const startGame = useCallback((mode = 'latin-to-baybayin') => {
    const newGameState = {
      currentLevel: 1,
      currentQuestion: 0,
      score: 0,
      lives: gameConfig.lives.maxLives,
      totalQuestions: 0,
      correctAnswers: 0,
      gameMode: mode,
      isGameActive: true,
      isGameComplete: false,
      startTime: Date.now(),
      endTime: null
    };
    
    setGameState(newGameState);
    loadNextQuestion();
  }, []);

  // Load next question
  const loadNextQuestion = useCallback(() => {
    const questionData = getRandomQuestion();
    setCurrentQuestionData(questionData);
    setUserAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
  }, [getRandomQuestion]);

  // Submit answer
  const submitAnswer = useCallback((answer) => {
    if (!currentQuestionData || showFeedback) return;

    const isAnswerCorrect = checkAnswer(answer);
    
    setUserAnswer(answer);
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    // Update game state
    setGameState(prev => {
      const newState = { ...prev };
      
      if (isAnswerCorrect) {
        // Calculate score
        let points = gameConfig.scoring.correctAnswer;
        
        newState.score += points;
        newState.correctAnswers += 1;
      } else {
        if (gameConfig.lives.loseLifeOnWrong) {
          newState.lives -= 1;
        }
      }
      
      newState.totalQuestions += 1;
      
      // Check if level should be unlocked
      if (newState.correctAnswers >= gameConfig.levels.unlockThreshold && 
          newState.currentLevel < gameConfig.levels.maxLevel) {
        newState.currentLevel += 1;
      }
      
      // Check if game is complete
      if (newState.lives <= 0 || newState.totalQuestions >= 10) {
        newState.isGameActive = false;
        newState.isGameComplete = true;
        newState.endTime = Date.now();
      }
      
      return newState;
    });

  }, [currentQuestionData, showFeedback]);

  // Check if answer is correct
  const checkAnswer = useCallback((answer) => {
    if (!currentQuestionData) return false;
    
    if (gameState.gameMode === 'latin-to-baybayin') {
      return answer === currentQuestionData.baybayin;
    } else {
      return answer === currentQuestionData.latin;
    }
  }, [currentQuestionData, gameState.gameMode]);



  // Continue to next question
  const continueToNext = useCallback(() => {
    if (gameState.isGameActive && !gameState.isGameComplete) {
      loadNextQuestion();
    }
  }, [gameState.isGameActive, gameState.isGameComplete, loadNextQuestion]);

  // Restart game
  const restartGame = useCallback(() => {
    startGame(gameState.gameMode);
  }, [startGame, gameState.gameMode]);



  // Get game statistics
  const gameStats = {
    score: gameState.score,
    lives: gameState.lives,
    currentLevel: gameState.currentLevel,
    totalQuestions: gameState.totalQuestions,
    correctAnswers: gameState.correctAnswers
  };

  return {
    gameState,
    currentQuestionData,
    userAnswer,
    showFeedback,
    isCorrect,
    gameStats,
    startGame,
    submitAnswer,
    continueToNext,
    restartGame,
    loadNextQuestion
  };
};
