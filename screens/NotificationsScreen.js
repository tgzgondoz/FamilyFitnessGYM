// screens/NotificationsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const NotificationsScreen = ({ navigation }) => {
  const notifications = [
    { id: 1, type: 'subscription', message: 'New monthly subscription purchased by Sarah Johnson', time: '2 hours ago', read: false },
    { id: 2, type: 'renewal', message: '3 monthly subscriptions expiring in 3 days', time: '1 day ago', read: true },
    { id: 3, type: 'sale', message: 'Staff: John sold protein supplements - $75', time: '2 days ago', read: true },
    { id: 4, type: 'payment', message: 'EcoCash payment received from Mike - $50', time: '3 days ago', read: true },
    { id: 5, type: 'system', message: 'System maintenance scheduled for tonight', time: '1 week ago', read: true },
  ];

  const sendTestNotification = () => {
    // This would trigger push notification in real app
    alert('Test push notification sent!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity style={styles.testButton} onPress={sendTestNotification}>
          <Text style={styles.testButtonText}>Test Push</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.notificationStats}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{notifications.filter(n => !n.read).length}</Text>
          <Text style={styles.statLabel}>Unread</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{notifications.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {notifications.map((notification) => (
        <TouchableOpacity 
          key={notification.id} 
          style={[
            styles.notificationCard,
            !notification.read && styles.unreadCard
          ]}
        >
          <View style={styles.notificationHeader}>
            <View style={[
              styles.notificationType,
              styles[`type${notification.type}`]
            ]}>
              <Text style={styles.typeText}>
                {notification.type === 'subscription' && '📊'}
                {notification.type === 'renewal' && '🔄'}
                {notification.type === 'sale' && '💰'}
                {notification.type === 'payment' && '💳'}
                {notification.type === 'system' && '⚙️'}
              </Text>
            </View>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>
          <Text style={[
            styles.notificationMessage,
            !notification.read && styles.unreadMessage
          ]}>
            {notification.message}
          </Text>
          {!notification.read && (
            <View style={styles.unreadDot} />
          )}
        </TouchableOpacity>
      ))}

      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Notification Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Push Notifications</Text>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.toggleText}>ON</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Subscription Alerts</Text>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.toggleText}>ON</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Sales Reports</Text>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.toggleText}>ON</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold' },
  testButton: { backgroundColor: '#007AFF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  testButtonText: { color: 'white', fontWeight: '600' },
  notificationStats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 25 },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 32, fontWeight: 'bold', color: '#007AFF' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 5 },
  notificationCard: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 12, 
    marginBottom: 15,
    position: 'relative'
  },
  unreadCard: { borderLeftWidth: 4, borderLeftColor: '#007AFF' },
  notificationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  notificationType: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  typesubscription: { backgroundColor: '#d4edda' },
  typerenewal: { backgroundColor: '#fff3cd' },
  typesale: { backgroundColor: '#d1ecf1' },
  typepayment: { backgroundColor: '#cce5ff' },
  typesystem: { backgroundColor: '#e2e3e5' },
  typeText: { fontSize: 20 },
  notificationTime: { fontSize: 12, color: '#999' },
  notificationMessage: { fontSize: 16, color: '#666' },
  unreadMessage: { fontWeight: '600', color: '#333' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#007AFF', position: 'absolute', top: 15, right: 15 },
  settingsSection: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginTop: 10, marginBottom: 30 },
  settingsTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  settingText: { fontSize: 16, color: '#333' },
  toggleActive: { backgroundColor: '#34C759', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15 },
  toggleText: { color: 'white', fontWeight: '600' }
});

export default NotificationsScreen;