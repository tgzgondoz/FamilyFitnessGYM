// screens/SubscriptionScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SubscriptionScreen = ({ navigation }) => {
  const [subscription, setSubscription] = useState({
    type: 'Monthly Premium',
    status: 'Active',
    startDate: '01 Feb 2024',
    endDate: '01 Mar 2024',
    daysLeft: 3,
    nextPayment: '$50',
    autoRenew: true
  });

  const plans = [
    { 
      name: 'Daily Pass', 
      price: '$5', 
      duration: '1 day', 
      features: ['Single Day Access', 'Basic Facilities', 'Locker Access'],
      popular: false,
      icon: 'calendar',
      color: '#59cb01'
    },
    { 
      name: 'Monthly Plan', 
      price: '$50', 
      duration: '30 days', 
      features: ['Unlimited Access', 'All Facilities', 'Free Towel Service', '2 Guest Passes'],
      popular: true,
      icon: 'calendar',
      color: '#59cb01'
    },
    { 
      name: '3-Month Plan', 
      price: '$135', 
      duration: '90 days', 
      features: ['Unlimited Access', 'All Facilities', '1 Personal Training', 'Free Supplements', '4 Guest Passes'],
      popular: false,
      icon: 'calendar',
      color: '#59cb01'
    },
    { 
      name: 'Annual Premium', 
      price: '$450', 
      duration: '365 days', 
      features: ['Unlimited Access', 'All Facilities', '3 Personal Training', 'Free Supplements Monthly', 'Unlimited Guest Passes', 'Priority Booking'],
      popular: false,
      icon: 'trophy',
      color: '#59cb01'
    }
  ];

  const handleRenewal = (plan) => {
    Alert.alert(
      'Renew Membership',
      `Would you like to renew with ${plan.name} for ${plan.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Pay via EcoCash', 
          onPress: () => navigation.navigate('EcoCashPayment', { 
            plan: plan.name,
            amount: plan.price.replace('$', ''),
            description: plan.features.join(', ')
          })
        }
      ]
    );
  };

  const toggleAutoRenew = () => {
    const newAutoRenew = !subscription.autoRenew;
    setSubscription(prev => ({
      ...prev,
      autoRenew: newAutoRenew
    }));
    Alert.alert(
      'Auto-Renewal',
      `Auto-renewal has been ${newAutoRenew ? 'enabled' : 'disabled'}`,
      [{ text: 'OK' }]
    );
  };

  const generateInvoice = () => {
    Alert.alert(
      'Invoice Generated',
      'Your invoice has been sent to WhatsApp. Check your messages.',
      [{ text: 'OK' }]
    );
  };

  const showHelpAlert = () => {
    Alert.alert(
      'Support',
      'Contact us for any subscription queries:\n\n📞 +263 77 123 4567\n💬 WhatsApp: Same number\n✉️ support@familyfitness.co.zw',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#f2faea" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Subscription</Text>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle" size={24} color="#59cb01" />
          </TouchableOpacity>
        </View>

        {/* Current Subscription Card */}
        <View style={styles.currentCard}>
          <View style={styles.currentHeader}>
            <View style={styles.currentBadge}>
              <Ionicons name="card" size={20} color="#59cb01" />
              <Text style={styles.currentBadgeText}>Current Plan</Text>
            </View>
            <View style={[styles.statusBadge, subscription.status === 'Active' ? styles.activeBadge : styles.expiredBadge]}>
              <Text style={styles.statusText}>{subscription.status}</Text>
            </View>
          </View>
          
          <Text style={styles.currentPlanName}>{subscription.type}</Text>
          
          <View style={styles.datesContainer}>
            <View style={styles.dateItem}>
              <Ionicons name="calendar-outline" size={16} color="#8a9a9f" />
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Started</Text>
                <Text style={styles.dateValue}>{subscription.startDate}</Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.dateItem}>
              <Ionicons name="calendar" size={16} color="#8a9a9f" />
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Renews</Text>
                <Text style={styles.dateValue}>{subscription.endDate}</Text>
              </View>
            </View>
          </View>

          {/* Countdown */}
          <View style={styles.countdownContainer}>
            <View style={styles.countdownCircle}>
              <Text style={styles.countdownDays}>{subscription.daysLeft}</Text>
              <Text style={styles.countdownLabel}>days left</Text>
            </View>
            <View style={styles.countdownInfo}>
              <Text style={styles.nextPaymentText}>Next Payment</Text>
              <Text style={styles.nextPaymentAmount}>{subscription.nextPayment}</Text>
              {subscription.daysLeft <= 3 && (
                <View style={styles.warningContainer}>
                  <Text style={styles.warningText}>⚠️</Text>
                  <Text style={styles.warningMessage}>Renew soon to avoid interruption</Text>
                </View>
              )}
            </View>
          </View>

          {/* Auto Renewal */}
          <TouchableOpacity 
            style={styles.autoRenewContainer}
            onPress={toggleAutoRenew}
            activeOpacity={0.7}
          >
            <View style={styles.autoRenewInfo}>
              <Ionicons 
                name={subscription.autoRenew ? "toggle" : "toggle-outline"} 
                size={24} 
                color={subscription.autoRenew ? "#59cb01" : "#8a9a9f"} 
              />
              <View style={styles.autoRenewTexts}>
                <Text style={styles.autoRenewTitle}>Auto-Renewal</Text>
                <Text style={styles.autoRenewSubtitle}>
                  {subscription.autoRenew ? 'On - Will renew automatically' : 'Off - Manual renewal required'}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8a9a9f" />
          </TouchableOpacity>
        </View>

        {/* Available Plans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Plans</Text>
            <Text style={styles.sectionSubtitle}>Choose what fits your fitness goals</Text>
          </View>
          
          {plans.map((plan, index) => (
            <View key={index} style={[
              styles.planCard,
              plan.popular && styles.popularCard
            ]}>
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Ionicons name="star" size={12} color="#141f23" />
                  <Text style={styles.popularBadgeText}>Most Popular</Text>
                </View>
              )}
              
              <View style={styles.planHeader}>
                <View style={[styles.planIcon, { backgroundColor: 'rgba(89, 203, 1, 0.1)' }]}>
                  <Ionicons name={plan.icon} size={24} color="#59cb01" />
                </View>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planDuration}>{plan.duration}</Text>
                </View>
                <Text style={styles.planPrice}>{plan.price}</Text>
              </View>
              
              <View style={styles.featuresContainer}>
                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#59cb01" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              <TouchableOpacity 
                style={styles.selectButton}
                onPress={() => handleRenewal(plan)}
                activeOpacity={0.8}
              >
                <Text style={styles.selectButtonText}>
                  {subscription.type === plan.name ? 'Renew Plan' : 'Select Plan'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.invoiceButton}
            onPress={generateInvoice}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-whatsapp" size={20} color="#141f23" />
            <Text style={styles.invoiceButtonText}>Generate & Share Invoice</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.helpButton}
            onPress={showHelpAlert}
            activeOpacity={0.7}
          >
            <Ionicons name="help-circle" size={20} color="#59cb01" />
            <Text style={styles.helpButtonText}>Need Help?</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(242, 250, 234, 0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f2faea',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(242, 250, 234, 0.1)',
  },
  currentCard: {
    backgroundColor: '#1e2b2f',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  currentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(89, 203, 1, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  currentBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#59cb01',
    marginLeft: 6,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeBadge: {
    backgroundColor: 'rgba(89, 203, 1, 0.2)',
  },
  expiredBadge: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f2faea',
  },
  currentPlanName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 20,
  },
  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInfo: {
    marginLeft: 12,
  },
  dateLabel: {
    fontSize: 12,
    color: '#8a9a9f',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f2faea',
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(242, 250, 234, 0.1)',
    marginHorizontal: 20,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningText: {
    fontSize: 12,
    color: '#ffd93d',
    marginRight: 4,
  },
  warningMessage: {
    fontSize: 12,
    color: '#ffd93d',
  },
  autoRenewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(242, 250, 234, 0.1)',
  },
  autoRenewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  autoRenewTexts: {
    marginLeft: 12,
  },
  autoRenewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f2faea',
    marginBottom: 2,
  },
  autoRenewSubtitle: {
    fontSize: 12,
    color: '#8a9a9f',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8a9a9f',
  },
  planCard: {
    backgroundColor: '#1e2b2f',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  popularCard: {
    borderColor: '#59cb01',
    backgroundColor: 'rgba(89, 203, 1, 0.05)',
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#59cb01',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  popularBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#141f23',
    marginLeft: 6,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 4,
  },
  planDuration: {
    fontSize: 14,
    color: '#8a9a9f',
  },
  planPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#59cb01',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#8a9a9f',
    marginLeft: 10,
    flex: 1,
  },
  selectButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#59cb01',
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#141f23',
  },
  actionsContainer: {
    marginBottom: 30,
  },
  invoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    borderRadius: 14,
    paddingVertical: 18,
    marginBottom: 16,
  },
  invoiceButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#141f23',
    marginLeft: 10,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(89, 203, 1, 0.3)',
    borderRadius: 14,
    paddingVertical: 16,
    backgroundColor: 'rgba(89, 203, 1, 0.05)',
  },
  helpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#59cb01',
    marginLeft: 10,
  },
});

export default SubscriptionScreen;