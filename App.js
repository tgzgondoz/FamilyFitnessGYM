// Updated App.js to include new screens
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";

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
        tabBarActiveTintColor: "#59cb01", // Changed to match your color scheme
        tabBarInactiveTintColor: "#8a9a9f", // Changed to match your color scheme
        tabBarStyle: {
          backgroundColor: "#141f23", // Dark background to match theme
          borderTopColor: "rgba(242, 250, 234, 0.1)", // Subtle border
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: "#141f23", // Match dark theme
        },
        headerTintColor: "#f2faea", // Light text color
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ 
          title: "Dashboard",
          headerShown: false // Hide header since Dashboard has its own
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{ title: "My Subscription" }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: "Notifications" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <NavigationContainer>
          <StatusBar style="light" /> {/* Changed to "light" for dark theme */}
          <Stack.Navigator 
            initialRouteName="Splash"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#141f23", // Dark theme
              },
              headerTintColor: "#f2faea", // Light text
              headerTitleStyle: {
                fontWeight: "bold",
              },
              contentStyle: {
                backgroundColor: "#141f23", // Background for all screens
              }
            }}
          >
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
              options={{ 
                title: "Create Account",
                headerShown: false // Assuming SignUpScreen has its own header
              }}
            />
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EcoCashPayment"
              component={EcoCashPaymentScreen}
              options={{ 
                title: "EcoCash Payment",
                headerBackTitle: "Back", // For iOS
              }}
            />
            {/* REMOVE THIS DUPLICATE - Dashboard is already in MainTabs */}
            {/* <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ headerShown: false }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </NotificationProvider>
    </AuthProvider>
  );
}