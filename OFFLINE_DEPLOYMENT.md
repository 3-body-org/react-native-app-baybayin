# 📱 Offline Deployment Guide for Baynolohiya

This guide helps you create and deploy your EAS build for clients with no internet connection.

## 🎯 Quick Solution: Standalone APK/IPA

### Step 1: Build Offline Version

```bash
# For Android APK (recommended for offline use)
eas build --profile offline --platform android

# For iOS (if you have Apple Developer account)
eas build --profile offline --platform ios
```

### Step 2: Download and Distribute

1. **Download the build** from EAS Build dashboard
2. **Transfer to client's device** via:
   - USB cable
   - SD card
   - File sharing apps
   - Email (if APK size allows)

### Step 3: Install on Client Device

**Android:**
```bash
# Enable "Install from unknown sources" in device settings
# Then install the APK file
```

**iOS:**
- Requires Apple Developer account
- Install via Xcode or TestFlight

## 🔧 Alternative Methods

### Method 1: Local Development Build

If you want to build locally without EAS:

```bash
# Install dependencies
npm install

# For Android
npx expo run:android --variant release

# For iOS
npx expo run:ios --configuration Release
```

### Method 2: Expo Development Build (Offline Mode)

1. **Create development build once:**
   ```bash
   eas build --profile development --platform android
   ```

2. **Bundle your app locally:**
   ```bash
   npx expo export --platform android
   ```

3. **Load bundle into development build:**
   - Copy the exported bundle to device
   - Open development build app
   - Load the local bundle

## 📦 Preparing for Offline Use

### 1. Bundle All Assets

Make sure all your assets are included in the build:

```bash
# Check if all assets are properly referenced
npx expo export --platform android --output-dir ./dist
```

### 2. Remove Network Dependencies

Check your code for any network calls that might fail offline:

```javascript
// Example: Add offline detection
import NetInfo from '@react-native-community/netinfo';

const checkConnection = async () => {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    // Handle offline mode
    console.log('App is running offline');
  }
};
```

### 3. Configure Offline-First Features

Update your app configuration for offline use:

```json
// In app.json, ensure all assets are bundled
{
  "expo": {
    "assetBundlePatterns": [
      "**/*"
    ]
  }
}
```

## 🚀 Complete Offline Setup Commands

### For Android APK:

```bash
# 1. Build offline APK
eas build --profile offline --platform android

# 2. Download from EAS dashboard
# 3. Transfer to client device
# 4. Install APK (enable unknown sources)
```

### For iOS:

```bash
# 1. Build offline IPA
eas build --profile offline --platform ios

# 2. Download from EAS dashboard
# 3. Install via Xcode or TestFlight
```

## 📋 Pre-Deployment Checklist

- [ ] All assets are bundled in the app
- [ ] No external API calls that require internet
- [ ] PDF files and images are included locally
- [ ] App works without network connection
- [ ] All dependencies are properly configured
- [ ] Build profile is set to "offline"

## 🔍 Testing Offline Functionality

1. **Build the app**
2. **Turn off WiFi/mobile data**
3. **Test all features:**
   - Lesson content loading
   - Quiz functionality
   - PDF viewing
   - Image display
   - Navigation

## 📱 Distribution Methods

### For Android:
- **USB Transfer**: Direct file transfer
- **SD Card**: Copy APK to SD card
- **File Manager**: Use device file manager
- **Email**: Send APK as attachment (if size allows)

### For iOS:
- **Xcode**: Direct installation
- **TestFlight**: Internal testing
- **Ad Hoc Distribution**: For specific devices

## ⚠️ Important Notes

1. **APK Size**: Standalone APKs are larger than development builds
2. **Updates**: Offline apps can't auto-update
3. **Permissions**: Ensure all required permissions are granted
4. **Testing**: Always test offline functionality before deployment

## 🛠️ Troubleshooting

### Common Issues:

1. **App crashes on startup**
   - Check if all native dependencies are properly configured
   - Verify asset paths are correct

2. **Assets not loading**
   - Ensure `assetBundlePatterns` includes all assets
   - Check file paths in your code

3. **Build fails**
   - Verify EAS CLI is updated
   - Check project configuration

### Getting Help:

- Check EAS Build logs in dashboard
- Verify all dependencies are compatible
- Test on multiple devices

---

**Quick Command Summary:**
```bash
# Build offline APK
eas build --profile offline --platform android

# Download and install on client device
# No internet connection required after installation
```
