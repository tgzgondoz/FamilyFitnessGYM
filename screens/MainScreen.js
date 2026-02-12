import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../config/supabase";
import { useFocusEffect } from "@react-navigation/native";

const MainScreen = ({ navigation }) => {
  const { user, isManager, isStaff } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  // Modals Toggle
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [showCalorieModal, setShowCalorieModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  // Functional State
  const [activeSession, setActiveSession] = useState(null);
  const [timerDisplay, setTimerDisplay] = useState("00:00:00");
  const [dailyTasks, setDailyTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  const [stats, setStats] = useState({
    workouts: 0,
    hours: 0,
    calories: 0,
    achievements: 0,
    expiryDate: "N/A",
    planName: "No Active Plan",
  });

  const [analytics, setAnalytics] = useState({
    todaySales: 0,
    todayCheckins: 0,
  });

  // Progress Calculation
  const completedCount = dailyTasks.filter((t) => t.is_completed).length;
  const totalCount = dailyTasks.length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Timer Tick Logic
  useEffect(() => {
    let interval;
    if (activeSession) {
      interval = setInterval(() => {
        const start = new Date(activeSession.start_time);
        const diff = Math.floor((new Date() - start) / 1000);
        const h = Math.floor(diff / 3600)
          .toString()
          .padStart(2, "0");
        const m = Math.floor((diff % 3600) / 60)
          .toString()
          .padStart(2, "0");
        const s = (diff % 60).toString().padStart(2, "0");
        setTimerDisplay(`${h}:${m}:${s}`);
      }, 1000);
    } else {
      setTimerDisplay("00:00:00");
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  const fetchData = async () => {
    try {
      // Syncing Today's Start to UTC Midnight
      const startOfToday = new Date();
      startOfToday.setUTCHours(0, 0, 0, 0);
      const isoToday = startOfToday.toISOString();

      const [sessionRes, tasksRes, statsRes, lastSaleRes] = await Promise.all([
        supabase
          .from("workout_sessions")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "active")
          .maybeSingle(),
        supabase
          .from("daily_workouts")
          .select("*")
          .eq("user_id", user.id)
          .gte("created_at", isoToday)
          .order("created_at", { ascending: true }),
        supabase
          .from("workout_sessions")
          .select("duration_minutes, calories_burned")
          .eq("user_id", user.id)
          .eq("status", "completed"),
        supabase
          .from("sales")
          .select("created_at, product_name")
          .eq("client_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

      setActiveSession(sessionRes.data);
      setDailyTasks(tasksRes.data || []);

      const totalMins =
        statsRes.data?.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) ||
        0;
      const totalCals =
        statsRes.data?.reduce((sum, s) => sum + (s.calories_burned || 0), 0) ||
        0;

      setStats({
        workouts: statsRes.data?.length || 0,
        hours: (totalMins / 60).toFixed(1),
        calories: Math.round(totalCals),
        achievements: Math.floor(totalCals / 1000),
        expiryDate: lastSaleRes.data
          ? new Date(
              new Date(lastSaleRes.data.created_at).setDate(
                new Date(lastSaleRes.data.created_at).getDate() + 30
              )
            ).toLocaleDateString("en-GB")
          : "N/A",
        planName: lastSaleRes.data?.product_name || "No Active Plan",
      });

      // BUSINESS ANALYTICS FOR STAFF/MANAGERS
      if (isStaff() || isManager()) {
        const [salesRes, trafficRes] = await Promise.all([
          supabase.from("sales").select("amount").gte("created_at", isoToday),
          supabase
            .from("check_ins") // Fixed table name
            .select("*", { count: "exact", head: true })
            .gte("check_in_time", isoToday), // Fixed column name
        ]);

        const totalSales =
          salesRes.data?.reduce((sum, item) => sum + (item.amount || 0), 0) ||
          0;

        setAnalytics({
          todaySales: totalSales,
          todayCheckins: trafficRes.count || 0,
        });
      }
    } catch (err) {
      console.error("Fetch Main Data Error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleWorkoutAction = async () => {
    if (activeSession) {
      const end = new Date();
      const start = new Date(activeSession.start_time);
      const durationMins = Math.max(1, Math.floor((end - start) / 60000));
      await supabase
        .from("workout_sessions")
        .update({
          end_time: end.toISOString(),
          duration_minutes: durationMins,
          calories_burned: durationMins * 10,
          status: "completed",
        })
        .eq("id", activeSession.id);
      setActiveSession(null);
      Alert.alert("Success", "Workout session saved!");
    } else {
      const { data } = await supabase
        .from("workout_sessions")
        .insert([{ user_id: user.id, start_time: new Date().toISOString() }])
        .select()
        .single();
      setActiveSession(data);
    }
    fetchData();
  };

  const addTask = async () => {
    if (!newTaskName.trim()) return;
    await supabase
      .from("daily_workouts")
      .insert([{ user_id: user.id, workout_name: newTaskName }]);
    setNewTaskName("");
    fetchData();
  };

  const resetRoutine = async () => {
    Alert.alert("Reset Today", "Remove all workouts?", [
      { text: "Cancel" },
      {
        text: "Reset",
        onPress: async () => {
          const t = new Date();
          t.setUTCHours(0, 0, 0, 0);
          await supabase
            .from("daily_workouts")
            .delete()
            .eq("user_id", user.id)
            .gte("created_at", t.toISOString());
          fetchData();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchData}
            tintColor="#59cb01"
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>{user?.full_name}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {user?.full_name?.charAt(0)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* STAFF/MANAGER QUICK ACTIONS ROW */}
        {(isStaff() || isManager()) && (
          <View style={styles.staffActionRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate("Attendance")}
            >
              <Ionicons name="people" size={20} color="#59cb01" />
              <Text style={styles.actionBtnText}>Check-In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate("Sales")}
            >
              <Ionicons name="cash" size={20} color="#59cb01" />
              <Text style={styles.actionBtnText}>Sale</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.membershipCard}>
          <Text style={styles.membershipTitle}>ACTIVE PLAN</Text>
          <Text style={styles.planNameText}>{stats.planName}</Text>
          <Text style={styles.expiryText}>Expires: {stats.expiryDate}</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Subscription")}
          >
            <Text style={styles.primaryButtonText}>Manage Plan</Text>
          </TouchableOpacity>
        </View>

        {(isStaff() || isManager()) && (
          <View style={styles.analyticsSection}>
            <Text style={styles.sectionTitle}>Gym Pulse (Today)</Text>
            <View style={styles.analyticsRow}>
              <View style={styles.analyticsCard}>
                <Text style={styles.analyticsLabel}>Sales Revenue</Text>
                <Text style={styles.analyticsValue}>
                  ${analytics.todaySales.toFixed(2)}
                </Text>
              </View>
              <View
                style={[styles.analyticsCard, { borderLeftColor: "#FFD700" }]}
              >
                <Text style={styles.analyticsLabel}>Client Traffic</Text>
                <Text style={styles.analyticsValue}>
                  {analytics.todayCheckins}
                </Text>
              </View>
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Your Fitness Progress</Text>
        <View style={styles.statsContainer}>
          <StatTile
            icon="barbell"
            color="#59cb01"
            value={stats.workouts}
            label="Workouts"
            onPress={() => setShowWorkoutModal(true)}
          />
          <StatTile
            icon="time"
            color="#007AFF"
            value={`${stats.hours}h`}
            label="Hours"
            onPress={() => setShowTimerModal(true)}
          />
          <StatTile
            icon="flame"
            color="#FF4444"
            value={stats.calories}
            label="Calories"
            onPress={() => setShowCalorieModal(true)}
          />
          <StatTile
            icon="trophy"
            color="#FFD700"
            value={stats.achievements}
            label="Badges"
            onPress={() => setShowBadgeModal(true)}
          />

          <TouchableOpacity
            style={styles.historyTile}
            onPress={() => navigation.navigate("WorkoutHistory")}
          >
            <Ionicons name="calendar" size={20} color="#59cb01" />
            <Text style={styles.historyText}>Detailed Workout History</Text>
            <Ionicons name="chevron-forward" size={18} color="#8a9a9f" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* WORKOUT ROUTINE MODAL */}
      <Modal visible={showWorkoutModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Daily Routine</Text>
                <Text style={styles.modalSubtitle}>
                  {completedCount}/{totalCount} Done
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity onPress={resetRoutine}>
                  <Ionicons name="refresh" size={24} color="#FF4444" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowWorkoutModal(false)}>
                  <Ionicons name="close-circle" size={30} color="#8a9a9f" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.gaugeBackground}>
              <View
                style={[styles.gaugeFill, { width: `${progressPercent}%` }]}
              />
            </View>
            <View style={styles.addTaskRow}>
              <TextInput
                style={styles.modalInput}
                placeholder="Add workout..."
                placeholderTextColor="#666"
                value={newTaskName}
                onChangeText={setNewTaskName}
              />
              <TouchableOpacity style={styles.modalAddBtn} onPress={addTask}>
                <Ionicons name="add" size={24} color="#141f23" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {dailyTasks.map((t) => (
                <View key={t.id} style={styles.taskItem}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                    onPress={async () => {
                      await supabase
                        .from("daily_workouts")
                        .update({ is_completed: !t.is_completed })
                        .eq("id", t.id);
                      fetchData();
                    }}
                  >
                    <Ionicons
                      name={
                        t.is_completed ? "checkmark-circle" : "ellipse-outline"
                      }
                      size={24}
                      color={t.is_completed ? "#59cb01" : "#8a9a9f"}
                    />
                    <Text
                      style={[
                        styles.taskText,
                        t.is_completed && {
                          textDecorationLine: "line-through",
                          color: "#8a9a9f",
                        },
                      ]}
                    >
                      {t.workout_name}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      await supabase
                        .from("daily_workouts")
                        .delete()
                        .eq("id", t.id);
                      fetchData();
                    }}
                  >
                    <Ionicons name="trash-outline" size={18} color="#FF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* TIMER MODAL */}
      <Modal visible={showTimerModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { alignItems: "center" }]}>
            <Text style={styles.bigTimer}>{timerDisplay}</Text>
            <TouchableOpacity
              style={[
                styles.bigTimerBtn,
                activeSession ? styles.stopBtn : styles.startBtn,
              ]}
              onPress={handleWorkoutAction}
            >
              <Text style={styles.bigTimerBtnText}>
                {activeSession ? "STOP WORKOUT" : "START WORKOUT"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => setShowTimerModal(false)}
            >
              <Text style={{ color: "#8a9a9f" }}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const StatTile = ({ icon, color, value, label, onPress }) => (
  <TouchableOpacity style={styles.statItem} onPress={onPress}>
    <View style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.statNumber}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#141f23" },
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 25,
  },
  greeting: { fontSize: 14, color: "#8a9a9f" },
  userName: { fontSize: 24, fontWeight: "bold", color: "#FFF" },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1e2b2f",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: { fontSize: 20, color: "#59cb01", fontWeight: "bold" },
  staffActionRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  actionBtn: {
    flex: 1,
    backgroundColor: "#1e2b2f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionBtnText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  membershipCard: {
    backgroundColor: "#1e2b2f",
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  membershipTitle: { color: "#8a9a9f", fontSize: 10, fontWeight: "bold" },
  planNameText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  expiryText: { color: "#8a9a9f", marginBottom: 15 },
  primaryButton: {
    backgroundColor: "#59cb01",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: { color: "#141f23", fontWeight: "bold" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15,
  },
  analyticsSection: { marginBottom: 10 },
  analyticsRow: { flexDirection: "row", gap: 10, marginBottom: 25 },
  analyticsCard: {
    flex: 1,
    backgroundColor: "#1e2b2f",
    padding: 15,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#59cb01",
  },
  analyticsLabel: { color: "#8a9a9f", fontSize: 12 },
  analyticsValue: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    backgroundColor: "#1e2b2f",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statNumber: { fontSize: 22, fontWeight: "bold", color: "#FFF" },
  statLabel: { fontSize: 12, color: "#8a9a9f" },
  historyTile: {
    width: "100%",
    backgroundColor: "#1e2b2f",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  historyText: { flex: 1, color: "#FFF", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1e2b2f",
    borderRadius: 25,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  modalTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  modalSubtitle: { color: "#8a9a9f", fontSize: 14, marginBottom: 15 },
  gaugeBackground: {
    height: 6,
    backgroundColor: "#141f23",
    borderRadius: 3,
    marginBottom: 15,
  },
  gaugeFill: { height: "100%", backgroundColor: "#59cb01", borderRadius: 3 },
  addTaskRow: { flexDirection: "row", gap: 10, marginBottom: 15 },
  modalInput: {
    flex: 1,
    backgroundColor: "#141f23",
    padding: 12,
    borderRadius: 12,
    color: "#fff",
  },
  modalAddBtn: {
    backgroundColor: "#59cb01",
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2a3a3f",
  },
  taskText: { color: "#fff", fontSize: 16 },
  bigTimer: {
    fontSize: 50,
    color: "#59cb01",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
  },
  bigTimerBtn: {
    width: "100%",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  startBtn: { backgroundColor: "#59cb01" },
  stopBtn: { backgroundColor: "#FF4444" },
  bigTimerBtnText: { fontWeight: "bold", color: "#141f23" },
});

export default MainScreen;
