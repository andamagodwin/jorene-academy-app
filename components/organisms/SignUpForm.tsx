import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { InputField } from '../molecules/InputField';
import { Button } from '../atoms/Button';
import { useAuthStore } from '../../store/authStore';

interface SignUpFormProps {
  onSignInPress?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignInPress }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    const { error } = await signUp(email, password, fullName);

    if (error) {
      Alert.alert('Sign Up Failed', error.message);
    } else {
      Alert.alert('Success', 'Account created successfully!');
    }
  };

  return (
    <View className="w-full">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800 mb-2">Create Account</Text>
        <Text className="text-base text-gray-500">Sign up to get started</Text>
      </View>

      <View className="w-full">
        <InputField
          label="Full Name"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            setErrors((prev) => ({ ...prev, fullName: undefined }));
          }}
          error={errors.fullName}
          placeholder="Enter your full name"
          autoCapitalize="words"
          autoComplete="name"
          required
        />

        <InputField
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          required
        />

        <InputField
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
          placeholder="Enter your password"
          isPassword
          autoCapitalize="none"
          autoComplete="password"
          required
        />

        <InputField
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          isPassword
          autoCapitalize="none"
          autoComplete="password"
          required
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
            <Text className="text-sm text-gray-500">Already have an account? </Text>
            <TouchableOpacity onPress={onSignInPress}>
              <Text className="text-sm text-primary font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
