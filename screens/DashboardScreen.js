// screens/DashboardScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Dimensions,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  // User-specific data
  const userData = {
    name: 'John Doe',
    membership: 'Monthly Premium',
    daysLeft: 12,
    nextPayment: '$50',
    lastVisit: 'Yesterday, 3:45 PM',
    streak: 8,
    caloriesBurned: '2,450',
    workoutsCompleted: 18
  };

  // User attendance data
  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [1, 1, 0, 1, 1, 0, 1],
      color: (opacity = 1) => `rgba(89, 203, 1, ${opacity})`,
      strokeWidth: 2
    }]
  };

  // Workout distribution
  const workoutData = [
    { name: 'Cardio', population: 40, color: '#59cb01', legendFontColor: '#f2faea' },
    { name: 'Strength', population: 35, color: '#36a1d6', legendFontColor: '#f2faea' },
    { name: 'Flexibility', population: 25, color: '#ff6b6b', legendFontColor: '#f2faea' }
  ];

  // Progress data
  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [{
      data: [65, 68, 72, 70, 74, 78],
      color: (opacity = 1) => `rgba(89, 203, 1, ${opacity})`,
    }]
  };

  // User stats
  const stats = [
    { icon: 'flame', label: 'Calories Burned', value: userData.caloriesBurned, change: '+12%', color: '#59cb01' },
    { icon: 'barbell', label: 'Workouts Done', value: userData.workoutsCompleted, change: '+15%', color: '#36a1d6' },
    { icon: 'fitness', label: 'Current Streak', value: `${userData.streak} days`, change: '+3 days', color: '#ff6b6b' },
    { icon: 'time', label: 'Avg. Time', value: '68min', change: '+5%', color: '#ffd93d' },
  ];

  // Quick actions for users
  const quickActions = [
    { icon: 'calendar', label: 'Book Class', screen: 'BookClass' },
    { icon: 'barbell', label: 'Start Workout', screen: 'Workout' },
    { icon: 'card', label: 'My Membership', screen: 'Subscription' },
    { icon: 'stats-chart', label: 'Progress', screen: 'Progress' },
    { icon: 'person', label: 'Trainer', screen: 'Trainer' },
    { icon: 'nutrition', label: 'Nutrition', screen: 'Nutrition' },
  ];

  // Upcoming bookings
  const upcomingBookings = [
    { class: 'HIIT Session', trainer: 'Coach Mike', time: 'Today, 5:00 PM' },
    { class: 'Yoga Flow', trainer: 'Instructor Sarah', time: 'Tomorrow, 7:00 AM' },
    { class: 'Personal Training', trainer: 'Trainer Alex', time: 'Friday, 4:30 PM' },
  ];

  // Recommended workouts
  const recommendedWorkouts = [
    { name: 'Full Body Burn', duration: '45 min', intensity: 'Medium', icon: 'flame' },
    { name: 'Core Strength', duration: '30 min', intensity: 'Hard', icon: 'barbell' },
    { name: 'Cardio Blast', duration: '35 min', intensity: 'High', icon: 'fitness' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with User Info */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back, {userData.name}!</Text>
            <Text style={styles.date}>Today, December 17, 2024</Text>
            <View style={styles.membershipBadge}>
              <Ionicons name="ribbon" size={14} color="#59cb01" />
              <Text style={styles.membershipText}>{userData.membership}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle" size={40} color="#59cb01" />
          </TouchableOpacity>
        </View>

        {/* Membership Status */}
        <View style={styles.membershipCard}>
          <View style={styles.membershipHeader}>
            <Text style={styles.membershipTitle}>Your Membership</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
              <Text style={styles.seeAll}>Manage</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.countdownContainer}>
            <View style={styles.countdownCircle}>
              <Text style={styles.countdownDays}>{userData.daysLeft}</Text>
              <Text style={styles.countdownLabel}>days left</Text>
            </View>
            <View style={styles.countdownInfo}>
              <Text style={styles.nextPaymentText}>Next Payment</Text>
              <Text style={styles.nextPaymentAmount}>{userData.nextPayment}</Text>
              <Text style={styles.lastVisit}>Last visit: {userData.lastVisit}</Text>
            </View>
          </View>
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

        {/* Progress Chart */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weight Progress</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Details</Text>
            </TouchableOpacity>
          </View>
          <LineChart
            data={progressData}
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

        {/* Workout Distribution */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Workout Balance</Text>
          </View>
          <PieChart
            data={workoutData}
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

        {/* Upcoming Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bookingsList}>
            {upcomingBookings.map((booking, index) => (
              <TouchableOpacity key={index} style={styles.bookingItem}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.className}>{booking.class}</Text>
                  <Text style={styles.trainerName}>with {booking.trainer}</Text>
                </View>
                <View style={styles.bookingTime}>
                  <Ionicons name="time-outline" size={16} color="#59cb01" />
                  <Text style={styles.timeText}>{booking.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recommended Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.workoutScroll}>
            {recommendedWorkouts.map((workout, index) => (
              <TouchableOpacity key={index} style={styles.workoutCard}>
                <View style={styles.workoutHeader}>
                  <View style={styles.workoutIcon}>
                    <Ionicons name={workout.icon} size={24} color="#59cb01" />
                  </View>
                  <View style={styles.intensityBadge}>
                    <Text style={styles.intensityText}>{workout.intensity}</Text>
                  </View>
                </View>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <View style={styles.workoutDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={14} color="#8a9a9f" />
                    <Text style={styles.detailText}>{workout.duration}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="flame-outline" size={14} color="#8a9a9f" />
                    <Text style={styles.detailText}>300 cal</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>Start</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Weekly Attendance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>This Week's Attendance</Text>
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

        {/* Gym Status */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Gym Status</Text>
            <Text style={styles.capacityText}>Moderate</Text>
          </View>
          <View style={styles.capacityBar}>
            <View style={[styles.capacityFill, { width: '45%' }]} />
          </View>
          <Text style={styles.capacitySubtext}>Good time to workout - Not too busy</Text>
        </View>
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
    alignItems: 'flex-start',
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
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(89, 203, 1, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  membershipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#59cb01',
    marginLeft: 4,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(242, 250, 234, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  membershipCard: {
    backgroundColor: '#1e2b2f',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  membershipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  membershipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f2faea',
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countdownCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(89, 203, 1, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#59cb01',
    marginRight: 20,
  },
  countdownDays: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#59cb01',
  },
  countdownLabel: {
    fontSize: 10,
    color: '#8a9a9f',
    marginTop: 2,
  },
  countdownInfo: {
    flex: 1,
  },
  nextPaymentText: {
    fontSize: 14,
    color: '#8a9a9f',
    marginBottom: 4,
  },
  nextPaymentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 8,
  },
  lastVisit: {
    fontSize: 12,
    color: '#8a9a9f',
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
  bookingsList: {
    backgroundColor: '#1e2b2f',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  bookingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(242, 250, 234, 0.1)',
  },
  bookingInfo: {
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f2faea',
    marginBottom: 4,
  },
  trainerName: {
    fontSize: 12,
    color: '#8a9a9f',
  },
  bookingTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#59cb01',
    marginLeft: 6,
  },
  workoutScroll: {
    flexDirection: 'row',
  },
  workoutCard: {
    width: 160,
    backgroundColor: '#1e2b2f',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(89, 203, 1, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intensityBadge: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  intensityText: {
    fontSize: 10,
    color: '#ff6b6b',
    fontWeight: '600',
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 12,
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#8a9a9f',
    marginLeft: 4,
  },
  startButton: {
    backgroundColor: '#59cb01',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#141f23',
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
});

export default DashboardScreen;