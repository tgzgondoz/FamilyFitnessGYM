// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  StatusBar, 
  Image, 
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  SafeAreaView
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleGetStarted = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('Login');
    });
  };

  const buttonScale = useRef(new Animated.Value(1)).current;

  const buttonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const buttonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#000000" 
        translucent={false}
      />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Subtle iOS-style background gradients */}
        <View style={styles.backgroundGradient} />
        <View style={styles.topGlow} />
        <View style={styles.bottomGlow} />

        {/* Logo with iOS-style shadow */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.logoShadow}>
            <Image 
              source={require('../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* App Name with iOS typography */}
        <View style={styles.textContainer}>
          <Text style={styles.appName}>GYM</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>Transform Your Potential</Text>
          <Text style={styles.subTagline}>Every rep counts</Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* iOS-style Get Started Button */}
        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity 
              style={styles.getStartedButton}
              onPress={handleGetStarted}
              onPressIn={buttonPressIn}
              onPressOut={buttonPressOut}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
          
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={() => navigation.replace('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text style={styles.signInLink}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Safe area padding for iPhone X and above */}
        {Platform.OS === 'ios' && <View style={styles.iosSafeArea} />}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    paddingHorizontal: 24,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  topGlow: {
    position: 'absolute',
    top: -height * 0.3,
    left: -width * 0.5,
    right: -width * 0.5,
    height: height * 0.6,
    backgroundColor: '#59cb01',
    opacity: 0.03,
    borderRadius: width,
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -height * 0.2,
    left: -width * 0.3,
    right: -width * 0.3,
    height: height * 0.4,
    backgroundColor: '#59cb01',
    opacity: 0.02,
    borderRadius: width,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? height * 0.08 : height * 0.1,
  },
  logoShadow: {
    shadowColor: '#59cb01',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    backgroundColor: 'transparent',
  },
  logoImage: {
    width: width * 0.28,
    height: width * 0.28,
    tintColor: '#FFFFFF',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  appName: {
    fontSize: 44,
    fontWeight: Platform.OS === 'ios' ? '900' : 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed',
  },
  divider: {
    width: 80,
    height: 4,
    backgroundColor: '#59cb01',
    borderRadius: 2,
    marginBottom: 20,
    opacity: 0.9,
  },
  tagline: {
    fontSize: 17,
    color: '#FFFFFF',
    letterSpacing: 0.5,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    marginBottom: 8,
    opacity: 0.95,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  subTagline: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 0.3,
    fontStyle: 'normal',
    opacity: 0.8,
    fontWeight: Platform.OS === 'ios' ? '300' : 'normal',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
  },
  getStartedButton: {
    backgroundColor: '#59cb01',
    paddingVertical: Platform.OS === 'ios' ? 16 : 18,
    paddingHorizontal: 24,
    borderRadius: Platform.OS === 'ios' ? 12 : 10,
    width: '100%',
    maxWidth: 280,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#59cb01',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 4 : 6,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.3 : 0.4,
    shadowRadius: Platform.OS === 'ios' ? 12 : 15,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: '#000000',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  signInButton: {
    marginTop: 24,
    padding: 12,
  },
  signInText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  signInLink: {
    color: '#59cb01',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  iosSafeArea: {
    height: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default SplashScreen;