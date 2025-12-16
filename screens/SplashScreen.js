// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  StatusBar, 
  Image, 
  TouchableOpacity 
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#141f23" />
      
      <View style={styles.content}>
        {/* Logo - Clean, professional size */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* App Name/Tagline (Optional) */}
        <View style={styles.textContainer}>
          <Text style={styles.appName}>GYM</Text>
          <Text style={styles.tagline}>Join the Movement</Text>
        </View>

        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141f23',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.12,
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.05,
  },
  logoImage: {
    width: width * 0.35, // Smaller, more elegant size
    height: width * 0.35,
    tintColor: '#f2faea',
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f2faea',
    letterSpacing: 2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#8a9a9f',
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  getStartedButton: {
    backgroundColor: '#59cb01',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    maxWidth: 280,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#141f23',
    letterSpacing: 1,
  },
});

export default SplashScreen;