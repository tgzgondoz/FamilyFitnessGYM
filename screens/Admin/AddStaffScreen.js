// screens/Admin/AddStaffScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";

const AddStaffScreen = ({ navigation }) => {
  const { addStaffMember, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "staff",
  });

  const handleAddStaff = async () => {
    if (!form.fullName || !form.email || !form.password) {
      Alert.alert(
        "Required Fields",
        "Please fill in all fields to create the account."
      );
      return;
    }

    try {
      setLoading(true);
      const result = await addStaffMember(form, user.id);

      if (result.success) {
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Error", result.error || "Failed to create account");
      }
    } catch (error) {
      Alert.alert("Error", "Check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <Ionicons name="arrow-back" size={28} color="#FFF" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Add Staff Member</Text>
              <Text style={styles.headerSubtitle}>
                Create a new account for your team
              </Text>
            </View>
          </View>

          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Tendai Moyo"
                placeholderTextColor="#8a9a9f"
                value={form.fullName}
                onChangeText={(text) => setForm({ ...form, fullName: text })}
              />
            </View>

            {/* Email Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="staff@recruitai.com"
                placeholderTextColor="#8a9a9f"
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Temporary Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a strong password"
                placeholderTextColor="#8a9a9f"
                secureTextEntry
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
              />
            </View>

            {/* Role Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>System Role</Text>
              <View style={styles.roleContainer}>
                {["staff", "manager"].map((role) => (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.roleButton,
                      form.role === role && styles.roleButtonActive,
                    ]}
                    onPress={() => setForm({ ...form, role: role })}
                  >
                    <Ionicons
                      name={role === "manager" ? "shield-checkmark" : "person"}
                      size={18}
                      color={form.role === role ? "#141f23" : "#59cb01"}
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={[
                        styles.roleText,
                        form.role === role && styles.roleTextActive,
                      ]}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, loading && { opacity: 0.7 }]}
              onPress={handleAddStaff}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#141f23" />
              ) : (
                <Text style={styles.submitText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#141f23",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 20,
    marginBottom: 30,
  },
  backBtn: {
    marginBottom: 20,
    marginLeft: -5,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: "#8a9a9f",
    fontSize: 15,
    marginTop: 4,
    fontWeight: "500",
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
  input: {
    backgroundColor: "#1e2b2f",
    borderRadius: 12,
    padding: 18,
    color: "#f2faea",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  roleContainer: {
    flexDirection: "row",
    gap: 12,
  },
  roleButton: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#1e2b2f",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  roleButtonActive: {
    backgroundColor: "#59cb01",
    borderColor: "#59cb01",
  },
  roleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#59cb01",
  },
  roleTextActive: {
    color: "#141f23",
  },
  submitButton: {
    backgroundColor: "#59cb01",
    padding: 20,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 15,
    // Adds a slight glow effect
    shadowColor: "#59cb01",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  submitText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#141f23",
  },
});

export default AddStaffScreen;
