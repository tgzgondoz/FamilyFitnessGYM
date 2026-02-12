import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { supabase } from "../config/supabase";
import { useAuth } from "../contexts/AuthContext";

const AttendanceScreen = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState([]);
  const [recentCheckIns, setRecentCheckIns] = useState([]);

  // New State for Modal/Walk-in
  const [showModal, setShowModal] = useState(false);
  const [walkInName, setWalkInName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const twentyFourHoursAgo = new Date(
        Date.now() - 24 * 60 * 60 * 1000
      ).toISOString();

      const [clientsRes, checkInsRes] = await Promise.all([
        supabase
          .from("users")
          .select("id, full_name, email")
          .eq("role", "client"),
        supabase
          .from("check_ins")
          .select(
            `id, check_in_time, walk_in_name, user_id, users:user_id (full_name)`
          )
          .gte("check_in_time", twentyFourHoursAgo)
          .order("check_in_time", { ascending: false }),
      ]);

      setClients(clientsRes.data || []);
      setRecentCheckIns(checkInsRes.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Logic to handle checking in a registered member
  const handleCheckIn = async (clientId, clientName) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("check_ins").insert([
        {
          user_id: clientId,
          check_in_time: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      Alert.alert("Success", `${clientName} checked in!`);
      setSearch(""); // Clear search to go back to active list
      fetchData();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Logic for Walk-in Guest
  const handleWalkIn = async () => {
    if (!walkInName.trim()) return Alert.alert("Error", "Enter guest name");

    try {
      setLoading(true);
      const { error } = await supabase.from("check_ins").insert([
        {
          walk_in_name: walkInName,
          check_in_time: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setShowModal(false);
      setWalkInName("");
      fetchData();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id, name) => {
    Alert.alert("Remove Check-in", `Are you sure you want to remove ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("check_ins")
            .delete()
            .eq("id", id);
          if (!error) fetchData();
        },
      },
    ]);
  };

  const renderRightActions = (id, name) => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => confirmDelete(id, name)}
    >
      <Ionicons name="trash-outline" size={24} color="#fff" />
      <Text style={styles.deleteActionText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderActiveItem = ({ item }) => {
    const name = item.users?.full_name || item.walk_in_name || "Guest";
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id, name)}>
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.initials}>{name.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.timeText}>
              {new Date(item.check_in_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <View style={styles.badge}>
            <View style={styles.pulse} />
            <Text style={styles.badgeText}>IN</Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Attendance</Text>
          <View style={styles.statBadge}>
            <Text style={styles.statText}>{recentCheckIns.length} Active</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            placeholder="Search member to check in..."
            placeholderTextColor="#666"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <FlatList
          data={
            search.trim().length > 0
              ? clients.filter((c) =>
                  c.full_name?.toLowerCase().includes(search.toLowerCase())
                )
              : recentCheckIns
          }
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
          renderItem={
            search.trim().length > 0
              ? ({ item }) => (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => handleCheckIn(item.id, item.full_name)}
                  >
                    <View
                      style={[styles.avatar, { backgroundColor: "#59cb01" }]}
                    >
                      <Ionicons name="person" size={20} color="#000" />
                    </View>
                    <Text style={styles.nameText}>{item.full_name}</Text>
                    <Ionicons name="add-circle" size={28} color="#59cb01" />
                  </TouchableOpacity>
                )
              : renderActiveItem
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchData}
              tintColor="#59cb01"
            />
          }
        />

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
          <Ionicons name="walk" size={24} color="#000" />
          <Text style={styles.fabText}>Walk-in</Text>
        </TouchableOpacity>

        {/* Walk-in Modal */}
        <Modal visible={showModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Guest Check-in</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Guest Name"
                placeholderTextColor="#666"
                value={walkInName}
                onChangeText={setWalkInName}
                autoFocus
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={handleWalkIn}
                >
                  <Text style={styles.confirmBtnText}>Check In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0c1519" },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  statBadge: {
    backgroundColor: "rgba(89, 203, 1, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statText: { color: "#59cb01", fontWeight: "bold" },
  searchBox: { paddingHorizontal: 20, marginBottom: 15 },
  input: {
    backgroundColor: "#1e2b2f",
    color: "#fff",
    padding: 15,
    borderRadius: 12,
  },
  card: {
    backgroundColor: "#1e2b2f",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#59cb01",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  initials: { fontWeight: "bold", color: "#000" },
  nameText: { color: "#fff", fontSize: 16, fontWeight: "bold", flex: 1 },
  timeText: { color: "#8a9a9f", fontSize: 12 },
  badge: { flexDirection: "row", alignItems: "center", gap: 5 },
  pulse: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#59cb01" },
  badgeText: { color: "#59cb01", fontSize: 10, fontWeight: "bold" },
  deleteAction: {
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "85%",
    borderRadius: 12,
    marginBottom: 8,
  },
  deleteActionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 4,
  },
  // FAB Styles
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#59cb01",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: { color: "#000", fontWeight: "bold", marginLeft: 8 },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    padding: 20,
  },
  modalView: {
    backgroundColor: "#1e2b2f",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: "#0c1519",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end", gap: 15 },
  cancelBtn: { padding: 10 },
  cancelBtnText: { color: "#8a9a9f", fontWeight: "bold" },


  confirmBtn: {
    backgroundColor: "#59cb01",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  confirmBtnText: { color: "#000", fontWeight: "bold" },
});

export default AttendanceScreen;
