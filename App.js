// Updated App.js to include new screens
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';

import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import EcoCashPaymentScreen from "./screens/EcoCashPaymentScreen";
import NotificationsScreen from "./screens/NotificationsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Subscription")
            iconName = focused ? "card" : "card-outline";
          else if (route.name === "Dashboard")
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          else if (route.name === "Notifications")
            iconName = focused ? "notifications" : "notifications-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#59cb01",
        tabBarInactiveTintColor: "#8a9a9f",
        tabBarStyle: {
          backgroundColor: "#141f23",
          borderTopColor: "rgba(242, 250, 234, 0.1)",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 4,
        },
        headerShown: false, // Hide headers for all tab screens
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ 
          title: "Dashboard",
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{ 
          title: "My Subscription",
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ 
          title: "Notifications",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator 
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false, // Hide all headers globally
              contentStyle: {
                backgroundColor: "#141f23",
              }
            }}
          >
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
            />
            <Stack.Screen
              name="Main"
              component={MainTabs}
            />
            <Stack.Screen
              name="EcoCashPayment"
              component={EcoCashPaymentScreen}
              options={{
                headerShown: false, // Show header for this screen only
                title: "EcoCash Payment",
                headerStyle: {
                  backgroundColor: "#141f23",
                },
                headerTintColor: "#f2faea",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerBackTitle: "Back",
              }}
            />
            {/* You can add other screens here as needed */}
          </Stack.Navigator>
        </NavigationContainer>
      </NotificationProvider>
    </AuthProvider>
  );
}