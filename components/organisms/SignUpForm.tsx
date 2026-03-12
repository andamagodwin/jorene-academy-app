import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User, Sms, Lock, People, Teacher } from 'iconsax-react-native';
import { InputField } from '../molecules/InputField';
import { Button } from '../atoms/Button';
import { Alert } from '../atoms/Alert';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types/database';

interface SignUpFormProps {
  onSignInPress?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignInPress }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('parent');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<'success' | 'error'>('error');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { signUp, isLoading } = useAuthStore();

  const validate = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    setAlertMessage(null);
    const { error } = await signUp(email, password, fullName, role);

    if (error) {
      setAlertVariant('error');
      setAlertMessage(error.message);
    } else {
      setAlertVariant('success');
      setAlertMessage('Account created successfully!');
    }
  };

  return (
    <View className="w-full">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-black mb-1">Create Account</Text>
        <Text className="text-sm text-black/50">Sign up to get started</Text>
      </View>

      <View className="w-full">
        {alertMessage && (
          <Alert
            variant={alertVariant}
            title={alertVariant === 'success' ? 'Success' : 'Sign Up Failed'}
            message={alertMessage}
            onClose={() => setAlertMessage(null)}
            visible={!!alertMessage}
          />
        )}

        <InputField
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            setErrors((prev) => ({ ...prev, fullName: undefined }));
          }}
          error={errors.fullName}
          placeholder="Full name"
          autoCapitalize="words"
          autoComplete="name"
          leftIcon={<User size={20} color="#000" variant="Linear" />}
        />

        <InputField
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          leftIcon={<Sms size={20} color="#000" variant="Linear" />}
        />

        {/* Role Selection */}
        <View className="mb-4">
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setRole('parent')}
              className={`flex-1 py-3.5 rounded-xl border flex-row items-center justify-center gap-2 ${
                role === 'parent' ? 'bg-black border-black' : 'bg-white border-black'
              }`}
            >
              <People
                size={18}
                color={role === 'parent' ? '#fff' : '#000'}
                variant="Linear"
              />
              <Text className={`font-semibold text-sm ${role === 'parent' ? 'text-white' : 'text-black'}`}>
                Parent
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRole('teacher')}
              className={`flex-1 py-3.5 rounded-xl border flex-row items-center justify-center gap-2 ${
                role === 'teacher' ? 'bg-black border-black' : 'bg-white border-black'
              }`}
            >
              <Teacher
                size={18}
                color={role === 'teacher' ? '#fff' : '#000'}
                variant="Linear"
              />
              <Text className={`font-semibold text-sm ${role === 'teacher' ? 'text-white' : 'text-black'}`}>
                Teacher
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <InputField
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
          placeholder="Password"
          isPassword
          autoCapitalize="none"
          autoComplete="password"
          leftIcon={<Lock size={20} color="#000" variant="Linear" />}
        />

        <InputField
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          error={errors.confirmPassword}
          placeholder="Confirm password"
          isPassword
          autoCapitalize="none"
          autoComplete="password"
          leftIcon={<Lock size={20} color="#000" variant="Linear" />}
        />

        <Button
          title="Sign Up"
          onPress={handleSignUp}
          loading={isLoading}
          fullWidth
          className="mt-2"
        />

        {onSignInPress && (
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-sm text-black/40">Already have an account? </Text>
            <TouchableOpacity onPress={onSignInPress}>
              <Text className="text-sm text-black font-semibold underline">Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
