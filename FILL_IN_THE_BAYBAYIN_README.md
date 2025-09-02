# Fill-in-the-Baybayin ✍️

## Overview

Fill-in-the-Baybayin is an interactive translation quiz feature for the Baynolohiya React Native app. It helps users learn and practice the mapping between Latin letters and Baybayin symbols through engaging gameplay.

## Features

### 🎮 Game Modes
- **Latin → Baybayin**: Users select correct Baybayin characters to form Latin words
- **Baybayin → Latin**: Users choose the correct Latin spelling from multiple choice options

### 🏆 Gamification Elements
- **Scoring System**: +10 points per correct answer, with bonus points for speed and streaks
- **Lives System**: 3 lives, lose one on wrong answers
- **Timer**: 30-second countdown per question with bonus points for quick answers
- **Levels**: 3 difficulty levels (1-syllable, 2-syllable, 3+ syllable words)
- **Achievements**: Unlock badges for various accomplishments
- **Streak Bonuses**: Consecutive correct answers earn extra points

### 🎯 Achievement System
- **Baybayin Beginner**: First correct answer
- **Syllable Slayer**: Perfect round (100% accuracy)
- **Translation Master**: 100% accuracy in 10 words
- **Speed Demon**: Answer 5 questions in under 10 seconds each
- **Level Master**: Complete all levels

## File Structure

```
src/
├── data/
│   └── quiz-data.js                 # Quiz questions, characters, and game config
├── hooks/
│   └── useQuizGame.js              # Core game logic and state management
├── components/quiz/
│   ├── QuizTile.jsx                # Reusable character/option tile component
│   ├── ProgressBar.jsx             # Progress indicator component
│   ├── GameStats.jsx               # Game statistics display
│   ├── FeedbackModal.jsx           # Success/failure feedback modal
│   ├── AchievementBadge.jsx        # Achievement display component
│   ├── LatinToBaybayinMode.jsx     # Latin to Baybayin game mode
│   └── BaybayinToLatinMode.jsx     # Baybayin to Latin game mode
├── screen/
│   └── quiz-screen.jsx             # Main quiz screen
└── tabs/
    └── subukin-tab.jsx             # Updated Subukin tab with quiz integration
```

## Usage

### Starting the Quiz
1. Navigate to the "Subukan" tab
2. Tap on "Fill-in-the-Baybayin" game card
3. Choose game mode (Latin → Baybayin or Baybayin → Latin)
4. Start playing!

### Gameplay
- **Latin → Baybayin Mode**: 
  - Read the Latin word and its meaning
  - Select Baybayin characters from available tiles
  - Characters are arranged in the order you select them
  - Submit when you have the correct number of characters

- **Baybayin → Latin Mode**:
  - Read the Baybayin word and its meaning
  - Choose the correct Latin spelling from multiple choice options
  - Tap your selection to submit

### Scoring
- **Base Score**: 10 points per correct answer
- **Speed Bonus**: +5 points for answering within 10 seconds
- **Streak Bonus**: +5 points per consecutive correct answer
- **Perfect Round**: +50 points for 100% accuracy in a round

## Technical Implementation

### State Management
The quiz uses a custom React hook (`useQuizGame`) that manages:
- Game state (score, lives, current question, etc.)
- Question generation and validation
- Achievement tracking
- Timer management

### Data Structure
Quiz data is organized by difficulty levels:
- **Level 1**: 1-syllable words (beginner)
- **Level 2**: 2-syllable words (intermediate)  
- **Level 3**: 3+ syllable words (advanced)

Each word includes:
- Latin spelling
- Baybayin characters
- English meaning
- Difficulty level

### Character System
Baybayin characters are categorized as:
- **Patinig** (Vowels): ᜀ, ᜁ, ᜂ
- **Katinig** (Consonants): ᜃ, ᜄ, ᜅ, etc.
- **Kudlit** (Diacritics): ᜒ, ᜓ
- **Special**: ᜴ (Virama), ᜵ (Danda)

## Customization

### Adding New Words
Edit `src/data/quiz-data.js` to add new words to any level:

```javascript
{
  latin: "NEWWORD",
  baybayin: "ᜈᜒᜏᜓᜇ᜔",
  meaning: "new word",
  difficulty: 1
}
```

### Modifying Game Rules
Update `gameConfig` in `src/data/quiz-data.js`:
- Change scoring values
- Adjust timer duration
- Modify lives count
- Update level unlock requirements

### Adding Achievements
Add new achievements to the `achievements` object in `src/data/quiz-data.js`:

```javascript
"new-achievement": {
  id: "new-achievement",
  title: "New Achievement",
  description: "Description of achievement",
  icon: "🏆",
  requirement: { type: "correct_answers", count: 5 },
  unlocked: false
}
```

## Performance Considerations

- Questions are generated on-demand to reduce memory usage
- Character tiles use React.memo for optimal re-rendering
- Animations use native driver for smooth performance
- Game state is efficiently managed with useCallback and useMemo

## Future Enhancements

- **Multiplayer Mode**: Compete with friends
- **Daily Challenges**: Special themed quizzes
- **Progress Tracking**: Detailed statistics and learning analytics
- **Custom Word Lists**: User-created quiz sets
- **Voice Integration**: Audio pronunciation features
- **Offline Mode**: Play without internet connection

## Dependencies

The feature uses only React Native core components and doesn't require additional dependencies beyond what's already in the project.

## Testing

To test the feature:
1. Run the app: `npm start`
2. Navigate to Subukan tab
3. Start the Fill-in-the-Baybayin quiz
4. Test both game modes
5. Verify scoring, achievements, and game flow

## Contributing

When adding new features or fixing bugs:
1. Follow the existing code structure
2. Update the quiz data as needed
3. Test thoroughly on both iOS and Android
4. Update this README if adding new features
