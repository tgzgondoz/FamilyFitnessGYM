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
  Easing
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
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#141f23" />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Background decorative elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeGradient} />

        {/* Logo with animated scale */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Image 
            source={require('../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View style={styles.logoGlow} />
        </Animated.View>

        {/* App Name with gradient text effect */}
        <View style={styles.textContainer}>
          <Text style={styles.appName}>GYM</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>Transform Your Potential</Text>
          <Text style={styles.subTagline}>Every rep counts</Text>
        </View>

        {/* Animated Get Started Button */}
        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity 
              style={styles.getStartedButton}
              onPress={handleGetStarted}
              onPressIn={buttonPressIn}
              onPressOut={buttonPressOut}
              activeOpacity={0.9}
            >
              <Text style={styles.buttonText}>GET STARTED</Text>
              <View style={styles.buttonIcon}>
                <Text style={styles.arrow}>→</Text>
              </View>
              <View style={styles.buttonGlow} />
            </TouchableOpacity>
          </Animated.View>
          
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text 
              style={styles.loginLink}
              onPress={() => navigation.replace('Login')}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </Animated.View>
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
    paddingVertical: height * 0.1,
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(89, 203, 1, 0.05)',
    top: height * 0.1,
    left: -width * 0.2,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: 'rgba(89, 203, 1, 0.03)',
    bottom: height * 0.15,
    right: -width * 0.1,
  },
  decorativeGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    background: 'linear-gradient(180deg, rgba(20, 31, 35, 0.8) 0%, transparent 100%)',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.05,
    position: 'relative',
  },
  logoImage: {
    width: width * 0.32,
    height: width * 0.32,
    tintColor: '#f2faea',
    zIndex: 2,
  },
  logoGlow: {
    position: 'absolute',
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: 'rgba(89, 203, 1, 0.15)',
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: height * 0.03,
  },
  appName: {
    fontSize: 42,
    fontWeight: '900',
    color: '#f2faea',
    letterSpacing: 4,
    marginBottom: 12,
    textShadowColor: 'rgba(89, 203, 1, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#59cb01',
    borderRadius: 1.5,
    marginBottom: 16,
    opacity: 0.8,
  },
  tagline: {
    fontSize: 18,
    color: '#f2faea',
    letterSpacing: 1.5,
    fontWeight: '600',
    marginBottom: 6,
  },
  subTagline: {
    fontSize: 14,
    color: '#8a9a9f',
    letterSpacing: 1,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.08,
  },
  getStartedButton: {
    backgroundColor: '#59cb01',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#59cb01',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  buttonGlow: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ rotate: '15deg' }],
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#141f23',
    letterSpacing: 1.2,
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  arrow: {
    fontSize: 20,
    color: '#141f23',
    fontWeight: '800',
  },
  footerText: {
    fontSize: 14,
    color: '#8a9a9f',
    marginTop: 24,
    textAlign: 'center',
  },
  loginLink: {
    color: '#59cb01',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default SplashScreen;