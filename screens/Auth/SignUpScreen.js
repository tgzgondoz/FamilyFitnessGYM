// screens/Auth/SignUpScreen.js
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const [role, setRole] = useState('client');
  const [membershipType, setMembershipType] = useState('monthly');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
    
    // Hide header if using navigation options
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const roles = [
    { label: 'Client', value: 'client', icon: 'person-outline' },
    { label: 'Staff', value: 'staff', icon: 'people-outline' },
    { label: 'Manager', value: 'manager', icon: 'shield-checkmark-outline' }
  ];

  const membershipTypes = [
    { label: 'Monthly', value: 'monthly', subtitle: 'Best value', price: '$49/mo' },
    { label: 'Daily', value: 'daily', subtitle: 'Pay as you go', price: '$10/day' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleSignUp = () => {
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View 
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Back Button */}
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons 
                name="chevron-back" 
                size={24} 
                color="#141f23" 
                style={{ opacity: 0.8 }}
              />
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Start your fitness journey with us</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Full Name */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={[
                  styles.inputContainer,
                  isFocused.fullName && styles.inputContainerFocused
                ]}>
                  <Ionicons 
                    name="person-outline" 
                    size={20} 
                    color={isFocused.fullName ? '#59cb01' : '#8a9a9f'} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#8a9a9f"
                    value={formData.fullName}
                    onChangeText={(text) => handleInputChange('fullName', text)}
                    onFocus={() => handleFocus('fullName')}
                    onBlur={() => handleBlur('fullName')}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={[
                  styles.inputContainer,
                  isFocused.email && styles.inputContainerFocused
                ]}>
                  <Ionicons 
                    name="mail-outline" 
                    size={20} 
                    color={isFocused.email ? '#59cb01' : '#8a9a9f'} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#8a9a9f"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                  />
                </View>
              </View>

              {/* Phone Number */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={[
                  styles.inputContainer,
                  isFocused.phone && styles.inputContainerFocused
                ]}>
                  <Ionicons 
                    name="call-outline" 
                    size={20} 
                    color={isFocused.phone ? '#59cb01' : '#8a9a9f'} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#8a9a9f"
                    value={formData.phone}
                    onChangeText={(text) => handleInputChange('phone', text)}
                    onFocus={() => handleFocus('phone')}
                    onBlur={() => handleBlur('phone')}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={[
                  styles.inputContainer,
                  isFocused.password && styles.inputContainerFocused
                ]}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={20} 
                    color={isFocused.password ? '#59cb01' : '#8a9a9f'} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Create a password"
                    placeholderTextColor="#8a9a9f"
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity 
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIcon}
                    activeOpacity={0.7}
                  >
                    <Ionicons 
                      name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#8a9a9f" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={[
                  styles.inputContainer,
                  isFocused.confirmPassword && styles.inputContainerFocused
                ]}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={20} 
                    color={isFocused.confirmPassword ? '#59cb01' : '#8a9a9f'} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Confirm your password"
                    placeholderTextColor="#8a9a9f"
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={() => handleBlur('confirmPassword')}
                    secureTextEntry={!isConfirmPasswordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity 
                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    style={styles.eyeIcon}
                    activeOpacity={0.7}
                  >
                    <Ionicons 
                      name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#8a9a9f" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Role Selection */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Select Your Role</Text>
                <Text style={styles.sectionSubtitle}>Choose how you'll use the app</Text>
                <View style={styles.optionGroup}>
                  {roles.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={[
                        styles.optionButton,
                        role === item.value && styles.optionButtonActive
                      ]}
                      onPress={() => setRole(item.value)}
                      activeOpacity={0.8}
                    >
                      <View style={[
                        styles.optionIconContainer,
                        role === item.value && styles.optionIconContainerActive
                      ]}>
                        <Ionicons 
                          name={item.icon} 
                          size={22} 
                          color={role === item.value ? '#141f23' : '#8a9a9f'} 
                        />
                      </View>
                      <Text style={[
                        styles.optionButtonText,
                        role === item.value && styles.optionButtonTextActive
                      ]}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Membership Type Selection */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Membership Type</Text>
                <Text style={styles.sectionSubtitle}>Choose your preferred plan</Text>
                <View style={styles.membershipGroup}>
                  {membershipTypes.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={[
                        styles.membershipButton,
                        membershipType === item.value && styles.membershipButtonActive
                      ]}
                      onPress={() => setMembershipType(item.value)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.membershipHeader}>
                        <Text style={[
                          styles.membershipLabel,
                          membershipType === item.value && styles.membershipLabelActive
                        ]}>
                          {item.label}
                        </Text>
                        <View style={[
                          styles.radioCircle,
                          membershipType === item.value && styles.radioCircleActive
                        ]}>
                          {membershipType === item.value && (
                            <View style={styles.radioInnerCircle} />
                          )}
                        </View>
                      </View>
                      <Text style={[
                        styles.membershipSubtitle,
                        membershipType === item.value && styles.membershipSubtitleActive
                      ]}>
                        {item.subtitle}
                      </Text>
                      <Text style={[
                        styles.membershipPrice,
                        membershipType === item.value && styles.membershipPriceActive
                      ]}>
                        {item.price}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Terms Checkbox */}
              <View style={styles.termsContainer}>
                <TouchableOpacity style={styles.checkbox} activeOpacity={0.7}>
                  <Ionicons 
                    name="checkbox-outline" 
                    size={22} 
                    color="#59cb01" 
                  />
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity 
                style={styles.signUpButton}
                onPress={handleSignUp}
                activeOpacity={0.8}
              >
                <Text style={styles.signUpButtonText}>Create Account</Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Login')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2faea',
  },
  container: {
    flex: 1,
    backgroundColor: '#f2faea',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 12 : 20,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(20, 31, 35, 0.05)',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    color: '#141f23',
    letterSpacing: -0.5,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#8a9a9f',
    textAlign: 'center',
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    lineHeight: 22,
    paddingHorizontal: 20,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  formContainer: {
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#141f23',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    marginBottom: 8,
    opacity: 0.9,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 31, 35, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(20, 31, 35, 0.1)',
    borderRadius: Platform.OS === 'ios' ? 10 : 8,
    paddingHorizontal: 16,
    height: 56,
  },
  inputContainerFocused: {
    borderColor: '#59cb01',
    backgroundColor: 'rgba(89, 203, 1, 0.02)',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#141f23',
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    paddingVertical: 0,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 4,
  },
  sectionContainer: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: '#141f23',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8a9a9f',
    marginBottom: 16,
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  optionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: Platform.OS === 'ios' ? 10 : 8,
    backgroundColor: 'rgba(20, 31, 35, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(20, 31, 35, 0.1)',
  },
  optionButtonActive: {
    backgroundColor: '#59cb01',
    borderColor: '#59cb01',
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(20, 31, 35, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  optionIconContainerActive: {
    backgroundColor: '#141f23',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    color: '#8a9a9f',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  optionButtonTextActive: {
    color: '#141f23',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  membershipGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  membershipButton: {
    flex: 1,
    padding: 18,
    borderRadius: Platform.OS === 'ios' ? 12 : 10,
    backgroundColor: 'rgba(20, 31, 35, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(20, 31, 35, 0.1)',
  },
  membershipButtonActive: {
    backgroundColor: 'rgba(89, 203, 1, 0.08)',
    borderColor: '#59cb01',
  },
  membershipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  membershipLabel: {
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: '#141f23',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  membershipLabelActive: {
    color: '#59cb01',
  },
  membershipSubtitle: {
    fontSize: 13,
    color: '#8a9a9f',
    marginBottom: 12,
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  membershipSubtitleActive: {
    color: '#141f23',
  },
  membershipPrice: {
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    color: '#141f23',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  membershipPriceActive: {
    color: '#59cb01',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#8a9a9f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#59cb01',
  },
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#59cb01',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  termsText: {
    fontSize: 15,
    color: '#8a9a9f',
    flex: 1,
    lineHeight: 22,
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  termsLink: {
    color: '#59cb01',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  signUpButton: {
    backgroundColor: '#59cb01',
    paddingVertical: 16,
    borderRadius: Platform.OS === 'ios' ? 12 : 10,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#59cb01',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 4 : 6,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.3,
    shadowRadius: Platform.OS === 'ios' ? 8 : 12,
    elevation: 4,
  },
  signUpButtonText: {
    fontSize: 17,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: '#141f23',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#8a9a9f',
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  loginLink: {
    fontSize: 16,
    color: '#59cb01',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
});

export default SignUpScreen;