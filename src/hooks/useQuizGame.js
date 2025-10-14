import { useState, useEffect, useCallback } from "react";
import { quizData, gameConfig, getAllWords } from "../data/quiz-data";
import { lessonModules } from "../data/lesson-data";
import { saveQuizResult, getQuizResults } from "../data/quiz-results";

export const useQuizGame = () => {
  // Game state
  const [gameState, setGameState] = useState({
    currentQuestion: 0,
    score: 0,
    lives: gameConfig.lives.maxLives,
    totalQuestions: 0,
    correctAnswers: 0,
    gameMode: "latin-to-baybayin", // 'latin-to-baybayin' or 'baybayin-to-latin'
    lessonId: null,
    isGameActive: false,
    isGameComplete: false,
    isGameOver: false, // New state for when user loses all lives
    startTime: null,
    endTime: null,
  });

  // Question pool for current game
  const [questionPool, setQuestionPool] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Current question data
  const [currentQuestionData, setCurrentQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);

  // State for saved quiz results
  const [savedQuizResults, setSavedQuizResults] = useState([]);

  // Load saved quiz results on mount
  useEffect(() => {
    const loadResults = async () => {
      try {
        const results = await getQuizResults();
        setSavedQuizResults(results);
      } catch (error) {
        console.error("Failed to load quiz results:", error);
      }
    };

    loadResults();
  }, []);

  // This effect will run when the game is marked as complete
  useEffect(() => {
    if (gameState.isGameComplete) {
      if (gameState.isGameOver) {
        setShowGameOverModal(true);
      } else {
        setShowCongratulationsModal(true);
      }

      // Refresh saved results after game completion
      const refreshResults = async () => {
        try {
          const results = await getQuizResults();
          setSavedQuizResults(results);
        } catch (error) {
          console.error("Failed to refresh quiz results:", error);
        }
      };
      refreshResults();
    }
  }, [gameState.isGameComplete, gameState.isGameOver]);

  const createQuestionPool = useCallback((lessonId) => {
    // If we have a lesson ID, filter words from that lesson in quizData
    if (lessonId && quizData[lessonId]) {
      const lessonQuestions = quizData[lessonId];
      // Shuffle and return the questions for this lesson
      return [...lessonQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, gameConfig.questions.questionsPerLesson);
    }

    // If no specific lesson or lesson not found, use all words as fallback
    const allWords = getAllWords();
    return [...allWords]
      .sort(() => Math.random() - 0.5)
      .slice(0, gameConfig.questions.questionsPerLesson);
  }, []);

  // Get current question from pool
  const getCurrentQuestion = useCallback(() => {
    if (questionPool.length > 0 && currentQuestionIndex < questionPool.length) {
      return questionPool[currentQuestionIndex];
    }
    return null;
  }, [questionPool, currentQuestionIndex]);

  // Start new game
  const startGame = useCallback(
    (mode = "latin-to-baybayin", lessonId) => {
      const newGameState = {
        currentQuestion: 0,
        score: 0,
        lives: gameConfig.lives.maxLives,
        totalQuestions: 0,
        correctAnswers: 0,
        gameMode: mode,
        lessonId: lessonId,
        isGameActive: true,
        isGameComplete: false,
        isGameOver: false,
        startTime: Date.now(),
        endTime: null,
      };

      setGameState(newGameState);

      const pool = createQuestionPool(lessonId);
      setQuestionPool(pool);
      setCurrentQuestionIndex(0);

      if (pool.length > 0) {
        setCurrentQuestionData(pool[0]);
        setUserAnswer("");
        setShowFeedback(false);
        setIsCorrect(false);
        setShowGameOverModal(false);
        setShowCongratulationsModal(false);
      }
    },
    [createQuestionPool]
  );

  // Load next question
  const loadNextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questionPool.length) {
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestionData(questionPool[nextIndex]);
      setUserAnswer("");
      setShowFeedback(false);
      setIsCorrect(false);
    }
  }, [currentQuestionIndex, questionPool]);

  // Submit answer
  const submitAnswer = useCallback(
    (answer) => {
      if (!currentQuestionData || showFeedback) return;

      const isAnswerCorrect = checkAnswer(answer);
      setUserAnswer(answer);
      setIsCorrect(isAnswerCorrect);
      setShowFeedback(true);

      // Update game state
      setGameState((prev) => {
        const newState = { ...prev };

        // Update score and lives
        if (isAnswerCorrect) {
          const points = gameConfig.scoring.correctAnswer;
          newState.score += points;
          newState.correctAnswers += 1;
        } else {
          if (gameConfig.lives.loseLifeOnWrong) {
            newState.lives = Math.max(0, newState.lives - 1); // Ensure lives don't go below 0
          }
        }

        newState.totalQuestions += 1;

        // Debug logging
        console.log("Game completion check:", {
          totalQuestions: newState.totalQuestions,
          totalQuestionsInPool: gameConfig.questions.totalQuestions,
          lives: newState.lives,
          isCorrect: isAnswerCorrect,
        });

        // Check if game is over due to no lives left
        if (newState.lives <= 0) {
          console.log("Game Over - No lives left");
          newState.isGameActive = false;
          newState.isGameComplete = true;
          newState.isGameOver = true;
          newState.endTime = Date.now();

          // Save the result
          saveQuizResult({
            lessonId: newState.lessonId,
            score: newState.score,
            correctAnswers: newState.correctAnswers,
            totalQuestions: gameConfig.questions.questionsPerLesson,
            lives: newState.lives,
          });

          // Force state update before showing modal
          setGameState((prev) => ({ ...prev, ...newState }));
        }
        // Check if game is complete - all questions answered with lives remaining
        else if (
          currentQuestionIndex >= questionPool.length - 1
        ) {
          console.log(
            "Game Complete - All questions answered with lives remaining"
          );
          newState.isGameActive = false;
          newState.isGameComplete = true;
          newState.isGameOver = false;
          newState.endTime = Date.now();

          // Save the result
          saveQuizResult({
            lessonId: newState.lessonId,
            score: newState.score,
            correctAnswers: newState.correctAnswers,
            totalQuestions: gameConfig.questions.questionsPerLesson,
            lives: newState.lives,
          });
        }

        return newState;
      });
    },
    [currentQuestionData, showFeedback, questionPool]
  );

  // Check if answer is correct
  const checkAnswer = useCallback(
    (answer) => {
      if (!currentQuestionData) return false;

      // For Latin to Baybayin mode
      if (gameState.gameMode === "latin-to-baybayin") {
        // Normalize both strings for comparison (remove diacritics and make lowercase)
        const normalize = (str) =>
          str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
        return normalize(answer) === normalize(currentQuestionData.baybayin);
      }
      // For Baybayin to Latin mode
      else if (gameState.gameMode === "baybayin-to-latin") {
        return answer.toLowerCase() === currentQuestionData.latin.toLowerCase();
      }

      return false;
    },
    [currentQuestionData, gameState.gameMode]
  );

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
    startGame(gameState.gameMode, gameState.lessonId);
  }, [startGame, gameState.gameMode, gameState.lessonId]);

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
    totalQuestionsInPool: gameConfig.questions.totalQuestions,
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
    savedQuizResults,
    startGame,
    submitAnswer,
    continueToNext,
    restartGame,
    loadNextQuestion,
    hideGameOverModal,
    hideCongratulationsModal,
  };
};
