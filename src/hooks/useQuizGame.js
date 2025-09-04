import { useState, useEffect, useCallback } from 'react';
import { quizData, gameConfig } from '../data/quiz-data';

export const useQuizGame = () => {
  // Game state
  const [gameState, setGameState] = useState({
    currentQuestion: 0,
    score: 0,
    lives: gameConfig.lives.maxLives,
    totalQuestions: 0,
    correctAnswers: 0,
    gameMode: 'latin-to-baybayin', // 'latin-to-baybayin' or 'baybayin-to-latin'
    isGameActive: false,
    isGameComplete: false,
    isGameOver: false, // New state for when user loses all lives
    startTime: null,
    endTime: null
  });

  // Question pool for current game
  const [questionPool, setQuestionPool] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Current question data
  const [currentQuestionData, setCurrentQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);


  // Create shuffled question pool for the game
  const createQuestionPool = useCallback(() => {
    const availableWords = quizData.words;
    
    // Always create exactly 10 questions
    const shuffledWords = [...availableWords].sort(() => Math.random() - 0.5);
    
    return shuffledWords.slice(0, gameConfig.questions.totalQuestions);
  }, []);

  // Get current question from pool
  const getCurrentQuestion = useCallback(() => {
    if (questionPool.length > 0 && currentQuestionIndex < questionPool.length) {
      return questionPool[currentQuestionIndex];
    }
    return null;
  }, [questionPool, currentQuestionIndex]);

  // Start new game
  const startGame = useCallback((mode = 'latin-to-baybayin') => {
    const newGameState = {
      currentQuestion: 0,
      score: 0,
      lives: gameConfig.lives.maxLives,
      totalQuestions: 0,
      correctAnswers: 0,
      gameMode: mode,
      isGameActive: true,
      isGameComplete: false,
      isGameOver: false,
      startTime: Date.now(),
      endTime: null
    };
    
    setGameState(newGameState);
    
    // Create shuffled question pool
    const pool = createQuestionPool();
    setQuestionPool(pool);
    setCurrentQuestionIndex(0);
    
    // Load first question
    if (pool.length > 0) {
      setCurrentQuestionData(pool[0]);
      setUserAnswer('');
      setShowFeedback(false);
      setIsCorrect(false);
      setShowGameOverModal(false);
      setShowCongratulationsModal(false);
    }
  }, [createQuestionPool]);

  // Load next question
  const loadNextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < questionPool.length) {
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestionData(questionPool[nextIndex]);
      setUserAnswer('');
      setShowFeedback(false);
      setIsCorrect(false);
    }
  }, [currentQuestionIndex, questionPool]);

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
      
      // Debug logging
      console.log('Game completion check:', {
        totalQuestions: newState.totalQuestions,
        totalQuestionsInPool: gameConfig.questions.totalQuestions,
        lives: newState.lives,
        isCorrect: isAnswerCorrect
      });
      
      // Check if game is complete
      if (newState.lives <= 0) {
        // Game Over - user lost all lives
        console.log('Game Over triggered - no lives left');
        newState.isGameActive = false;
        newState.isGameComplete = true;
        newState.isGameOver = true;
        newState.endTime = Date.now();
        
        // Show Game Over modal after a short delay
        setTimeout(() => {
          setShowGameOverModal(true);
        }, 1000);
      } else if (newState.totalQuestions >= gameConfig.questions.totalQuestions) {
        // Game Complete - user finished all questions successfully
        console.log('Game Complete triggered - all questions answered');
        newState.isGameActive = false;
        newState.isGameComplete = true;
        newState.isGameOver = false;
        newState.endTime = Date.now();
        
        // Show Congratulations modal after a short delay
        setTimeout(() => {
          console.log('Setting congratulations modal to true');
          setShowCongratulationsModal(true);
        }, 1000);
      }
      
      return newState;
    });

  }, [currentQuestionData, showFeedback, questionPool]);

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
    setShowGameOverModal(false);
    setShowCongratulationsModal(false);
    startGame(gameState.gameMode);
  }, [startGame, gameState.gameMode]);

  // Hide Game Over modal
  const hideGameOverModal = useCallback(() => {
    setShowGameOverModal(false);
  }, []);

  // Hide Congratulations modal
  const hideCongratulationsModal = useCallback(() => {
    setShowCongratulationsModal(false);
  }, []);



  // Get game statistics
  const gameStats = {
    score: gameState.score,
    lives: gameState.lives,
    totalQuestions: gameState.totalQuestions,
    correctAnswers: gameState.correctAnswers,
    totalQuestionsInPool: gameConfig.questions.totalQuestions
  };

  return {
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
    loadNextQuestion,
    hideGameOverModal,
    hideCongratulationsModal
  };
};
