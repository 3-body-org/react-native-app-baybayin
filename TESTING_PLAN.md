# Baybayin App Testing Plan

**Project Title:** Baybayin Learning App  
**Date:** October 14, 2025  
**Test Categories:** Valid Data, Invalid Data, Boundary Values  

---

## A. Prepare Input Data Sets Needed for Executing Test Cases

### 1. Valid Data (Expected Inputs)

These test cases verify that the application behaves correctly with expected user interactions and data structures.

#### Test Case 1: Complete Quiz with Perfect Score
- **Description:** User completes an entire quiz correctly in Latin-to-Baybayin mode
- **Preconditions:** App is installed and functional
- **Test Steps:**
  1. Navigate to "Subukan" (Quiz) tab
  2. Select "Latin to Baybayin" mode
  3. Choose any lesson (e.g., "patinig")
  4. Answer all 10 questions correctly
- **Expected Results:**
  - Score: 100 (10 questions × 10 points each)
  - Accuracy: 100%
  - All lives remain (3/3)
  - Success modal displays
  - Results saved to local storage
  - Navigation to summary screen shows correct statistics

#### Test Case 2: Baybayin-to-Latin Mode Completion
- **Description:** User completes quiz in Baybayin-to-Latin mode
- **Preconditions:** App functional, quiz data loaded
- **Test Steps:**
  1. Select "Baybayin to Latin" mode
  2. Choose "katinig" lesson
  3. Answer 7 out of 10 questions correctly
- **Expected Results:**
  - Score: 70 (7 × 10 points)
  - Accuracy: 70%
  - Lives: 3 (assuming no wrong answers lose lives)
  - Results displayed correctly in summary screen

#### Test Case 3: Lesson Selection and Data Loading
- **Description:** Verify different lessons load correct question sets
- **Preconditions:** Quiz data properly structured
- **Test Steps:**
  1. Select each lesson type: pinagmulan, patinig, katinig, kudlit, pangaltas, danda
  2. Verify 10 random questions from selected lesson appear
- **Expected Results:**
  - Each lesson shows 10 unique questions from that category
  - Question data matches quiz-data.js structure
  - Baybayin characters display correctly

#### Test Case 4: Navigation Between Screens
- **Description:** Test navigation from quiz to results and back
- **Preconditions:** Quiz completed
- **Test Steps:**
  1. Complete any quiz
  2. Tap "View Results" or navigate to summary
  3. Verify summary displays current session stats
  4. Navigate back to main screen
- **Expected Results:**
  - Smooth transitions between screens
  - No data loss during navigation
  - Summary shows accurate current session data

#### Test Case 5: Average Score Calculation
- **Description:** Verify overall performance statistics calculation
- **Preconditions:** Multiple quiz results saved
- **Test Steps:**
  1. Complete 3 quizzes with different scores
  2. Navigate to summary screen
  3. Check "Kabuuang Kakayahan" section
- **Expected Results:**
  - Average score = (sum of all quiz scores) / number of quizzes
  - "Mga Quiz na Nakumpleto" shows correct count
  - Average displays as percentage

### 2. Invalid Data (for Negative Testing)

These tests ensure the app handles unexpected or malformed data gracefully without crashing.

#### Test Case 6: Quiz Data with Missing Properties
- **Description:** Test app behavior when quiz data is incomplete
- **Preconditions:** Access to modify quiz-data.js temporarily
- **Test Steps:**
  1. Temporarily remove `baybayin` property from one question in quiz-data.js
  2. Load quiz and attempt to answer the modified question
- **Expected Results:**
  - App does not crash
  - Question should be skipped or show error message
  - Game continues with remaining questions
  - No undefined/null values displayed

#### Test Case 7: Invalid Quiz Results Storage
- **Description:** Test handling of corrupted saved quiz data
- **Preconditions:** Access to local storage or quiz-results.js
- **Test Steps:**
  1. Manually add quiz result with `score: null` or `score: "invalid"`
  2. Load summary screen
- **Expected Results:**
  - App does not crash on summary screen
  - Invalid scores display as 0 or show error message
  - Average calculation excludes invalid data or handles gracefully
  - No blank/infinite values in UI

#### Test Case 8: Rapid User Interaction
- **Description:** Test app stability with rapid button tapping
- **Preconditions:** Quiz in progress
- **Test Steps:**
  1. Start quiz
  2. Rapidly tap multiple answer choices before feedback appears
  3. Continue tapping during feedback display
- **Expected Results:**
  - Only first tap registers as answer
  - No double submissions or score corruption
  - App remains stable and responsive
  - Subsequent questions load correctly

#### Test Case 9: Network/Storage Failure Simulation
- **Description:** Test behavior when local storage operations fail
- **Preconditions:** App running
- **Test Steps:**
  1. Simulate local storage being full or unavailable
  2. Complete a quiz
- **Expected Results:**
  - Quiz completes successfully
  - Graceful degradation (results not saved, but no crash)
  - User notified of save failure or app continues silently
  - No loss of current quiz progress

#### Test Case 10: Empty Quiz Data
- **Description:** Test behavior when no quiz data exists for a lesson
- **Preconditions:** Can modify quiz-data.js
- **Test Steps:**
  1. Temporarily set a lesson array to empty: `pangaltas: []`
  2. Try to start quiz for that lesson
- **Expected Results:**
  - App does not crash
  - Shows appropriate message: "No questions available"
  - Prevents starting quiz or provides alternative lesson
  - Graceful fallback to available lessons

### 3. Boundary Values

These tests verify the app handles minimum, maximum, and edge-case values correctly.

#### Test Case 11: Minimum Score (0%)
- **Description:** Test behavior with perfect failure (0 correct answers)
- **Preconditions:** Quiz started
- **Test Steps:**
  1. Answer all questions incorrectly
  2. Lose all lives or complete quiz
- **Expected Results:**
  - Score: 0
  - Accuracy: 0%
  - Lives: 0 (if lose-life-on-wrong enabled)
  - Summary screen displays "0" values correctly
  - No negative scores or division by zero errors

#### Test Case 12: Maximum Score (100%)
- **Description:** Test behavior with perfect success
- **Preconditions:** Quiz started
- **Test Steps:**
  1. Answer all questions correctly
  2. Maintain all lives
- **Expected Results:**
  - Score: 100 (or 10 × 10 points = 100)
  - Accuracy: 100%
  - Lives: 3
  - Success modal appears
  - Summary calculations work correctly

#### Test Case 13: Minimum Questions (1 question)
- **Description:** Test with smallest possible quiz
- **Preconditions:** Can modify quiz configuration
- **Test Steps:**
  1. Temporarily set `questionsPerLesson: 1`
  2. Start and complete single-question quiz
- **Expected Results:**
  - Quiz loads with 1 question
  - Progress indicators work correctly
  - Summary shows 1 total question
  - Completion logic triggers after single question

#### Test Case 14: Maximum Quiz Attempts
- **Description:** Test with many quiz completions
- **Preconditions:** App functional
- **Test Steps:**
  1. Complete 50+ quizzes with varying scores
  2. Check summary screen performance
- **Expected Results:**
  - App remains responsive
  - History list loads without lag
  - Average calculation works with large dataset
  - No memory leaks or performance degradation

#### Test Case 15: Extreme Lives Values
- **Description:** Test edge cases with lives system
- **Preconditions:** Game configuration accessible
- **Test Steps:**
  1. Set `maxLives: 1` (minimum)
  2. Get one question wrong
- **Expected Results:**
  - Game ends immediately after first wrong answer
  - Lives display shows 0
  - Game over modal appears
  - Results saved correctly

#### Test Case 16: Longest Possible Input
- **Description:** Test with longest Baybayin strings
- **Preconditions:** Quiz data contains long words
- **Test Steps:**
  1. Use questions with maximum character length (e.g., "pinagmulan" lesson)
  2. Verify display and input handling
- **Expected Results:**
  - Long Baybayin strings display correctly
  - Input validation accepts correct long answers
  - UI layout accommodates long text without overflow

---

## Test Execution Guidelines

1. **Setup:** Ensure clean app installation before each major test suite
2. **Data Reset:** Clear local storage between tests that modify saved data
3. **Documentation:** Record actual vs expected results for each test case
4. **Device Testing:** Test on both iOS and Android if possible
5. **Performance:** Monitor for crashes, memory issues, and UI responsiveness

## Success Criteria

- All valid data tests pass with expected results
- Invalid data tests handle errors gracefully without crashes
- Boundary value tests confirm proper limits and edge case handling
- App maintains stability across all test scenarios