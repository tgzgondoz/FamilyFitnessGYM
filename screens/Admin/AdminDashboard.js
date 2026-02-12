// screens/AdminDashboard.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PieChart, LineChart } from "react-native-chart-kit";
import { useAuth } from "../contexts/AuthContext";

const { width } = Dimensions.get("window");

const AdminDashboard = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [loading] = useState(false);

  // 1. Chart Data (Logic preserved from old file)
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [8500, 9200, 10500, 11200, 12850, 13500],
        color: (opacity = 1) => `rgba(89, 203, 1, ${opacity})`,
      },
    ],
  };

  const membershipData = [
    {
      name: "Monthly",
      population: 68,
      color: "#59cb01",
      legendFontColor: "#FFF",
    },
    {
      name: "Quarterly",
      population: 22,
      color: "#36a1d6",
      legendFontColor: "#FFF",
    },
    {
      name: "Annual",
      population: 10,
      color: "#ff6b6b",
      legendFontColor: "#FFF",
    },
  ];

  // 2. Functional Actions
  const handleResetPassword = (email) => {
    Alert.alert("Security", `Send reset link to ${email}?`, [
      { text: "Cancel" },
      {
        text: "Send",
        onPress: () => Alert.alert("Sent", "Reset email triggered."),
      },
    ]);
  };

  const handleRenew = (name) => {
    Alert.alert("Subscription", `Renew subscription for ${name}?`, [
      { text: "Cancel" },
      {
        text: "Confirm",
        onPress: () => Alert.alert("Success", "Subscription updated."),
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#59cb01" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header - Preserved Logic for dynamic email */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Manager Portal</Text>
            <Text style={styles.headerSubtitle}>
              {user?.email || "Admin Account"}
            </Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#ff6b6b" />
          </TouchableOpacity>
        </View>

        {/* Stats Grid - Using the New UI Card Style */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <View
              style={[
                styles.statIcon,
                { backgroundColor: "rgba(89, 203, 1, 0.1)" },
              ]}
            >
              <Ionicons name="people" size={20} color="#59cb01" />
            </View>
            <Text style={styles.statValue}>245</Text>
            <Text style={styles.statLabel}>Active Members</Text>
          </View>

          <View style={styles.statItem}>
            <View
              style={[
                styles.statIcon,
                { backgroundColor: "rgba(54, 161, 214, 0.1)" },
              ]}
            >
              <Ionicons name="cash" size={20} color="#36a1d6" />
            </View>
            <Text style={styles.statValue}>$12.8k</Text>
            <Text style={styles.statLabel}>Monthly Rev</Text>
          </View>
        </View>

        {/* Management Tools */}
        <Text style={styles.sectionTitle}>Management Tools</Text>
        <View style={styles.toolsContainer}>
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => navigation.navigate("Admin")}
          >
            <Ionicons name="person-add" size={24} color="#59cb01" />
            <Text style={styles.toolText}>Add Staff</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toolButton}
            onPress={() =>
              Alert.alert("Coming Soon", "Client Management module.")
            }
          >
            <Ionicons name="people-circle" size={24} color="#36a1d6" />
            <Text style={styles.toolText}>Manage Clients</Text>
          </TouchableOpacity>
        </View>

        {/* Revenue Chart */}
        <Text style={styles.sectionTitle}>Revenue Trend (USD)</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={revenueData}
            width={width - 72} // Adjusted for padding
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Upcoming Renewals List */}
        <Text style={styles.sectionTitle}>Upcoming Renewals</Text>
        <View style={styles.renewalsContainer}>
          {[
            { name: "John Doe", plan: "Monthly Plan", email: "john@gmail.com" },
            {
              name: "Sarah Smith",
              plan: "Annual Plan",
              email: "sarah@gmail.com",
            },
          ].map((item, index) => (
            <View
              key={index}
              style={[
                styles.renewalItem,
                index === 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View>
                <Text style={styles.renewalName}>{item.name}</Text>
                <Text style={styles.renewalPlan}>{item.plan}</Text>
              </View>
              <View style={styles.renewalActions}>
                <TouchableOpacity
                  onPress={() => handleResetPassword(item.email)}
                  style={styles.iconButton}
                >
                  <Ionicons name="key" size={18} color="#ffd93d" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleRenew(item.name)}
                  style={styles.renewButton}
                >
                  <Text style={styles.renewButtonText}>Renew</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Membership Distribution */}
        <Text style={styles.sectionTitle}>Membership Split</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={membershipData}
            width={width - 40}
            height={150}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#1e2b2f",
  backgroundGradientTo: "#1e2b2f",
  color: (opacity = 1) => `rgba(89, 203, 1, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  decimalPlaces: 0,
  propsForDots: { r: "4", strokeWidth: "2", stroke: "#59cb01" },
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#141f23" },
  container: { flex: 1, paddingHorizontal: 20 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141f23",
  },

  header: {
    paddingTop: 20,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: "#8a9a9f",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },
  logoutButton: {
    padding: 10,
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderRadius: 12,
  },

  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },
  statItem: {
    flex: 1,
    backgroundColor: "#1e2b2f",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#8a9a9f",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFF",
    marginBottom: 15,
  },

  toolsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },
  toolButton: {
    flex: 1,
    backgroundColor: "#1e2b2f",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
  },
  toolText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFF",
    marginTop: 10,
  },

  chartContainer: {
    backgroundColor: "#1e2b2f",
    borderRadius: 20,
    padding: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
  },
  chart: { borderRadius: 16 },

  renewalsContainer: {
    backgroundColor: "#1e2b2f",
    borderRadius: 20,
    padding: 16,
    marginBottom: 30,
  },
  renewalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  renewalName: { fontSize: 16, fontWeight: "700", color: "#FFF" },
  renewalPlan: { fontSize: 13, color: "#8a9a9f", marginTop: 2 },
  renewalActions: { flexDirection: "row", alignItems: "center", gap: 10 },

  iconButton: {
    padding: 10,
    backgroundColor: "rgba(255, 217, 61, 0.1)",
    borderRadius: 10,
  },
  renewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(89, 203, 1, 0.1)",
    borderRadius: 10,
  },
  renewButtonText: { color: "#59cb01", fontSize: 13, fontWeight: "700" },
});

export default AdminDashboard;
