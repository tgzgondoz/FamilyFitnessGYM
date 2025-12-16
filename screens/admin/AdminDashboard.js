// screens/AdminDashboard.js
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const AdminDashboard = ({ navigation }) => {
  // Sample data for charts
  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [65, 78, 82, 75, 90, 95, 70],
      color: (opacity = 1) => `rgba(89, 203, 1, ${opacity})`,
      strokeWidth: 2
    }]
  };

  const membershipData = [
    { name: 'Monthly', population: 68, color: '#59cb01', legendFontColor: '#f2faea' },
    { name: 'Quarterly', population: 22, color: '#36a1d6', legendFontColor: '#f2faea' },
    { name: 'Annual', population: 10, color: '#ff6b6b', legendFontColor: '#f2faea' }
  ];

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [8500, 9200, 10500, 11200, 12850, 13500],
      color: (opacity = 1) => `rgba(89, 203, 1, ${opacity})`,
    }]
  };

  const stats = [
    { icon: 'people', label: 'Active Members', value: '245', change: '+12%', color: '#59cb01' },
    { icon: 'cash', label: 'Monthly Revenue', value: '$12,850', change: '+8%', color: '#36a1d6' },
    { icon: 'barbell', label: 'Class Bookings', value: '178', change: '+15%', color: '#ff6b6b' },
    { icon: 'time', label: 'Avg. Visit Time', value: '68min', change: '+5%', color: '#ffd93d' },
  ];

  const quickActions = [
    { icon: 'add-circle', label: 'New Member', screen: 'AddMember' },
    { icon: 'calendar', label: 'Schedule', screen: 'Schedule' },
    { icon: 'notifications', label: 'Notifications', screen: 'Notifications' },
    { icon: 'stats-chart', label: 'Reports', screen: 'Reports' },
    { icon: 'card', label: 'Payments', screen: 'Payments' },
    { icon: 'fitness', label: 'Classes', screen: 'Classes' },
  ];

  const upcomingRenewals = [
    { name: 'John Doe', plan: 'Monthly Premium', date: 'Tomorrow' },
    { name: 'Sarah Smith', plan: 'Annual Gold', date: 'In 3 days' },
    { name: 'Mike Johnson', plan: 'Quarterly Basic', date: 'In 5 days' },
  ];

  // Navigation tabs
  const navItems = [
    { icon: 'home', label: 'Dashboard', active: true },
    { icon: 'people', label: 'Members', active: false },
    { icon: 'calendar', label: 'Schedule', active: false },
    { icon: 'stats-chart', label: 'Analytics', active: false },
    { icon: 'settings', label: 'Settings', active: false },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back, Admin!</Text>
            <Text style={styles.date}>Today, December 17, 2024</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('AdminProfile')}
          >
            <Ionicons name="person-circle" size={40} color="#59cb01" />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}20` }]}>
                <Ionicons name={stat.icon} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={[styles.statChange, { color: stat.color }]}>{stat.change}</Text>
            </View>
          ))}
        </View>

        {/* Revenue Chart */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Revenue Trend</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See Details</Text>
            </TouchableOpacity>
          </View>
          <LineChart
            data={revenueData}
            width={width - 40}
            height={200}
            chartConfig={{
              backgroundColor: '#1e2b2f',
              backgroundGradientFrom: '#1e2b2f',
              backgroundGradientTo: '#1e2b2f',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(89, 203, 1, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(242, 250, 234, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: '6', strokeWidth: '2', stroke: '#59cb01' }
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Membership Distribution */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Membership Distribution</Text>
          </View>
          <PieChart
            data={membershipData}
            width={width - 40}
            height={180}
            chartConfig={{
              color: (opacity = 1) => `rgba(242, 250, 234, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.actionButton}
                onPress={() => navigation.navigate(action.screen)}
              >
                <View style={styles.actionIconContainer}>
                  <Ionicons name={action.icon} size={24} color="#59cb01" />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Renewals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Renewals</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ManageUser')}>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.renewalsList}>
            {upcomingRenewals.map((member, index) => (
              <View key={index} style={styles.renewalItem}>
                <View style={styles.renewalInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberPlan}>{member.plan}</Text>
                </View>
                <View style={styles.renewalDate}>
                  <Text style={styles.dateText}>{member.date}</Text>
                  <TouchableOpacity style={styles.remindButton}>
                    <Text style={styles.remindText}>Remind</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Attendance Stats */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Attendance</Text>
          </View>
          <BarChart
            data={attendanceData}
            width={width - 40}
            height={200}
            chartConfig={{
              backgroundColor: '#1e2b2f',
              backgroundGradientFrom: '#1e2b2f',
              backgroundGradientTo: '#1e2b2f',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(89, 203, 1, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(242, 250, 234, ${opacity})`,
              style: { borderRadius: 16 }
            }}
            style={styles.chart}
          />
        </View>

        {/* Gym Capacity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Gym Capacity</Text>
            <Text style={styles.capacityText}>68/120</Text>
          </View>
          <View style={styles.capacityBar}>
            <View style={[styles.capacityFill, { width: '57%' }]} />
          </View>
          <Text style={styles.capacitySubtext}>Optimal capacity - Good for new members</Text>
        </View>
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.navItem, item.active && styles.navItemActive]}
            onPress={() => {
              // Handle navigation to different screens
              if (item.label === 'Members') {
                navigation.navigate('ManageUser');
              } else if (item.label === 'Settings') {
                navigation.navigate('AdminProfile');
              }
            }}
          >
            <Ionicons 
              name={item.icon} 
              size={24} 
              color={item.active ? '#59cb01' : '#8a9a9f'} 
            />
            <Text style={[
              styles.navLabel, 
              { color: item.active ? '#59cb01' : '#8a9a9f' }
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
    paddingBottom: 80, // Space for navigation bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#8a9a9f',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(242, 250, 234, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1e2b2f',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8a9a9f',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f2faea',
  },
  seeAll: {
    fontSize: 14,
    color: '#59cb01',
    fontWeight: '600',
  },
  chart: {
    borderRadius: 12,
    marginVertical: 8,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '31%',
    backgroundColor: '#1e2b2f',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(89, 203, 1, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: '#f2faea',
    textAlign: 'center',
  },
  renewalsList: {
    backgroundColor: '#1e2b2f',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  renewalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(242, 250, 234, 0.1)',
  },
  renewalInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f2faea',
    marginBottom: 4,
  },
  memberPlan: {
    fontSize: 12,
    color: '#8a9a9f',
  },
  renewalDate: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 14,
    color: '#59cb01',
    fontWeight: '600',
    marginBottom: 8,
  },
  remindButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(89, 203, 1, 0.1)',
    borderRadius: 8,
  },
  remindText: {
    fontSize: 12,
    color: '#59cb01',
    fontWeight: '600',
  },
  capacityBar: {
    height: 12,
    backgroundColor: 'rgba(242, 250, 234, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  capacityFill: {
    height: '100%',
    backgroundColor: '#59cb01',
    borderRadius: 6,
  },
  capacityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#59cb01',
  },
  capacitySubtext: {
    fontSize: 12,
    color: '#8a9a9f',
  },
  // Navigation Bar Styles
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#1e2b2f',
    borderTopWidth: 1,
    borderTopColor: 'rgba(242, 250, 234, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    backgroundColor: 'rgba(89, 203, 1, 0.1)',
    borderRadius: 8,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default AdminDashboard;