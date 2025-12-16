// screens/Auth/SignUpScreen.js (Alternative without Picker)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [role, setRole] = useState('client');
  const [membershipType, setMembershipType] = useState('monthly');

  const roles = [
    { label: 'Client', value: 'client' },
    { label: 'Staff', value: 'staff' },
    { label: 'Manager', value: 'manager' }
  ];

  const membershipTypes = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Daily', value: 'daily' }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput style={styles.input} placeholder="Full Name" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
      
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Role</Text>
        <View style={styles.buttonGroup}>
          {roles.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.roleButton,
                role === item.value && styles.roleButtonActive
              ]}
              onPress={() => setRole(item.value)}
            >
              <Text style={[
                styles.roleButtonText,
                role === item.value && styles.roleButtonTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Membership Type</Text>
        <View style={styles.buttonGroup}>
          {membershipTypes.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.roleButton,
                membershipType === item.value && styles.roleButtonActive
              ]}
              onPress={() => setMembershipType(item.value)}
            >
              <Text style={[
                styles.roleButtonText,
                membershipType === item.value && styles.roleButtonTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 15, 
    marginBottom: 15, 
    borderRadius: 8,
    fontSize: 16
  },
  pickerContainer: { marginBottom: 20 },
  label: { marginBottom: 10, fontWeight: '600', fontSize: 16 },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  roleButtonText: {
    fontSize: 16,
    color: '#666',
  },
  roleButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  button: { 
    backgroundColor: '#34C759', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 20,
    marginTop: 10
  },
  buttonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16
  },
  link: { 
    textAlign: 'center', 
    color: '#007AFF',
    fontSize: 16
  }
});

export default SignUpScreen;