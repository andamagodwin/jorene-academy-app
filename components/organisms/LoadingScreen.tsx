import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

export const LoadingScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <View className="items-center">
        {/* Loading Spinner */}
        <ActivityIndicator size="large" color="#750E11" />
        
        {/* Loading Text */}
        <Text className="text-gray-600 mt-6 text-base font-medium">
          Loading...
        </Text>
      </View>
    </View>
  );
};
