import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";
import { useAuthStore } from "../../stores/authStore";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterScreen() {
  const { colors } = useTheme();
  const { register, isLoading } = useAuthStore();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(1);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateStep1 = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.phone && !/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Must include uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleRegister = async () => {
    if (!validateStep2()) return;

    try {
      await register({
        email: formData.email.toLowerCase(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone || undefined,
      });
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error instanceof Error ? error.message : "Please try again"
      );
    }
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { strength: 0, label: "", color: colors.textSecondary };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 2) return { strength: 1, label: "Weak", color: colors.error };
    if (strength <= 4) return { strength: 2, label: "Fair", color: colors.warning };
    return { strength: 3, label: "Strong", color: colors.success };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => (step === 1 ? router.back() : setStep(1))}
            >
              <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>
              {step === 1 ? "Create Account" : "Secure Your Account"}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {step === 1
                ? "Start your credit repair journey today"
                : "Create a strong password to protect your data"}
            </Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressStep,
                { backgroundColor: colors.primary },
              ]}
            />
            <View
              style={[
                styles.progressStep,
                { backgroundColor: step === 2 ? colors.primary : colors.border },
              ]}
            />
          </View>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <View style={styles.form}>
              <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <Text style={[styles.label, { color: colors.text }]}>First Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: errors.firstName ? colors.error : colors.border,
                      },
                    ]}
                    placeholder="John"
                    placeholderTextColor={colors.textSecondary}
                    value={formData.firstName}
                    onChangeText={(v) => updateField("firstName", v)}
                    autoCapitalize="words"
                    autoComplete="given-name"
                  />
                  {errors.firstName && (
                    <Text style={[styles.errorText, { color: colors.error }]}>
                      {errors.firstName}
                    </Text>
                  )}
                </View>

                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <Text style={[styles.label, { color: colors.text }]}>Last Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: errors.lastName ? colors.error : colors.border,
                      },
                    ]}
                    placeholder="Doe"
                    placeholderTextColor={colors.textSecondary}
                    value={formData.lastName}
                    onChangeText={(v) => updateField("lastName", v)}
                    autoCapitalize="words"
                    autoComplete="family-name"
                  />
                  {errors.lastName && (
                    <Text style={[styles.errorText, { color: colors.error }]}>
                      {errors.lastName}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.surface,
                      color: colors.text,
                      borderColor: errors.email ? colors.error : colors.border,
                    },
                  ]}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.email}
                  onChangeText={(v) => updateField("email", v)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                />
                {errors.email && (
                  <Text style={[styles.errorText, { color: colors.error }]}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Phone (Optional)</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.surface,
                      color: colors.text,
                      borderColor: errors.phone ? colors.error : colors.border,
                    },
                  ]}
                  placeholder="(555) 123-4567"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.phone}
                  onChangeText={(v) => updateField("phone", v)}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <Text style={[styles.errorText, { color: colors.error }]}>{errors.phone}</Text>
                )}
              </View>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleNextStep}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 2: Password */}
          {step === 2 && (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: errors.password ? colors.error : colors.border,
                      },
                    ]}
                    placeholder="Create a strong password"
                    placeholderTextColor={colors.textSecondary}
                    value={formData.password}
                    onChangeText={(v) => updateField("password", v)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={{ color: colors.textSecondary }}>
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={[styles.errorText, { color: colors.error }]}>
                    {errors.password}
                  </Text>
                )}

                {/* Password Strength Indicator */}
                {formData.password && (
                  <View style={styles.strengthContainer}>
                    <View style={styles.strengthBars}>
                      {[1, 2, 3].map((level) => (
                        <View
                          key={level}
                          style={[
                            styles.strengthBar,
                            {
                              backgroundColor:
                                passwordStrength.strength >= level
                                  ? passwordStrength.color
                                  : colors.border,
                            },
                          ]}
                        />
                      ))}
                    </View>
                    <Text style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                      {passwordStrength.label}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Confirm Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.surface,
                      color: colors.text,
                      borderColor: errors.confirmPassword ? colors.error : colors.border,
                    },
                  ]}
                  placeholder="Re-enter your password"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.confirmPassword}
                  onChangeText={(v) => updateField("confirmPassword", v)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                {errors.confirmPassword && (
                  <Text style={[styles.errorText, { color: colors.error }]}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>

              {/* Password Requirements */}
              <View style={[styles.requirementsBox, { backgroundColor: colors.surface }]}>
                <Text style={[styles.requirementsTitle, { color: colors.text }]}>
                  Password Requirements:
                </Text>
                {[
                  { check: formData.password.length >= 8, text: "At least 8 characters" },
                  { check: /[A-Z]/.test(formData.password), text: "One uppercase letter" },
                  { check: /[a-z]/.test(formData.password), text: "One lowercase letter" },
                  { check: /\d/.test(formData.password), text: "One number" },
                ].map((req, i) => (
                  <View key={i} style={styles.requirement}>
                    <Text style={{ color: req.check ? colors.success : colors.textSecondary }}>
                      {req.check ? "✓" : "○"} {req.text}
                    </Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Create Account</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Already have an account?{" "}
            </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={[styles.footerLink, { color: colors.primary }]}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  backIcon: {
    fontSize: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: "row",
    marginBottom: 32,
    gap: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  form: {
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  strengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  strengthBars: {
    flexDirection: "row",
    flex: 1,
    gap: 4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 8,
  },
  requirementsBox: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  requirement: {
    marginVertical: 2,
  },
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});

