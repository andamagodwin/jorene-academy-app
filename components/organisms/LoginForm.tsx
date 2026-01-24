import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { InputField } from '../molecules/InputField';
import { Button } from '../atoms/Button';
import { useAuthStore } from '../../store/authStore';

interface LoginFormProps {
  onSignUpPress?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSignUpPress }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { signIn, isLoading } = useAuthStore();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const { error } = await signIn(email, password);

    if (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View className="w-full">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</Text>
        <Text className="text-base text-gray-500">Sign in to continue</Text>
      </View>

      <View className="w-full">
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

        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={isLoading}
          fullWidth
          className="mt-2"
        />

        {onSignUpPress && (
          <View className="flex-row justify-center items-center mt-6">
            {/* <Text className="text-sm text-gray-500">Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={onSignUpPress}>
              <Text className="text-sm text-primary font-semibold">Sign Up</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </View>
    </View>
  );
};
