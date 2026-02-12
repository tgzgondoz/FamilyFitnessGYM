import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../config/supabase";
import { useAuth } from "../contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const WorkoutHistory = ({ navigation }) => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("workout_sessions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "completed")
        .order("end_time", { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error("History Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  const formatDate = (dateString) => {
    const options = { weekday: "short", day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.dateBox}>
        <Text style={styles.dateDay}>{new Date(item.end_time).getDate()}</Text>
        <Text style={styles.dateMonth}>
          {new Date(item.end_time)
            .toLocaleString("default", { month: "short" })
            .toUpperCase()}
        </Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.workoutTitle}>Gym Session</Text>
        <Text style={styles.workoutMeta}>
          {formatDate(item.end_time)} • {item.duration_minutes} mins
        </Text>
      </View>

      <View style={styles.calBox}>
        <Ionicons name="flame" size={14} color="#FF4444" />
        <Text style={styles.calText}>{item.calories_burned} kcal</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workout History</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#59cb01" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={60} color="#2a3a3f" />
              <Text style={styles.emptyText}>No sessions recorded yet.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141f23" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
  backBtn: { backgroundColor: "#1e2b2f", padding: 8, borderRadius: 12 },
  listContent: { padding: 20 },
  historyCard: {
    backgroundColor: "#1e2b2f",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateBox: {
    backgroundColor: "#141f23",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    minWidth: 55,
  },
  dateDay: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  dateMonth: { color: "#59cb01", fontSize: 10, fontWeight: "bold" },
  details: { flex: 1, marginLeft: 15 },
  workoutTitle: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  workoutMeta: { color: "#8a9a9f", fontSize: 13, marginTop: 2 },
  calBox: { alignItems: "center", gap: 2 },
  calText: { color: "#FF4444", fontSize: 12, fontWeight: "bold" },
  emptyState: { alignItems: "center", marginTop: 100 },
  emptyText: { color: "#8a9a9f", marginTop: 15, fontSize: 16 },
});

export default WorkoutHistory;
