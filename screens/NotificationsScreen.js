// screens/NotificationsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Animated
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNotification } from "../contexts/NotificationContext";

const NotificationsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "subscription",
      message: "New monthly subscription purchased by Sarah Johnson",
      time: "2 hours ago",
      read: false,
      icon: "card",
      color: "#59cb01"
    },
    {
      id: 2,
      type: "renewal",
      message: "3 monthly subscriptions expiring in 3 days",
      time: "1 day ago",
      read: true,
      icon: "refresh",
      color: "#ff6b6b"
    },
    {
      id: 3,
      type: "sale",
      message: "Staff: John sold protein supplements - $75",
      time: "2 days ago",
      read: true,
      icon: "cash",
      color: "#ffd93d"
    },
    {
      id: 4,
      type: "payment",
      message: "EcoCash payment received from Mike - $50",
      time: "3 days ago",
      read: true,
      icon: "phone-portrait",
      color: "#36a1d6"
    },
    {
      id: 5,
      type: "attendance",
      message: "Gym reached 85% capacity at 6:00 PM",
      time: "5 hours ago",
      read: false,
      icon: "people",
      color: "#9d4edd"
    },
    {
      id: 6,
      type: "achievement",
      message: "Member milestone: Jane completed 50 workouts!",
      time: "1 day ago",
      read: true,
      icon: "trophy",
      color: "#ff9e00"
    },
    {
      id: 7,
      type: "system",
      message: "System maintenance scheduled for tonight at 11 PM",
      time: "1 week ago",
      read: true,
      icon: "construct",
      color: "#8a9a9f"
    },
  ]);

  const { unreadCount, markAllAsRead } = useNotification();

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    markAllAsRead();
  };

  const getTimeAgo = (time) => {
    return time; // In real app, you'd calculate this from timestamp
  };

  const sendTestNotification = () => {
    const newNotification = {
      id: Date.now(),
      type: "test",
      message: "Test push notification received successfully!",
      time: "Just now",
      read: false,
      icon: "notifications",
      color: "#59cb01"
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#59cb01"
            colors={["#59cb01"]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>
              {notifications.filter(n => !n.read).length} unread • {notifications.length} total
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.markAllButton}
            onPress={markAllRead}
            disabled={notifications.filter(n => !n.read).length === 0}
          >
            <Text style={[
              styles.markAllText,
              notifications.filter(n => !n.read).length === 0 && styles.markAllDisabled
            ]}>
              Mark all read
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(89, 203, 1, 0.1)' }]}>
              <Ionicons name="today" size={20} color="#59cb01" />
            </View>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(255, 107, 107, 0.1)' }]}>
              <Ionicons name="alert-circle" size={20} color="#ff6b6b" />
            </View>
            <Text style={styles.statNumber}>{notifications.filter(n => !n.read).length}</Text>
            <Text style={styles.statLabel}>Unread</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(54, 161, 214, 0.1)' }]}>
              <Ionicons name="trending-up" size={20} color="#36a1d6" />
            </View>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
        </View>

        {/* Notification Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          <TouchableOpacity style={[styles.filterButton, styles.filterActive]}>
            <Text style={styles.filterActiveText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="card" size={16} color="#8a9a9f" />
            <Text style={styles.filterText}>Subscriptions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="cash" size={16} color="#8a9a9f" />
            <Text style={styles.filterText}>Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="people" size={16} color="#8a9a9f" />
            <Text style={styles.filterText}>Members</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="alert-circle" size={16} color="#8a9a9f" />
            <Text style={styles.filterText}>Alerts</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Notifications List */}
        <View style={styles.notificationsSection}>
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="notifications-off" size={64} color="#8a9a9f" />
              <Text style={styles.emptyText}>No notifications yet</Text>
              <Text style={styles.emptySubtext}>You're all caught up!</Text>
            </View>
          ) : (
            notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.read && styles.unreadCard
                ]}
                onPress={() => markAsRead(notification.id)}
                activeOpacity={0.7}
              >
                <View style={styles.notificationContent}>
                  <View style={[
                    styles.notificationIcon,
                    { backgroundColor: `${notification.color}20` }
                  ]}>
                    <Ionicons 
                      name={notification.icon} 
                      size={20} 
                      color={notification.color} 
                    />
                  </View>
                  
                  <View style={styles.notificationDetails}>
                    <Text style={[
                      styles.notificationMessage,
                      !notification.read && styles.unreadMessage
                    ]}>
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {getTimeAgo(notification.time)}
                    </Text>
                  </View>
                  
                  {!notification.read && (
                    <View style={styles.unreadIndicator} />
                  )}
                  
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => deleteNotification(notification.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="close" size={18} color="#8a9a9f" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsTitle}>Notification Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={20} color="#f2faea" />
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <TouchableOpacity style={styles.toggleActive}>
              <Text style={styles.toggleText}>ON</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="card" size={20} color="#f2faea" />
              <Text style={styles.settingText}>Subscription Alerts</Text>
            </View>
            <TouchableOpacity style={styles.toggleActive}>
              <Text style={styles.toggleText}>ON</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="cash" size={20} color="#f2faea" />
              <Text style={styles.settingText}>Payment Notifications</Text>
            </View>
            <TouchableOpacity style={styles.toggleActive}>
              <Text style={styles.toggleText}>ON</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="megaphone" size={20} color="#f2faea" />
              <Text style={styles.settingText}>Promotional Updates</Text>
            </View>
            <TouchableOpacity style={styles.toggleInactive}>
              <Text style={styles.toggleText}>OFF</Text>
            </TouchableOpacity>
          </View>

          {/* Test Notification Button */}
          <TouchableOpacity 
            style={styles.testButton}
            onPress={sendTestNotification}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications" size={20} color="#141f23" />
            <Text style={styles.testButtonText}>Send Test Notification</Text>
          </TouchableOpacity>
        </View>

        {/* Clear All Button */}
        {notifications.length > 0 && (
          <TouchableOpacity 
            style={styles.clearAllButton}
            onPress={() => setNotifications([])}
            activeOpacity={0.7}
          >
            <Ionicons name="trash" size={18} color="#ff6b6b" />
            <Text style={styles.clearAllText}>Clear All Notifications</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#141f23',
  },
  container: {
    flex: 1,
    backgroundColor: '#141f23',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8a9a9f',
  },
  markAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(89, 203, 1, 0.1)',
  },
  markAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#59cb01',
  },
  markAllDisabled: {
    opacity: 0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e2b2f',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8a9a9f',
  },
  filterContainer: {
    marginBottom: 25,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1e2b2f',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  filterActive: {
    backgroundColor: '#59cb01',
    borderColor: '#59cb01',
  },
  filterText: {
    fontSize: 14,
    color: '#8a9a9f',
    marginLeft: 6,
  },
  filterActiveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#141f23',
  },
  notificationsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#1e2b2f',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f2faea',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8a9a9f',
    textAlign: 'center',
  },
  notificationCard: {
    backgroundColor: '#1e2b2f',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  unreadCard: {
    borderColor: '#59cb01',
    backgroundColor: 'rgba(89, 203, 1, 0.05)',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationDetails: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 15,
    color: '#8a9a9f',
    lineHeight: 20,
    marginBottom: 4,
  },
  unreadMessage: {
    color: '#f2faea',
    fontWeight: '600',
  },
  notificationTime: {
    fontSize: 12,
    color: '#8a9a9f',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#59cb01',
    marginLeft: 12,
  },
  deleteButton: {
    marginLeft: 12,
    opacity: 0.7,
  },
  settingsSection: {
    backgroundColor: '#1e2b2f',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: '#f2faea',
    marginLeft: 12,
  },
  toggleActive: {
    backgroundColor: '#59cb01',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  toggleInactive: {
    backgroundColor: '#8a9a9f',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#141f23',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#59cb01',
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 10,
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#141f23',
    marginLeft: 10,
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
    borderRadius: 14,
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
  },
  clearAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b',
    marginLeft: 10,
  },
});

export default NotificationsScreen;