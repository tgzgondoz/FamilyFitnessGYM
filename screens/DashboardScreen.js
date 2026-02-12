import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../config/supabase";

const { width } = Dimensions.get("window");

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("month"); // 'week', 'month', 'year'
  const [transactions, setTransactions] = useState([]);
  const [topMembers, setTopMembers] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeCheckins: 0,
    newUsers: 0,
    totalClients: 0,
  });

  const [revenueData, setRevenueData] = useState({
    labels: ["N/A"],
    datasets: [{ data: [0] }],
  });

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      if (!refreshing) setLoading(true);

      const now = new Date();
      let startDate = new Date();
      if (timeRange === "week") startDate.setDate(now.getDate() - 7);
      else if (timeRange === "month") startDate.setMonth(now.getMonth() - 1);
      else startDate.setFullYear(now.getFullYear() - 1);

      const startDateISO = startDate.toISOString();

      // 1. Parallel Fetching for Speed
      const [
        clientsCount,
        checkInCount,
        newUsersRes,
        salesRes,
        recentSalesRes,
        topCheckins,
      ] = await Promise.all([
        // Total Clients
        supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("role", "client"),

        // Active In Gym (Last 24h)
        supabase
          .from("check_ins")
          .select("user_id", { count: "exact", head: true })
          .gte(
            "check_in_time",
            new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
          ),

        // New Joins (Joined in time range)
        supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .gte("created_at", startDateISO)
          .eq("role", "client"),

        // Revenue from 'sales' table to match StaffSalesScreen
        supabase
          .from("sales")
          .select("amount, created_at")
          .gte("created_at", startDateISO),

        // Recent Sales List
        supabase
          .from("sales")
          .select(
            `amount, product_name, created_at, client:users!sales_client_id_fkey(full_name)`
          )
          .order("created_at", { ascending: false })
          .limit(5),

        // Top Members Query
        supabase
          .from("check_ins")
          .select(`user_id, users:user_id(full_name)`)
          .gte("check_in_time", startDateISO)
          .not("user_id", "is", null),
      ]);

      // 2. Process Revenue
      const totalRev =
        salesRes.data?.reduce((sum, row) => sum + Number(row.amount), 0) || 0;

      // 3. Process Top Members (Consistency)
      const memberCounts = {};
      topCheckins.data?.forEach((ci) => {
        const id = ci.user_id;
        if (!memberCounts[id]) {
          memberCounts[id] = {
            name: ci.users?.full_name || "Member",
            count: 0,
          };
        }
        memberCounts[id].count += 1;
      });

      const sortedMembers = Object.values(memberCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      // 4. Group Revenue for Line Chart
      const groupedRevenue = salesRes.data?.reduce((acc, curr) => {
        const d = new Date(curr.created_at).toLocaleDateString([], {
          month: "short",
          day: "numeric",
        });
        acc[d] = (acc[d] || 0) + Number(curr.amount);
        return acc;
      }, {});

      const chartLabels = Object.keys(groupedRevenue || {}).slice(-6);
      const chartValues = Object.values(groupedRevenue || {}).slice(-6);

      setStats({
        totalRevenue: totalRev,
        activeCheckins: checkInCount.count || 0,
        newUsers: newUsersRes.count || 0,
        totalClients: clientsCount.count || 0,
      });

      setTopMembers(sortedMembers);
      setTransactions(recentSalesRes.data || []);

      if (chartLabels.length > 0) {
        setRevenueData({
          labels: chartLabels,
          datasets: [
            {
              data: chartValues,
              color: (opacity = 1) => `rgba(89, 203, 1, ${opacity})`,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <View style={styles.statCardWrapper}>
      <View style={styles.statCard}>
        <View
          style={[styles.statIconCircle, { backgroundColor: `${color}15` }]}
        >
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View
        style={[
          styles.safeArea,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#59cb01" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.topHeader}>
        <View>
          <Text style={styles.headerTitle}>Family Fitness</Text>
          <Text style={styles.headerSubtitle}>Revenue & Usage Dashboard</Text>
        </View>
        <View style={styles.selector}>
          {["week", "month", "year"].map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setTimeRange(r)}
              style={[styles.selBtn, timeRange === r && styles.selBtnActive]}
            >
              <Text
                style={[
                  styles.selText,
                  timeRange === r && styles.selTextActive,
                ]}
              >
                {r.charAt(0).toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchDashboardData();
            }}
            tintColor="#59cb01"
          />
        }
      >
        <View style={styles.statsGrid}>
          <StatCard
            title="Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            icon="cash-outline"
            color="#59cb01"
          />
          <StatCard
            title="In Gym"
            value={stats.activeCheckins}
            icon="walk-outline"
            color="#36a1d6"
          />
          <StatCard
            title="New Joins"
            value={stats.newUsers}
            icon="person-add-outline"
            color="#ffd93d"
          />
          <StatCard
            title="Total"
            value={stats.totalClients}
            icon="people-outline"
            color="#ff6b6b"
          />
        </View>

        {/* Consistent Members Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              Consistent Members ({timeRange})
            </Text>
            <Ionicons name="trophy" size={18} color="#FFD700" />
          </View>
          {topMembers.length > 0 ? (
            topMembers.map((member, i) => (
              <View key={i} style={styles.memberRow}>
                <View style={[styles.rankBadge, i === 0 && styles.goldRank]}>
                  <Text style={styles.rankText}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.actName}>{member.name}</Text>
                  <Text style={styles.actDate}>{member.count} check-ins</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No check-ins recorded.</Text>
          )}
        </View>

        {/* Revenue Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sales Trend ($)</Text>
          <LineChart
            data={revenueData}
            width={width - 48}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Recent Activity (Synced with Sales table) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Sales Activity</Text>
          {transactions.map((tx, i) => (
            <View key={i} style={styles.activityRow}>
              <View style={styles.activityIcon}>
                <Ionicons name="receipt-outline" size={18} color="#59cb01" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actName}>
                  {tx.client?.full_name || "Walk-in Guest"}
                </Text>
                <Text style={styles.actDate}>{tx.product_name}</Text>
              </View>
              <Text style={styles.actAmount}>+${tx.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#1e2b2f",
  backgroundGradientTo: "#1e2b2f",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(89, 203, 1, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(138, 154, 159, ${opacity})`,
  propsForDots: { r: "4", strokeWidth: "2", stroke: "#59cb01" },
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#141f23" },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#f2faea" },
  headerSubtitle: { fontSize: 13, color: "#8a9a9f" },
  selector: {
    flexDirection: "row",
    backgroundColor: "#1e2b2f",
    borderRadius: 12,
    padding: 4,
  },
  selBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  selBtnActive: { backgroundColor: "#59cb01" },
  selText: { color: "#8a9a9f", fontSize: 12, fontWeight: "700" },
  selTextActive: { color: "#141f23" },
  scrollBody: { paddingHorizontal: 16 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  statCardWrapper: { width: "50%", padding: 6 },
  statCard: {
    backgroundColor: "#1e2b2f",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  statIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: { fontSize: 20, fontWeight: "bold", color: "#f2faea" },
  statTitle: { fontSize: 12, color: "#8a9a9f", marginTop: 2 },
  card: {
    backgroundColor: "#1e2b2f",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: { color: "#f2faea", fontSize: 16, fontWeight: "700" },
  memberRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2c3e44",
    justifyContent: "center",
    alignItems: "center",
  },
  goldRank: {
    backgroundColor: "#FFD70033",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  rankText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  chart: { marginLeft: -16, borderRadius: 16 },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.03)",
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(89, 203, 1, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  actName: { color: "#f2faea", fontSize: 14, fontWeight: "600" },
  actDate: { color: "#8a9a9f", fontSize: 11 },
  actAmount: { color: "#59cb01", fontWeight: "bold", fontSize: 14 },
  emptyText: { color: "#4a5a5f", textAlign: "center", padding: 10 },
});

export default DashboardScreen;
