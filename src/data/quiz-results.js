// This file will store the results of the quizzes taken by the user.

let quizResults = [];

/**
 * Saves a quiz result to the quizResults array.
 * The result is added to the beginning of the array.
 * @param {object} result - The quiz result object to save.
 *                         Expected format: { lessonId, score, correctAnswers, totalQuestions, lives, date }
 */
export const saveQuizResult = (result) => {
  if (!result || typeof result !== 'object') {
    console.error("Invalid quiz result format provided.");
    return;
  }
  // Add a timestamp to the result
  const resultWithDate = { ...result, date: new Date().toISOString() };
  quizResults.unshift(resultWithDate);
};

/**
 * Retrieves all the saved quiz results.
 * @returns {array} An array of quiz result objects.
 */
export const getQuizResults = () => {
  return [...quizResults];
};

/**
 * Clears all the saved quiz results.
 * Useful for testing or resetting progress.
 */
export const clearQuizResults = () => {
  quizResults = [];
};