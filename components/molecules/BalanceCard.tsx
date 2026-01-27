import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BalanceInfo } from '../../store/feesStore';

interface BalanceCardProps {
  balance: BalanceInfo;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const formatCurrency = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const getBalanceColor = () => {
    if (balance.balance <= 0) return 'text-accent'; // Fully paid
    if (balance.balance < balance.totalFees * 0.5) return 'text-secondary'; // Over 50% paid
    return 'text-red-600'; // Less than 50% paid
  };

  return (
    <View className="bg-white rounded-2xl p-5 mx-4 mb-4 border border-gray-200">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-3">
            <Ionicons name="wallet" size={24} color="#750E11" />
          </View>
          <View>
            <Text className="text-lg font-bold text-gray-800">
              {balance.term} Fees
            </Text>
            <Text className="text-sm text-gray-600">{balance.year}</Text>
          </View>
        </View>
      </View>

      {/* Fees Breakdown */}
      <View>
        {/* Total Fees */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-gray-600">Total Fees</Text>
          <Text className="text-base font-semibold text-gray-800">
            {formatCurrency(balance.totalFees)}
          </Text>
        </View>

        {/* Amount Paid */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-gray-600">Amount Paid</Text>
          <Text className="text-base font-semibold text-accent">
            {formatCurrency(balance.totalPaid)}
          </Text>
        </View>

        {/* Divider */}
        <View className="h-px bg-gray-200 my-2" />

        {/* Balance */}
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-bold text-gray-800">Balance</Text>
          <Text className={`text-xl font-bold ${getBalanceColor()}`}>
            {formatCurrency(balance.balance)}
          </Text>
        </View>
      </View>

      {/* Status Badge */}
      {balance.balance <= 0 && (
        <View className="mt-4 bg-accent/10 rounded-lg p-3 flex-row items-center">
          <Ionicons name="checkmark-circle" size={20} color="#10A753" />
          <Text className="text-accent font-semibold ml-2">Fully Paid</Text>
        </View>
      )}

      {balance.balance > 0 && balance.balance < balance.totalFees && (
        <View className="mt-4 bg-secondary/10 rounded-lg p-3 flex-row items-center">
          <Ionicons name="time" size={20} color="#FCB316" />
          <Text className="text-secondary font-semibold ml-2">
            Partial Payment
          </Text>
        </View>
      )}
    </View>
  );
};
