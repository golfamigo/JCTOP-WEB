const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Web-specific configurations for standalone project
config.resolver.alias = {
  ...(config.resolver.alias || {}),
  // Ensure proper web polyfills
  'react-native$': 'react-native-web',
};

// Exclude test files from being bundled
config.resolver.blockList = [
  /.*\.spec\.(js|jsx|ts|tsx)$/,
  /.*\.test\.(js|jsx|ts|tsx)$/,
  /.*\/__tests__\/.*/,
  /.*\/__mocks__\/.*/,
  /jest-setup\.ts$/,
  /jest-setup-web\.ts$/,
];

module.exports = config;