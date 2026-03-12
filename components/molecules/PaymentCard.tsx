import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Payment } from '../../types/database';

interface PaymentCardProps {
  payment: Payment;
  onPress?: () => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ payment, onPress }) => {
  const formatCurrency = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getMethodIcon = () => {
    switch (payment.method.toLowerCase()) {
      case 'mobile_money':
        return 'phone-portrait';
      case 'bank_transfer':
        return 'card';
      case 'cash':
        return 'cash';
      default:
        return 'wallet';
    }
  };

  const getMethodLabel = () => {
    switch (payment.method.toLowerCase()) {
      case 'mobile_money':
        return 'Mobile Money';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'cash':
        return 'Cash';
      default:
        return payment.method;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-3 border border-gray-200 active:bg-gray-50"
    >
      <View className="flex-row items-center justify-between">
        {/* Left: Icon + Details */}
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 bg-accent/10 rounded-full items-center justify-center mr-3">
            <Ionicons name={getMethodIcon()} size={20} color="#10A753" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">
              {formatCurrency(Number(payment.amount))}
            </Text>
            <Text className="text-sm text-gray-600 mt-0.5">
              {getMethodLabel()} • {formatDate(payment.date)}
            </Text>
            {payment.reference && (
              <Text className="text-xs text-gray-500 mt-0.5">
                Ref: {payment.reference}
              </Text>
            )}
          </View>
        </View>

        {/* Right: Arrow */}
        {onPress && (
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
  );
};
