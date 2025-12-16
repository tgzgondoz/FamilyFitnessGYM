// screens/StaffSalesScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const StaffSalesScreen = ({ navigation }) => {
  const [sales, setSales] = useState([
    { id: 1, type: 'Monthly Subscription', customer: 'John Doe', amount: 50, date: '2024-02-15' },
    { id: 2, type: 'Protein Powder', customer: 'Jane Smith', amount: 35, date: '2024-02-15' },
    { id: 3, type: 'Daily Pass', customer: 'Mike Johnson', amount: 5, date: '2024-02-14' },
  ]);

  const [newSale, setNewSale] = useState({
    type: '',
    customer: '',
    amount: '',
  });

  const reportToManager = () => {
    // This would trigger push notification in real app
    Alert.alert(
      'Report Sent',
      'Sales report has been sent to the manager via push notification',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Staff Sales Dashboard</Text>
      
      <View style={styles.addSaleCard}>
        <Text style={styles.sectionTitle}>Record New Sale</Text>
        <TextInput
          style={styles.input}
          placeholder="Sale Type (e.g., Monthly Sub, Supplements)"
          value={newSale.type}
          onChangeText={(text) => setNewSale({...newSale, type: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Customer Name"
          value={newSale.customer}
          onChangeText={(text) => setNewSale({...newSale, customer: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount ($)"
          keyboardType="decimal-pad"
          value={newSale.amount}
          onChangeText={(text) => setNewSale({...newSale, amount: text})}
        />
        <TouchableOpacity style={styles.addButton} onPress={reportToManager}>
          <Text style={styles.addButtonText}>Record Sale & Notify Manager</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Sales</Text>
        {sales.map((sale) => (
          <View key={sale.id} style={styles.saleItem}>
            <View style={styles.saleInfo}>
              <Text style={styles.saleType}>{sale.type}</Text>
              <Text style={styles.saleCustomer}>{sale.customer}</Text>
              <Text style={styles.saleDate}>{sale.date}</Text>
            </View>
            <Text style={styles.saleAmount}>${sale.amount}</Text>
          </View>
        ))}
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Daily Summary</Text>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>${sales.reduce((sum, sale) => sum + sale.amount, 0)}</Text>
            <Text style={styles.statLabel}>Total Sales</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{sales.length}</Text>
            <Text style={styles.statLabel}>Transactions</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  addSaleCard: { 
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
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  input: { 
    backgroundColor: '#f9f9f9', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee'
  },
  addButton: { 
    backgroundColor: '#FF9500', 
    padding: 15, 
    borderRadius: 10,
    alignItems: 'center'
  },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  section: { marginBottom: 25 },
  saleItem: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  saleInfo: { flex: 1 },
  saleType: { fontSize: 16, fontWeight: '600', color: '#333' },
  saleCustomer: { fontSize: 14, color: '#666', marginTop: 2 },
  saleDate: { fontSize: 12, color: '#999', marginTop: 2 },
  saleAmount: { fontSize: 18, fontWeight: 'bold', color: '#34C759' },
  statsCard: { 
    backgroundColor: '#5856D6', 
    padding: 25, 
    borderRadius: 15, 
    marginBottom: 20
  },
  statsTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 15 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { alignItems: 'center' },
  statNumber: { fontSize: 32, fontWeight: 'bold', color: 'white' },
  statLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 5 }
});

export default StaffSalesScreen;