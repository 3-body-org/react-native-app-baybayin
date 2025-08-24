# Baybayin App

A React Native project built with Expo for learning and exploring the Baybayin script.

## Prerequisites

- Node.js (version 14 or newer recommended)
- npm or yarn package manager
- Expo Go app on your physical device (for testing)

## Installation

1. Install project dependencies:
```bash
npm install
```

2. Check for outdated dependencies:
```bash
npx expo install --check
```

## Running the Project

Start the development server:
```bash
npx expo start
```

This will open a Metro bundler in your browser with various connection options.

## Troubleshooting

If you encounter issues with Expo Go not being able to start the app, try using ngrok tunnel:

1. First install ngrok globally:
```bash
sudo npm install -g @expo/ngrok
```

2. Then start Expo with tunnel:
```bash
npx expo start --tunnel
```

## Design Reference

Figma design file: [Baybayin Design](https://www.figma.com/design/oHqRPBcqrhYWj2iaQaOaVc/Baybayin?node-id=0-1&t=1xfXnvZKVIBAlr6r-1)

## Additional Notes

- Make sure your device and computer are on the same network when using LAN connection
- Scan the QR code with your device's camera (iOS) or Expo Go app (Android) to open the app
- For the best experience, use a physical device rather than an emulator
