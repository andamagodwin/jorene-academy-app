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
    return 'text-white'; // Less than 50% paid
  };

  return (
    <View style={{ overflow: 'hidden' }} className="bg-primary rounded-2xl p-6 mx-4 mb-4 relative">
      {/* Decorative circles */}
      <View 
        style={{ 
          position: 'absolute', 
          top: -40, 
          right: -40, 
          width: 128, 
          height: 128, 
          borderRadius: 64,
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }} 
      />
      <View 
        style={{ 
          position: 'absolute', 
          top: 64, 
          right: -24, 
          width: 96, 
          height: 96, 
          borderRadius: 48,
          backgroundColor: 'rgba(255, 255, 255, 0.05)'
        }} 
      />
      
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6" style={{ zIndex: 10 }}>
        <View className="flex-row items-center">
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} className="w-12 h-12 rounded-full items-center justify-center mr-3">
            <Ionicons name="wallet" size={24} color="#FFFFFF" />
          </View>
          <View>
            <Text style={{ color: '#FFFFFF' }} className="text-xl font-bold">
              {balance.term} Fees
            </Text>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }} className="text-sm">{balance.year}</Text>
          </View>
        </View>
      </View>

      {/* Fees Breakdown */}
      <View style={{ zIndex: 10 }}>
        {/* Total Fees */}
        <View className="flex-row justify-between items-center mb-3">
          <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Total Fees</Text>
          <Text style={{ color: '#FFFFFF' }} className="text-lg font-semibold">
            {formatCurrency(balance.totalFees)}
          </Text>
        </View>

        {/* Amount Paid */}
        <View className="flex-row justify-between items-center mb-3">
          <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Amount Paid</Text>
          <Text style={{ color: '#10A753' }} className="text-lg font-semibold">
            {formatCurrency(balance.totalPaid)}
          </Text>
        </View>

        {/* Divider */}
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} className="h-px my-3" />

        {/* Balance */}
        <View className="flex-row justify-between items-center">
          <Text style={{ color: '#FFFFFF' }} className="text-lg font-bold">Balance</Text>
          <Text className={`text-2xl font-bold ${getBalanceColor()}`} style={
            balance.balance <= 0 ? { color: '#10A753' } :
            balance.balance < balance.totalFees * 0.5 ? { color: '#FCB316' } :
            { color: '#FFFFFF' }
          }>
            {formatCurrency(balance.balance)}
          </Text>
        </View>
      </View>

      {/* Status Badge */}
      {balance.balance <= 0 && (
        <View style={{ backgroundColor: '#10A753', zIndex: 10 }} className="mt-4 rounded-lg p-3 flex-row items-center">
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF' }} className="font-semibold ml-2">Fully Paid</Text>
        </View>
      )}

      {balance.balance > 0 && balance.balance < balance.totalFees && (
        <View style={{ backgroundColor: '#FCB316', zIndex: 10 }} className="mt-4 rounded-lg p-3 flex-row items-center">
          <Ionicons name="time" size={20} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF' }} className="font-semibold ml-2">
            Partial Payment
          </Text>
        </View>
      )}
      
      {balance.balance >= balance.totalFees && (
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', zIndex: 10 }} className="mt-4 rounded-lg p-3 flex-row items-center">
          <Ionicons name="alert-circle" size={20} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF' }} className="font-semibold ml-2">
            Outstanding Balance
          </Text>
        </View>
      )}
    </View>
  );
};
