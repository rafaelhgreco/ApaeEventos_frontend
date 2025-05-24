// metro.config.js
const { getDefaultConfig } = require("expo/metro-config"); // ou '@react-native/metro-config' se não for Expo

const config = getDefaultConfig(__dirname);

module.exports = config;
