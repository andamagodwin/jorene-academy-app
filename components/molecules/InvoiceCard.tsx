import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Invoice } from '../../types/database';

interface InvoiceCardProps {
  invoice: Invoice;
  onPress?: () => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onPress }) => {
  const formatCurrency = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBgColor = () => {
    switch (invoice.status) {
      case 'paid':
        return 'bg-accent/10';
      case 'partial':
        return 'bg-secondary/10';
      case 'unpaid':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusTextColor = () => {
    switch (invoice.status) {
      case 'paid':
        return 'text-accent';
      case 'partial':
        return 'text-secondary';
      case 'unpaid':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusLabel = () => {
    switch (invoice.status) {
      case 'paid':
        return 'Paid';
      case 'partial':
        return 'Partial';
      case 'unpaid':
        return 'Unpaid';
      default:
        return invoice.status;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-3 border border-gray-200 active:bg-gray-50"
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
            <Ionicons name="document-text" size={20} color="#750E11" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">
              Invoice - {invoice.term} ({invoice.year})
            </Text>
            <Text className="text-sm text-gray-600 mt-0.5">
              Due: {formatDate(invoice.due_date)}
            </Text>
          </View>
        </View>

        {/* Status Badge */}
        <View className={`px-3 py-1 rounded-full ${getStatusBgColor()}`}>
          <Text className={`text-xs font-semibold ${getStatusTextColor()}`}>
            {getStatusLabel()}
          </Text>
        </View>
      </View>

      {/* Amount */}
      <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
        <Text className="text-gray-600">Total Amount</Text>
        <Text className="text-lg font-bold text-primary">
          {formatCurrency(Number(invoice.total_amount))}
        </Text>
      </View>

      {/* Breakdown if available */}
      {(invoice.tuition || invoice.meals || invoice.uniform || invoice.transport || invoice.other) && (
        <View className="mt-3 pt-3 border-t border-gray-100">
          <Text className="text-xs font-semibold text-gray-500 mb-2">
            BREAKDOWN
          </Text>
          <View>
            {!!invoice.tuition && invoice.tuition > 0 && (
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs text-gray-600">Tuition</Text>
                <Text className="text-xs text-gray-800">
                  {formatCurrency(Number(invoice.tuition))}
                </Text>
              </View>
            )}
            {!!invoice.meals && invoice.meals > 0 && (
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs text-gray-600">Meals</Text>
                <Text className="text-xs text-gray-800">
                  {formatCurrency(Number(invoice.meals))}
                </Text>
              </View>
            )}
            {!!invoice.uniform && invoice.uniform > 0 && (
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs text-gray-600">Uniform</Text>
                <Text className="text-xs text-gray-800">
                  {formatCurrency(Number(invoice.uniform))}
                </Text>
              </View>
            )}
            {!!invoice.transport && invoice.transport > 0 && (
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs text-gray-600">Transport</Text>
                <Text className="text-xs text-gray-800">
                  {formatCurrency(Number(invoice.transport))}
                </Text>
              </View>
            )}
            {!!invoice.other && invoice.other > 0 && (
              <View className="flex-row justify-between">
                <Text className="text-xs text-gray-600">Other</Text>
                <Text className="text-xs text-gray-800">
                  {formatCurrency(Number(invoice.other))}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Arrow */}
      {onPress && (
        <View className="absolute top-4 right-4">
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      )}
    </TouchableOpacity>
  );
};
