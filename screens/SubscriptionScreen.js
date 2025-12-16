// screens/SubscriptionScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const SubscriptionScreen = ({ navigation }) => {
  const [subscription, setSubscription] = useState({
    type: 'Monthly',
    status: 'Active',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    daysLeft: 3
  });

  const plans = [
    { name: 'Monthly Plan', price: '$50', duration: '30 days', features: ['Unlimited Access', 'All Facilities', 'Free Towel Service'] },
    { name: 'Daily Plan', price: '$5', duration: '1 day', features: ['Single Day Access', 'Basic Facilities'] },
    { name: '3-Month Plan', price: '$135', duration: '90 days', features: ['Unlimited Access', 'All Facilities', '1 Personal Training'] }
  ];

  const handleRenewal = (planName) => {
    Alert.alert(
      'Renew Membership',
      `Would you like to renew with ${planName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Pay via EcoCash', 
          onPress: () => navigation.navigate('EcoCashPayment', { plan: planName })
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Subscription</Text>
      
      <View style={styles.currentSubscription}>
        <Text style={styles.subscriptionTitle}>Current Plan</Text>
        <Text style={styles.planName}>{subscription.type} Plan</Text>
        <Text style={[styles.status, subscription.status === 'Active' ? styles.active : styles.expired]}>
          {subscription.status}
        </Text>
        
        <View style={styles.datesContainer}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Start Date</Text>
            <Text style={styles.date}>{subscription.startDate}</Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>End Date</Text>
            <Text style={styles.date}>{subscription.endDate}</Text>
          </View>
        </View>
        
        <View style={styles.daysLeftContainer}>
          <Text style={styles.daysLeftText}>
            {subscription.daysLeft} {subscription.daysLeft === 1 ? 'day' : 'days'} left
          </Text>
          {subscription.daysLeft <= 3 && (
            <Text style={styles.warningText}>⚠️ Renew soon to avoid interruption</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Renew or Upgrade Plan</Text>
        {plans.map((plan, index) => (
          <View key={index} style={styles.planCard}>
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planDuration}>{plan.duration}</Text>
              </View>
              <Text style={styles.planPrice}>{plan.price}</Text>
            </View>
            
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, idx) => (
                <Text key={idx} style={styles.featureText}>✓ {feature}</Text>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => handleRenewal(plan.name)}
            >
              <Text style={styles.selectButtonText}>Select Plan</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.invoiceButton}>
        <Text style={styles.invoiceButtonText}>📄 Generate & Share Invoice via WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  currentSubscription: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  subscriptionTitle: { fontSize: 16, color: '#666', marginBottom: 5 },
  planName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  status: { 
    fontSize: 16, 
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 15
  },
  active: { backgroundColor: '#d4edda', color: '#155724' },
  expired: { backgroundColor: '#f8d7da', color: '#721c24' },
  datesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  dateBox: { width: '48%' },
  dateLabel: { fontSize: 14, color: '#666', marginBottom: 5 },
  date: { fontSize: 16, fontWeight: '600' },
  daysLeftContainer: { 
    backgroundColor: '#fff3cd', 
    padding: 15, 
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107'
  },
  daysLeftText: { fontSize: 18, fontWeight: 'bold', color: '#856404' },
  warningText: { fontSize: 14, color: '#856404', marginTop: 5 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  planCard: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 12, 
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  planDuration: { fontSize: 14, color: '#666' },
  planPrice: { fontSize: 24, fontWeight: 'bold', color: '#007AFF' },
  featuresContainer: { marginBottom: 15 },
  featureText: { fontSize: 14, color: '#555', marginBottom: 5 },
  selectButton: { 
    backgroundColor: '#34C759', 
    padding: 12, 
    borderRadius: 8,
    alignItems: 'center'
  },
  selectButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  invoiceButton: { 
    backgroundColor: '#25D366', 
    padding: 15, 
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30
  },
  invoiceButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});

export default SubscriptionScreen;