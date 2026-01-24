import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  visible?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  onClose,
  visible = true,
}) => {
  if (!visible) return null;

  const variantConfig = {
    success: {
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent',
      textColor: 'text-accent',
      iconName: 'checkmark-circle' as const,
      iconColor: '#10A753',
    },
    error: {
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary',
      textColor: 'text-primary',
      iconName: 'close-circle' as const,
      iconColor: '#750E11',
    },
    warning: {
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary',
      textColor: 'text-secondary',
      iconName: 'warning' as const,
      iconColor: '#FCB316',
    },
    info: {
      bgColor: 'bg-info/10',
      borderColor: 'border-info',
      textColor: 'text-info',
      iconName: 'information-circle' as const,
      iconColor: '#4D3E84',
    },
  };

  const config = variantConfig[variant];

  return (
    <View
      className={`${config.bgColor} ${config.borderColor} border rounded-xl p-4 mb-4 flex-row`}>
      <View className="mr-3 pt-0.5">
        <Ionicons name={config.iconName} size={24} color={config.iconColor} />
      </View>
      <View className="flex-1">
        {title && (
          <Text className={`font-semibold text-base ${config.textColor} mb-1`}>
            {title}
          </Text>
        )}
        <Text className={`text-sm ${config.textColor}`}>{message}</Text>
      </View>
      {onClose && (
        <TouchableOpacity onPress={onClose} className="ml-2" activeOpacity={0.7}>
          <Ionicons name="close" size={20} color={config.iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};
