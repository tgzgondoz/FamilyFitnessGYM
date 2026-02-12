import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    phone_number: user?.phone_number || "",
    email: user?.email || "",
  });

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => await logout(),
      },
    ]);
  };

  const handleSave = async () => {
    if (!formData.full_name.trim() || !formData.phone_number.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setLoading(true);
    const result = await updateProfile(formData);
    setLoading(false);
    if (result.success) {
      Alert.alert("Success", "Profile updated");
      setIsEditing(false);
    } else {
      Alert.alert("Error", result.error || "Update failed");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#f2faea" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons
              name={isEditing ? "close" : "create-outline"}
              size={24}
              color="#59cb01"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            {user?.profile_image ? (
              <Image
                source={{ uri: user.profile_image }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user?.full_name?.charAt(0)}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() =>
                Alert.alert("Upload", "Upload feature coming soon")
              }
            >
              <Ionicons name="camera" size={20} color="#141f23" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.full_name}
              onChangeText={(t) => setFormData({ ...formData, full_name: t })}
              placeholderTextColor="#8a9a9f"
            />
          ) : (
            <Text style={styles.value}>{user?.full_name}</Text>
          )}

          <View style={{ height: 20 }} />

          <Text style={styles.label}>Phone</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.phone_number}
              onChangeText={(t) =>
                setFormData({ ...formData, phone_number: t })
              }
              keyboardType="phone-pad"
              placeholderTextColor="#8a9a9f"
            />
          ) : (
            <Text style={styles.value}>{user?.phone_number || "Not set"}</Text>
          )}

          {isEditing && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#141f23" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#ff6b6b" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// ... Styles remain the same as your provided code
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#141f23" },
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(242, 250, 234, 0.1)",
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#f2faea" },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(89, 203, 1, 0.1)",
  },
  avatarContainer: { alignItems: "center", marginBottom: 20 },
  avatarWrapper: { position: "relative" },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#59cb01",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 48, fontWeight: "bold", color: "#141f23" },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#59cb01",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#141f23",
  },
  formContainer: {
    backgroundColor: "rgba(242, 250, 234, 0.05)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
  },
  label: { fontSize: 14, color: "#8a9a9f", marginBottom: 8, fontWeight: "600" },
  value: { fontSize: 18, color: "#f2faea", fontWeight: "500" },
  input: {
    backgroundColor: "rgba(20, 31, 35, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(242, 250, 234, 0.1)",
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    color: "#f2faea",
  },
  saveButton: {
    backgroundColor: "#59cb01",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: { fontSize: 18, fontWeight: "bold", color: "#141f23" },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    paddingVertical: 18,
    borderRadius: 14,
    gap: 12,
    marginBottom: 40,
  },
  logoutButtonText: { fontSize: 18, fontWeight: "bold", color: "#ff6b6b" },
});

export default ProfileScreen;
