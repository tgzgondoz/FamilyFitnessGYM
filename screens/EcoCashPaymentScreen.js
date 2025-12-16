// screens/EcoCashPaymentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

const EcoCashPaymentScreen = ({ route, navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('50');
  const { plan } = route.params || {};

  const handlePayment = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    Alert.alert(
      'Confirm EcoCash Payment',
      `Send $${amount} to ${phoneNumber} for ${plan || 'Monthly Plan'}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm Payment', 
          onPress: () => {
            Alert.alert(
              'Payment Successful!',
              'Your subscription has been renewed. Check WhatsApp for invoice.',
              [
                { 
                  text: 'OK', 
                  onPress: () => navigation.navigate('Main')
                }
              ]
            );
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>EcoCash Payment</Text>
      
      <View style={styles.paymentCard}>
        <Text style={styles.planName}>{plan || 'Monthly Plan'}</Text>
        <Text style={styles.amount}>Amount: ${amount}</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>EcoCash Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="077XXXXXXX"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Amount (USD)</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Payment Instructions:</Text>
        <Text style={styles.infoText}>1. Enter your EcoCash registered number</Text>
        <Text style={styles.infoText}>2. Confirm the amount</Text>
        <Text style={styles.infoText}>3. You will receive a EcoCash prompt</Text>
        <Text style={styles.infoText}>4. Enter your EcoCash PIN to complete</Text>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Proceed to EcoCash Payment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpButton}>
        <Text style={styles.helpButtonText}>Need Help? Contact Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  paymentCard: { 
    backgroundColor: '#007AFF', 
    padding: 25, 
    borderRadius: 15, 
    marginBottom: 25,
    alignItems: 'center'
  },
  planName: { fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  amount: { fontSize: 18, color: 'white', fontWeight: '600' },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  input: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 10, 
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  infoBox: { 
    backgroundColor: '#e7f3ff', 
    padding: 20, 
    borderRadius: 10, 
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF'
  },
  infoTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#007AFF' },
  infoText: { fontSize: 14, color: '#333', marginBottom: 5 },
  payButton: { 
    backgroundColor: '#34C759', 
    padding: 18, 
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  },
  payButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  helpButton: { 
    backgroundColor: 'transparent', 
    padding: 15, 
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF'
  },
  helpButtonText: { color: '#007AFF', fontWeight: '600', fontSize: 16 }
});

export default EcoCashPaymentScreen;