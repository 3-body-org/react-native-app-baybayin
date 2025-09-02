import { useState, useEffect, useCallback } from 'react';
import { quizData, gameConfig, achievements } from '../data/quiz-data';

export const useQuizGame = () => {
  // Game state
  const [gameState, setGameState] = useState({
    currentLevel: 1,
    currentQuestion: 0,
    score: 0,
    lives: gameConfig.lives.maxLives,
    streak: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    gameMode: 'latin-to-baybayin', // 'latin-to-baybayin' or 'baybayin-to-latin'
    isGameActive: false,
    isGameComplete: false,
    timeRemaining: gameConfig.timer.defaultTime,
    startTime: null,
    endTime: null
  });

  // Current question data
  const [currentQuestionData, setCurrentQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

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
      streak: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      gameMode: mode,
      isGameActive: true,
      isGameComplete: false,
      timeRemaining: gameConfig.timer.defaultTime,
      startTime: Date.now(),
      endTime: null
    };
    
    setGameState(newGameState);
    setUnlockedAchievements([]);
    loadNextQuestion();
  }, []);

  // Load next question
  const loadNextQuestion = useCallback(() => {
    const questionData = getRandomQuestion();
    setCurrentQuestionData(questionData);
    setUserAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
    
    // Reset timer
    if (gameConfig.timer.enabled) {
      setGameState(prev => ({
        ...prev,
        timeRemaining: gameConfig.timer.defaultTime
      }));
    }
  }, [getRandomQuestion]);

  // Submit answer
  const submitAnswer = useCallback((answer) => {
    if (!currentQuestionData || showFeedback) return;

    const isAnswerCorrect = checkAnswer(answer);
    const answerTime = gameConfig.timer.defaultTime - gameState.timeRemaining;
    
    setUserAnswer(answer);
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    // Update game state
    setGameState(prev => {
      const newState = { ...prev };
      
      if (isAnswerCorrect) {
        // Calculate score
        let points = gameConfig.scoring.correctAnswer;
        
        // Time bonus
        if (gameConfig.timer.enabled && answerTime <= gameConfig.timer.bonusThreshold) {
          points += gameConfig.scoring.bonusTime;
        }
        
        // Streak bonus
        if (newState.streak > 0) {
          points += gameConfig.scoring.streakBonus * newState.streak;
        }
        
        newState.score += points;
        newState.streak += 1;
        newState.correctAnswers += 1;
      } else {
        newState.streak = 0;
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

    // Check achievements
    checkAchievements(isAnswerCorrect, answerTime);
  }, [currentQuestionData, showFeedback, gameState.timeRemaining]);

  // Check if answer is correct
  const checkAnswer = useCallback((answer) => {
    if (!currentQuestionData) return false;
    
    if (gameState.gameMode === 'latin-to-baybayin') {
      return answer === currentQuestionData.baybayin;
    } else {
      return answer === currentQuestionData.latin;
    }
  }, [currentQuestionData, gameState.gameMode]);

  // Check achievements
  const checkAchievements = useCallback((isCorrect, answerTime) => {
    const newAchievements = [];
    
    // Baybayin Beginner
    if (isCorrect && gameState.correctAnswers === 0) {
      newAchievements.push(achievements['baybayin-beginner']);
    }
    
    // Speed Demon
    if (isCorrect && answerTime <= 10 && gameState.streak >= 5) {
      newAchievements.push(achievements['speed-demon']);
    }
    
    // Translation Master
    if (gameState.correctAnswers >= 10 && 
        (gameState.correctAnswers / gameState.totalQuestions) === 1) {
      newAchievements.push(achievements['translation-master']);
    }
    
    // Level Master
    if (gameState.currentLevel >= gameConfig.levels.maxLevel) {
      newAchievements.push(achievements['level-master']);
    }
    
    if (newAchievements.length > 0) {
      setUnlockedAchievements(prev => {
        // Filter out achievements that are already unlocked
        const existingIds = prev.map(achievement => achievement.id);
        const uniqueNewAchievements = newAchievements.filter(
          achievement => !existingIds.includes(achievement.id)
        );
        return [...prev, ...uniqueNewAchievements];
      });
    }
  }, [gameState.correctAnswers, gameState.totalQuestions, gameState.streak, gameState.currentLevel]);

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

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (gameState.isGameActive && gameConfig.timer.enabled && gameState.timeRemaining > 0) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (gameState.timeRemaining === 0 && gameState.isGameActive) {
      // Time's up - submit empty answer
      submitAnswer('');
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameState.isGameActive, gameState.timeRemaining, submitAnswer]);

  // Calculate accuracy
  const accuracy = gameState.totalQuestions > 0 
    ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100) 
    : 0;

  // Get game statistics
  const gameStats = {
    score: gameState.score,
    lives: gameState.lives,
    streak: gameState.streak,
    accuracy,
    currentLevel: gameState.currentLevel,
    totalQuestions: gameState.totalQuestions,
    correctAnswers: gameState.correctAnswers,
    timeRemaining: gameState.timeRemaining,
    unlockedAchievements
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
