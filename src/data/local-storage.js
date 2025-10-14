import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  QUIZ_RESULTS: 'quiz_results',
  USER_PREFERENCES: 'user_preferences',
};

/**
 * Generic function to save data to AsyncStorage
 * @param {string} key - The storage key
 * @param {any} value - The data to save (will be JSON.stringified)
 * @returns {Promise<void>}
 */
const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving data for key '${key}':`, error);
    throw error;
  }
};

/**
 * Generic function to load data from AsyncStorage
 * @param {string} key - The storage key
 * @param {any} defaultValue - Default value to return if key not found
 * @returns {Promise<any>} The parsed data or default value
 */
const loadData = async (key, defaultValue = null) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
  } catch (error) {
    console.error(`Error loading data for key '${key}':`, error);
    return defaultValue;
  }
};

/**
 * Generic function to remove data from AsyncStorage
 * @param {string} key - The storage key
 * @returns {Promise<void>}
 */
const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data for key '${key}':`, error);
    throw error;
  }
};

/**
 * Quiz Results specific functions
 */
export const saveQuizResults = async (results) => {
  return saveData(STORAGE_KEYS.QUIZ_RESULTS, results);
};

export const loadQuizResults = async () => {
  return loadData(STORAGE_KEYS.QUIZ_RESULTS, []);
};

export const clearQuizResults = async () => {
  return removeData(STORAGE_KEYS.QUIZ_RESULTS);
};

/**
 * User Preferences specific functions
 */
export const saveUserPreferences = async (preferences) => {
  return saveData(STORAGE_KEYS.USER_PREFERENCES, preferences);
};

export const loadUserPreferences = async () => {
  return loadData(STORAGE_KEYS.USER_PREFERENCES, {});
};

/**
 * Utility functions
 */
export const clearAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};

export const getStorageInfo = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = {};
    for (const key of keys) {
      const value = await AsyncStorage.getItem(key);
      result[key] = value ? JSON.parse(value) : null;
    }
    return result;
  } catch (error) {
    console.error('Error getting storage info:', error);
    return null;
  }
};

export { STORAGE_KEYS };