import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Sms, Lock } from 'iconsax-react-native';
import { InputField } from '../molecules/InputField';
import { Button } from '../atoms/Button';
import { Alert } from '../atoms/Alert';
import { useAuthStore } from '../../store/authStore';

interface LoginFormProps {
  onSignUpPress?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSignUpPress }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  
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

    setAlertMessage(null);
    const { error } = await signIn(email, password);

    if (error) {
      setAlertMessage(error.message);
    }
  };

  return (
    <View className="w-full">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-black">Welcome Back</Text>
      </View>

      <View className="w-full">
        {alertMessage && (
          <Alert
            variant="error"
            title="Login Failed"
            message={alertMessage}
            onClose={() => setAlertMessage(null)}
            visible={!!alertMessage}
          />
        )}

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

        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={isLoading}
          fullWidth
          className="mt-2"
        />

        {onSignUpPress && (
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-sm text-black/40">Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={onSignUpPress}>
              <Text className="text-sm text-black font-semibold underline">Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
