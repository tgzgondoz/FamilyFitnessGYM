// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>Family Fitness Gym</Text>
        <Text style={styles.motto}>Join the Movement</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  title: { 
    fontSize: 36, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#007AFF'
  },
  motto: { 
    fontSize: 18, 
    textAlign: 'center',
    marginTop: 10,
    color: '#666'
  }
});

export default SplashScreen;