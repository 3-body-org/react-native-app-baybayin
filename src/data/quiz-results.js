// This file manages the storage of quiz results using local storage.

import { saveQuizResults as saveToStorage, loadQuizResults as loadFromStorage, clearQuizResults as clearFromStorage } from './local-storage';

// Cache for loaded quiz results
let quizResultsCache = null;

/**
 * Saves a quiz result to local storage.
 * The result is added to the beginning of the array.
 * @param {object} result - The quiz result object to save.
 *                         Expected format: { lessonId, score, correctAnswers, totalQuestions, lives, date }
 * @returns {Promise<void>}
 */
export const saveQuizResult = async (result) => {
  if (!result || typeof result !== 'object') {
    console.error("Invalid quiz result format provided.");
    return;
  }

  try {
    // Load existing results
    const existingResults = await getQuizResults();

    // Add timestamp to the result if not already present
    const resultWithDate = result.date
      ? result
      : { ...result, date: new Date().toISOString() };

    // Add new result to the beginning of the array
    const updatedResults = [resultWithDate, ...existingResults];

    // Save to storage and update cache
    await saveToStorage(updatedResults);
    quizResultsCache = updatedResults;

    console.log("Quiz result saved successfully");
  } catch (error) {
    console.error("Error saving quiz result:", error);
  }
};

/**
 * Retrieves all the saved quiz results from local storage.
 * Uses caching to avoid unnecessary storage reads.
 * @returns {Promise<array>} An array of quiz result objects.
 */
export const getQuizResults = async () => {
  try {
    // Return cached results if available
    if (quizResultsCache !== null) {
      return [...quizResultsCache];
    }

    // Load from storage and cache the result
    const results = await loadFromStorage();
    quizResultsCache = results;
    return [...results];
  } catch (error) {
    console.error("Error loading quiz results:", error);
    return [];
  }
};

/**
 * Clears all the saved quiz results from local storage.
 * Useful for testing or resetting progress.
 * @returns {Promise<void>}
 */
export const clearQuizResults = async () => {
  try {
    await clearFromStorage();
    quizResultsCache = []; // Reset cache to empty array
    console.log("All quiz results cleared");
  } catch (error) {
    console.error("Error clearing quiz results:", error);
  }
};

/**
 * Forces a reload of quiz results from storage, bypassing the cache.
 * Useful when you need to ensure fresh data.
 * @returns {Promise<array>} Fresh quiz results from storage.
 */
export const reloadQuizResults = async () => {
  quizResultsCache = null; // Clear cache
  return getQuizResults();
};

// Test function to verify local storage functionality
export const testLocalStorage = async () => {
  console.log("Testing local storage functionality...");

  try {
    // Clear existing results
    await clearQuizResults();

    // Create test result
    const testResult = {
      lessonId: "test-lesson",
      score: 100,
      correctAnswers: 10,
      totalQuestions: 10,
      lives: 3,
      date: new Date().toISOString()
    };

    // Save test result
    await saveQuizResult(testResult);
    console.log("Test result saved");

    // Load and verify
    const results = await getQuizResults();
    console.log("Loaded results:", results);

    if (results.length === 1 && results[0].score === 100) {
      console.log("✅ Local storage test passed!");
      return true;
    } else {
      console.log("❌ Local storage test failed!");
      return false;
    }
  } catch (error) {
    console.error("❌ Local storage test error:", error);
    return false;
  }
};