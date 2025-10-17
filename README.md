# Baynolohiya - Baybayin Learning App

A React Native mobile application for learning Baybayin (ancient Filipino script) with interactive lessons, quizzes, and educational content.

## Getting Started

### Prerequisites

- Node.js (v18 or higher) - If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/)
- npm or yarn package manager

### Setup Instructions

1. **Install Expo CLI**

   ```bash
   npm install expo
   ```

2. **Check and Update Dependencies**
   Verify and update all dependencies to match the installed SDK version:

   ```bash
   npx expo install --check
   ```

   ```bash
   npx expo install --fix
   ```

   Then check for common problems:

   ```bash
   npx expo-doctor
   ```

3. **Start the Development Server**
   ```bash
   npx expo start
   ```

### Troubleshooting Connection Issues

If Expo Go cannot start the app or you encounter connection problems:

1. **Install ngrok for tunneling**

   ```bash
   sudo npm install -g @expo/ngrok
   ```

2. **Start with tunnel mode**
   ```bash
   npx expo start --tunnel
   ```

The tunnel mode creates a secure connection that works regardless of network configuration, making it ideal for testing on physical devices.

## Project Information

### Key Features

- Interactive Baybayin learning modules
- Educational quizzes and assessments
- PDF viewing capabilities for learning materials
- Modern React Native architecture

### Technical Stack

- **React Native**: 0.79.5
- **Expo SDK**: 53.0.23
- **React Navigation**: For navigation
- **React Native PDF**: For educational content viewing
- **React Native Blob Util**: For file operations

### Deployment

- This app is set up using Expo Application Services (EAS) for building and deploying to app stores.

## Development Notes

This app includes native dependencies that may require additional setup steps depending on your development environment. The tunnel mode option provides the most reliable connection method for testing across different network configurations.

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/3-body-org/react-native-app-baybayin?utm_source=oss&utm_medium=github&utm_campaign=3-body-org%2Freact-native-app-baybayin&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
