// Updated App.js to include new screens
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';  


import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';
import MainScreen from './screens/MainScreen';
import DashboardScreen from './screens/DashboardScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import EcoCashPaymentScreen from './screens/EcoCashPaymentScreen';
import StaffSalesScreen from './screens/StaffSalesScreen';
import NotificationsScreen from './screens/NotificationsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Subscription') iconName = focused ? 'card' : 'card-outline';
          else if (route.name === 'Dashboard') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          else if (route.name === 'Sales') iconName = focused ? 'cash' : 'cash-outline';
          else if (route.name === 'Notifications') iconName = focused ? 'notifications' : 'notifications-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={MainScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Subscription" component={SubscriptionScreen} options={{ title: 'My Subscription' }} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Sales" component={StaffSalesScreen} options={{ title: 'Sales' }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen 
              name="Splash" 
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="SignUp" 
              component={SignUpScreen}
              options={{ title: 'Sign Up' }}
            />
            <Stack.Screen 
              name="Main" 
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="EcoCashPayment" 
              component={EcoCashPaymentScreen}
              options={{ title: 'EcoCash Payment' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NotificationProvider>
    </AuthProvider>
  );
}