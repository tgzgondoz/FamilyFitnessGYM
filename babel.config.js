module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-optional-chaining',
    'react-native-reanimated/plugin' // This should be last
  ]
};