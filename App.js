import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext'; 

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';
import DashboardScreen from './screens/DashboardScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import EcoCashPaymentScreen from './screens/EcoCashPaymentScreen';
import StaffSalesScreen from './screens/StaffSalesScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import AddStaffScreen from './screens/Admin/AddStaffScreen'; 
import WorkoutHistoryScreen from './screens/WorkoutHistory';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { isManager, isStaff } = useAuth();
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#59cb01',
        tabBarInactiveTintColor: '#8a9a9f',
        tabBarStyle: {
          backgroundColor: '#141f23',
          borderTopColor: 'rgba(242, 250, 234, 0.1)',
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '500' },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={MainScreen} 
        options={{ 
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          )
        }} 
      />

      {/* Staff and Managers can both Check-In clients */}
      {(isStaff() || isManager()) && (
        <Tab.Screen 
          name="Attendance" 
          component={AttendanceScreen} 
          options={{ 
            title: 'Check-In',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'people' : 'people-outline'} size={size} color={color} />
            )
          }} 
        />
      )}
      
      {/* Staff and Managers can both Record Sales */}
      {(isStaff() || isManager()) && (
        <Tab.Screen 
          name="Sales" 
          component={StaffSalesScreen} 
          options={{ 
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'cash' : 'cash-outline'} size={size} color={color} />
            )
          }} 
        />
      )}
      
      {isManager() && (
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ 
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={size} color={color} />
            )
          }} 
        />
      )}
      
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{ 
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={size} color={color} />
          )
        }} 
      />

      {/* Admin tab specifically for Manager to add Staff */}
      {isManager() && (
        <Tab.Screen 
          name="Admin" 
          component={AddStaffScreen} 
          options={{ 
            title: 'Staff Management',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'shield-checkmark' : 'shield-checkmark-outline'} size={size} color={color} />
            )
          }} 
        />
      )}
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return <SplashScreen />;

  return (
    <Stack.Navigator 
      initialRouteName={user ? "MainTabs" : "Login"}
      screenOptions={{
        headerStyle: { backgroundColor: '#141f23' },
        headerTintColor: '#f2faea',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Create Account' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ title: 'Membership' }} />
          <Stack.Screen name="EcoCashPayment" component={EcoCashPaymentScreen} options={{ title: 'EcoCash Payment' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider> 
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </NotificationProvider>
    </AuthProvider>
  );
}