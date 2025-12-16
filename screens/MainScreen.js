// screens/MainScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const MainScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Family Fitness Gym</Text>
      <Text style={styles.motto}>Join the Movement</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Membership Status</Text>
        <Text style={styles.cardText}>Active - Monthly Plan</Text>
        <Text style={styles.cardText}>Expires: 2024-03-15</Text>
        <TouchableOpacity style={styles.smallButton}>
          <Text style={styles.smallButtonText}>Renew Now</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.gridButtonText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.gridButtonText}>My Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.gridButtonText}>Pay via EcoCash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.gridButtonText}>View Invoice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.gridButtonText}>Sales Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.gridButtonText}>Client Analytics</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.motivationSection}>
        <Text style={styles.sectionTitle}>Stay Motivated! 💪</Text>
        <Text style={styles.motivationText}>• Today's Workout: Cardio Blast</Text>
        <Text style={styles.motivationText}>• Member of the Month: John Doe</Text>
        <Text style={styles.motivationText}>• Special Offer: 20% off Supplements</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  motto: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#666' },
  card: { backgroundColor: '#f8f9fa', padding: 20, borderRadius: 12, marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  cardText: { fontSize: 16, marginBottom: 5 },
  smallButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 8, marginTop: 10, alignSelf: 'flex-start' },
  smallButtonText: { color: 'white', fontWeight: '600' },
  buttonGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  gridButton: { backgroundColor: '#5856D6', width: '48%', padding: 20, borderRadius: 12, marginBottom: 15 },
  gridButtonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  motivationSection: { backgroundColor: '#FFD700', padding: 20, borderRadius: 12 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  motivationText: { fontSize: 16, marginBottom: 5 }
});

export default MainScreen;