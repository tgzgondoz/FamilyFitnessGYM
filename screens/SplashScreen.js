// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  StatusBar, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);
  const scaleAnim = new Animated.Value(0.9);
  const gradientAnim = new Animated.Value(0);
  const loadingWidthAnim = new Animated.Value(0);
  const buttonScaleAnim = new Animated.Value(0.95);

  useEffect(() => {
    // Faster sequence animations
    Animated.parallel([
      // Gradient animation
      Animated.timing(gradientAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Logo/text entrance
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Loading animation
      Animated.timing(loadingWidthAnim, {
        toValue: width * 0.8,
        duration: 1500,
        useNativeDriver: false,
      }),
      // Button subtle pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(buttonScaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(buttonScaleAnim, {
            toValue: 0.98,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // Auto navigation after 3 seconds (reduced from longer time)
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [width]);

  const handleGetStarted = () => {
    // Cancel auto navigation and go to login immediately
    navigation.replace('Login');
  };

  // Animated gradient colors
  const gradientInterpolation = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(10, 10, 40, 0)', 'rgba(10, 10, 40, 1)']
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a28" />
      
      {/* Animated gradient background */}
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: gradientInterpolation }]}>
        <LinearGradient
          colors={['#0a0a28', '#1a1a38', '#2a2a48']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <View style={styles.content}>
        {/* Logo/Brand - Using your logo.png */}
        <Animated.View 
          style={[
            styles.logoContainer,
            { 
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <View style={styles.logoCircle}>
            <Image 
              source={require('../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.brandName}>FAMILY FITNESS GYM</Text>
        </Animated.View>

        {/* Main motivational text */}
        <Animated.View 
          style={[
            styles.textContainer,
            { 
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim }
              ]
            }
          ]}
        >
          <Text style={styles.tagline}>Fitness made simple:</Text>
          <Text style={styles.mainText}>your path to Health</Text>
          <Text style={[styles.mainText, styles.lastLine]}>and Happiness</Text>
          
          {/* Decorative line */}
          <View style={styles.decorativeLine} />
        </Animated.View>

        {/* Get Started Button */}
        <Animated.View 
          style={[
            styles.buttonContainer,
            { 
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: buttonScaleAnim }
              ]
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#007AFF', '#0056CC']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>GET STARTED</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          {/* Loading indicator - Smaller and subtle */}
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBar}>
              <Animated.View 
                style={[
                  styles.loadingProgress,
                  {
                    width: loadingWidthAnim
                  }
                ]} 
              />
            </View>
            <Text style={styles.loadingText}>Loading your fitness journey...</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a28',
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
    marginTop: 10,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    overflow: 'hidden',
  },
  logoImage: {
    width: 90,
    height: 90,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 5,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 1,
    marginBottom: 15,
    textAlign: 'center',
  },
  mainText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: 0.5,
  },
  lastLine: {
    marginBottom: 25,
  },
  decorativeLine: {
    width: 100,
    height: 3,
    backgroundColor: '#007AFF',
    borderRadius: 2,
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  getStartedButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 25,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  loadingContainer: {
    alignItems: 'center',
    width: '100%',
  },
  loadingBar: {
    width: '60%',
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: 0.5,
  },
});

export default SplashScreen;