import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppIcon } from '../AppIcon';

interface DashboardCardProps {
  icon: string;
  iconColor: string;
  title: string;
  mainText: string;
  subtitle?: string;
  buttonText: string;
  buttonColor: string;
  buttonTextColor: string;
  onPress?: () => void;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  iconColor,
  title,
  mainText,
  subtitle,
  buttonText,
  buttonColor,
  buttonTextColor,
  onPress,
}) => {
  return (
    <View className="bg-primary rounded-xl p-4 shadow-sm flex-col justify-between" style={{ height: 170, overflow: 'hidden' }}>
      {/* Decorative Circle */}
      <View 
        className="absolute rounded-full" 
        style={{ 
          width: 120, 
          height: 120, 
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          top: -30,
          right: -30,
        }} 
      />
      
      <View className="flex-1">
        <View className="flex-row items-center mb-3">
          <AppIcon name={icon} size={20} color={iconColor} variant="Bold" />
          <Text className="text-white font-semibold ml-2">{title}</Text>
        </View>
        <Text className="text-2xl font-bold mb-1 text-white">
          {mainText}
        </Text>
        {subtitle && (
          <Text className="text-xs text-white/70 mb-2">
            {subtitle}
          </Text>
        )}
      </View>

      <TouchableOpacity 
        className="rounded-lg py-2 items-center mt-auto"
        style={{ backgroundColor: buttonColor }}
        onPress={onPress}
      >
        <Text className="font-semibold text-sm" style={{ color: buttonTextColor }}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
