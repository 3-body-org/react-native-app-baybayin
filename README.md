# Baynolohiya - Baybayin Learning App

A React Native mobile application for learning Baybayin (ancient Filipino script) with interactive lessons, quizzes, and educational content.

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (latest version)
- **EAS CLI** (for building and deployment)
- **Git**

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd baynolohiya
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install EAS CLI globally** (if not already installed)
   ```bash
   npm install -g @expo/eas-cli
   ```

4. **Login to your Expo account**
   ```bash
   eas login
   ```

## 🔄 Migration from Expo Go to EAS Build

Since this project has been migrated from Expo Go to EAS Build, you'll need to follow these steps:

### Why the Migration?

- **Native Dependencies**: The app uses native modules (`react-native-pdf`, `react-native-blob-util`) that require custom development builds
- **Better Performance**: EAS Build provides optimized builds with better performance
- **Production Ready**: EAS Build is the recommended approach for production apps

### Step-by-Step Migration

1. **Install Development Build**
   ```bash
   # For Android
   eas build --profile development --platform android
   
   # For iOS (if you have an Apple Developer account)
   eas build --profile development --platform ios
   ```

2. **Install the Development Build on Your Device**
   - Download the APK/IPA from the EAS Build dashboard
   - Install it on your device (Android: enable "Install from unknown sources")

3. **Start the Development Server**
   ```bash
   npm start
   # or
   expo start --dev-client
   ```

4. **Connect to the Development Build**
   - Open the development build app on your device
   - Scan the QR code from the terminal
   - The app will load with your latest changes

### Alternative: Local Development Build

If you prefer to build locally:

```bash
# For Android
npx expo run:android

# For iOS
npx expo run:ios
```

## 📱 Available Scripts

- `npm start` - Start the development server
- `npm run android` - Start on Android device/emulator
- `npm run ios` - Start on iOS device/simulator
- `npm run web` - Start web version

## 🏗️ EAS Build Profiles

The project includes three build profiles in `eas.json`:

- **development**: For development testing with dev client
- **preview**: For internal testing and QA
- **production**: For app store releases

### Building for Different Environments

```bash
# Development build
eas build --profile development

# Preview build
eas build --profile preview

# Production build
eas build --profile production
```

## 📦 Key Dependencies

- **React Native**: 0.79.5
- **Expo SDK**: 53.0.22
- **React Navigation**: For navigation
- **React Native PDF**: For PDF viewing
- **React Native Blob Util**: For file operations
- **Bottom Sheet**: For modal interactions

## 🔧 Configuration

### App Configuration (`app.json`)
- App name: "baynolohiya"
- Package name: `com.erudite098.baynolohiya`
- EAS Project ID: `3e3249ea-9b91-4292-9fc1-5103cc0596fc`

### Android Permissions
The app requires the following Android permissions:
- `READ_EXTERNAL_STORAGE`
- `WRITE_EXTERNAL_STORAGE`
- `DOWNLOAD_WITHOUT_NOTIFICATION`
- `ACCESS_NETWORK_STATE`

## 🚨 Important Notes

1. **No More Expo Go**: This app cannot run in Expo Go due to native dependencies
2. **Development Build Required**: You must use a development build or EAS Build
3. **EAS Account**: Make sure you're logged into the correct Expo/EAS account
4. **Project Access**: Ensure you have access to the EAS project

## 🐛 Troubleshooting

### Common Issues

1. **"Expo Go not compatible" error**
   - Solution: Use development build instead of Expo Go

2. **Build fails with native module errors**
   - Solution: Ensure all dependencies are properly installed and configured

3. **Cannot connect to development server**
   - Solution: Make sure your device and computer are on the same network

4. **EAS login issues**
   - Solution: Check your Expo account credentials and project access

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Review [EAS Build documentation](https://docs.expo.dev/build/introduction/)
- Contact the development team for project-specific issues

## 📝 Development Workflow

1. Make your changes in the code
2. Test using the development build
3. Create a preview build for testing
4. Submit to app stores when ready

## 🔐 Security

- Never commit sensitive information (API keys, certificates)
- Use environment variables for configuration
- Follow secure coding practices

---

**Note**: This project has been migrated from Expo Go to EAS Build. Make sure to follow the migration steps above to continue development.