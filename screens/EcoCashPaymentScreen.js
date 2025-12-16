// screens/EcoCashPaymentScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EcoCashPaymentScreen = ({ route, navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState(route.params?.amount || '50');
  const [isLoading, setIsLoading] = useState(false);
  const { plan, description } = route.params || {};

  const handlePayment = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid EcoCash phone number (10 digits)');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid payment amount');
      return;
    }

    Alert.alert(
      'Confirm EcoCash Payment',
      `Send $${amount} to ${phoneNumber}\n\nPlan: ${plan || 'Monthly Plan'}`,
      [
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => console.log('Payment cancelled')
        },
        { 
          text: 'Confirm Payment', 
          style: 'default',
          onPress: () => processPayment()
        }
      ]
    );
  };

  const processPayment = () => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Payment Successful! 🎉',
        `Your ${plan || 'subscription'} has been activated.\n\nTransaction ID: EC-${Date.now()}\nAmount: $${amount}\nPhone: ${phoneNumber}\n\nInvoice sent to WhatsApp.`,
        [
          { 
            text: 'Done', 
            onPress: () => navigation.navigate('Main')
          }
        ]
      );
    }, 2000);
  };

  const formatPhoneNumber = (text) => {
    // Format as 077 XXX XXX
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length > 3) {
      formatted = cleaned.slice(0, 3) + ' ' + cleaned.slice(3);
    }
    if (cleaned.length > 6) {
      formatted = formatted.slice(0, 7) + ' ' + formatted.slice(7);
    }
    
    setPhoneNumber(formatted);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="#f2faea" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>EcoCash Payment</Text>
            <View style={{ width: 40 }} /> {/* Spacer for alignment */}
          </View>

          {/* Plan Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.planIcon}>
              <Ionicons name="phone-portrait" size={32} color="#59cb01" />
            </View>
            <Text style={styles.planName}>{plan || 'Monthly Membership'}</Text>
            <Text style={styles.planDescription}>
              {description || 'Full gym access for 30 days'}
            </Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currency}>USD</Text>
              <Text style={styles.amount}>${amount}</Text>
            </View>
          </View>

          {/* Payment Form */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            
            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
              <Ionicons 
                name="call" 
                size={20} 
                color="#59cb01" 
                style={styles.inputIcon}
              />
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>EcoCash Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="077 123 4567"
                  placeholderTextColor="#8a9a9f"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={formatPhoneNumber}
                  maxLength={11}
                  selectionColor="#59cb01"
                />
              </View>
            </View>

            {/* Amount Input */}
            <View style={styles.inputContainer}>
              <Ionicons 
                name="cash" 
                size={20} 
                color="#59cb01" 
                style={styles.inputIcon}
              />
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Amount (USD)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="50.00"
                  placeholderTextColor="#8a9a9f"
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={setAmount}
                  selectionColor="#59cb01"
                />
              </View>
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsCard}>
            <View style={styles.instructionsHeader}>
              <Ionicons name="information-circle" size={24} color="#ffd93d" />
              <Text style={styles.instructionsTitle}>Payment Instructions</Text>
            </View>
            
            <View style={styles.instructionStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>1</Text>
              </View>
              <Text style={styles.instructionText}>
                Enter your registered EcoCash number
              </Text>
            </View>

            <View style={styles.instructionStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>2</Text>
              </View>
              <Text style={styles.instructionText}>
                Confirm payment amount
              </Text>
            </View>

            <View style={styles.instructionStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>3</Text>
              </View>
              <Text style={styles.instructionText}>
                You'll receive an EcoCash prompt
              </Text>
            </View>

            <View style={styles.instructionStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>4</Text>
              </View>
              <Text style={styles.instructionText}>
                Enter your PIN to complete payment
              </Text>
            </View>
          </View>

          {/* Security Note */}
          <View style={styles.securityNote}>
            <Ionicons name="shield-checkmark" size={20} color="#59cb01" />
            <Text style={styles.securityText}>
              Your payment is secure and encrypted. We never store your PIN.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[
                styles.payButton,
                isLoading && styles.payButtonDisabled
              ]}
              onPress={handlePayment}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Ionicons name="reload" size={20} color="#141f23" style={styles.spinner} />
                  <Text style={styles.payButtonText}>Processing...</Text>
                </View>
              ) : (
                <>
                  <Ionicons name="logo-whatsapp" size={20} color="#141f23" />
                  <Text style={styles.payButtonText}>Pay with EcoCash</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.helpButton}
              onPress={() => Alert.alert('Support', 'Call: +263 77 123 4567\nWhatsApp: +263 77 123 4567\nEmail: support@familyfitness.co.zw')}
              activeOpacity={0.7}
            >
              <Ionicons name="help-circle" size={20} color="#59cb01" />
              <Text style={styles.helpButtonText}>Need Help? Contact Support</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginBottom: 10,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f2faea',
    textAlign: 'center',
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#1e2b2f',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(89, 203, 1, 0.2)',
  },
  planIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(89, 203, 1, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f2faea',
    textAlign: 'center',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: '#8a9a9f',
    textAlign: 'center',
    marginBottom: 20,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 18,
    color: '#59cb01',
    marginRight: 6,
    fontWeight: '600',
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#59cb01',
  },
  formSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f2faea',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 250, 234, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(242, 250, 234, 0.1)',
  },
  inputIcon: {
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
    paddingVertical: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: '#8a9a9f',
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    color: '#f2faea',
    padding: 0,
    fontWeight: '500',
  },
  instructionsCard: {
    backgroundColor: 'rgba(255, 217, 61, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 217, 61, 0.2)',
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffd93d',
    marginLeft: 10,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 217, 61, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffd93d',
  },
  instructionText: {
    fontSize: 14,
    color: '#f2faea',
    flex: 1,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(89, 203, 1, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 25,
  },
  securityText: {
    fontSize: 14,
    color: '#8a9a9f',
    marginLeft: 12,
    flex: 1,
  },
  actionsContainer: {
    marginTop: 'auto',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#59cb01',
    borderRadius: 14,
    paddingVertical: 18,
    marginBottom: 16,
    shadowColor: '#59cb01',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinner: {
    marginRight: 10,
  },
  payButtonText: {
    fontSize: 18,
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

export default EcoCashPaymentScreen;