import React from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../components/atoms/Button';
import { useAuthStore } from '~/store/authStore';

type Href = Parameters<typeof router.push>[0];

export default function WelcomeScreen() {
  const { markAsVisited } = useAuthStore();

  const handleSignIn = () => {
    markAsVisited();
    router.push('/(auth)/login' as Href);
  };

  const handleSignUp = () => {
    markAsVisited();
    router.push('/(auth)/signup' as Href);
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-between p-6 pt-20 pb-12">
        <View className="items-center mt-10">
          <Image
            source={require('../../assets/images/jorene-logo-1.png')}
            className="w-48 h-48 mb-6"
            resizeMode="contain"
          />
          <Text className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Jorene Academy
          </Text>
          <Text className="text-lg text-gray-500 text-center max-w-xs">
            Your journey to excellence starts here
          </Text>
        </View>

        <View className="w-full max-w-md self-center">
          <Button
            title="Sign In"
            onPress={handleSignIn}
            fullWidth
            className="mb-4"
          />
          <Button
            title="Create Account"
            variant="outline"
            onPress={handleSignUp}
            fullWidth
            className="mb-4"
          />
        </View>
      </View>
    </View>
  );
}
