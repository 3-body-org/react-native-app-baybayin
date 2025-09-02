const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add PDF support
config.resolver.assetExts.push('pdf');

module.exports = config;
