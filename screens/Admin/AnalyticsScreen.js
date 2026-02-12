import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  BarChart,
  LineChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";

const { width } = Dimensions.get("window");

const AnalyticsScreen = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [loading, setLoading] = useState(true);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, []);

  // Data Objects (Derived from your provided snippets)
  const revenueData = {
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
    datasets: [
      {
        data: [8500, 10500, 12850, 14200, 14500, 16500],
        color: (opacity = 1) => `rgba(89, 203, 1, ${opacity})`,
      },
    ],
  };

  const performanceData = {
    labels: ["Occupancy", "Retention", "Satisfaction"],
    data: [0.85, 0.78, 0.92],
  };

  const classAttendanceData = [
    {
      name: "Yoga",
      population: 28,
      color: "#59cb01",
      legendFontColor: "#8a9a9f",
    },
    {
      name: "HIIT",
      population: 22,
      color: "#36a1d6",
      legendFontColor: "#8a9a9f",
    },
    {
      name: "Spin",
      population: 18,
      color: "#ff6b6b",
      legendFontColor: "#8a9a9f",
    },
  ];

  const chartConfig = {
    backgroundColor: "#1e2b2f",
    backgroundGradientFrom: "#1e2b2f",
    backgroundGradientTo: "#1e2b2f",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(138, 154, 159, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: "4", strokeWidth: "2", stroke: "#FFD700" },
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <View>
            <Text style={styles.title}>Analytics</Text>
            <Text style={styles.subtitle}>Performance insights</Text>
          </View>
          <TouchableOpacity style={styles.exportButton}>
            <Ionicons name="download-outline" size={24} color="#FFD700" />
          </TouchableOpacity>
        </Animated.View>

        {/* Time Range Selector */}
        <View style={styles.timeRangeSelector}>
          {["Week", "Month", "Year"].map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.timeRangeButton,
                timeRange === range.toLowerCase() && styles.activeRange,
              ]}
              onPress={() => setTimeRange(range.toLowerCase())}
            >
              <Text
                style={[
                  styles.rangeText,
                  timeRange === range.toLowerCase() && styles.activeRangeText,
                ]}
              >
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Revenue Trend */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Revenue Trend ($)</Text>
          <LineChart
            data={revenueData}
            width={width - 40}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Performance & Distribution */}
        <View style={styles.row}>
          <View style={[styles.chartCard, { width: "100%" }]}>
            <Text style={styles.chartTitle}>Class Distribution</Text>
            <PieChart
              data={classAttendanceData}
              width={width - 40}
              height={180}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
        </View>

        {/* Key Metrics Summary */}
        <View style={styles.insightsSection}>
          <Text style={styles.chartTitle}>Key Insights</Text>
          <View style={styles.insightItem}>
            <Ionicons name="trending-up" size={18} color="#59cb01" />
            <Text style={styles.insightText}>
              Revenue grew by 12.5% this {timeRange}.
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.insightText}>
              Member satisfaction at all-time high (92%).
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0c1519" },
  container: { flex: 1, paddingHorizontal: 20 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c1519",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  subtitle: { color: "#8a9a9f", fontSize: 14 },
  exportButton: { padding: 10, backgroundColor: "#1e2b2f", borderRadius: 12 },
  timeRangeSelector: {
    flexDirection: "row",
    backgroundColor: "#1e2b2f",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeRange: { backgroundColor: "#FFD700" },
  rangeText: { color: "#8a9a9f", fontWeight: "600" },
  activeRangeText: { color: "#000" },
  chartCard: {
    backgroundColor: "#1e2b2f",
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  chartTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  chart: { marginVertical: 8, borderRadius: 16 },
  insightsSection: { marginBottom: 40 },
  insightItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e2b2f",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  insightText: { color: "#8a9a9f", marginLeft: 10, fontSize: 14 },
});

export default AnalyticsScreen;
