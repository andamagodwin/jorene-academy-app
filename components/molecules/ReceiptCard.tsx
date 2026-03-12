import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { AppIcon } from '../AppIcon';
import { Receipt } from '../../types/database';

interface ReceiptCardProps {
  receipt: Receipt;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({ receipt }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleViewReceipt = async () => {
    if (receipt.file_url) {
      try {
        await Linking.openURL(receipt.file_url);
      } catch (error) {
        console.error('Error opening receipt:', error);
      }
    }
  };

  return (
    <View className="bg-white rounded-xl p-4 mb-3 border border-gray-200">
      <View className="flex-row items-center justify-between">
        {/* Left: Icon + Details */}
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 bg-info/10 rounded-full items-center justify-center mr-3">
            <AppIcon name="receipt" size={20} color="#4D3E84" variant="Bold" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">
              Receipt #{receipt.receipt_no}
            </Text>
            <Text className="text-sm text-gray-600 mt-0.5">
              {formatDate(receipt.issued_at)}
            </Text>
          </View>
        </View>

        {/* Right: View Button */}
        {receipt.file_url && (
          <TouchableOpacity
            onPress={handleViewReceipt}
            className="bg-primary rounded-lg px-4 py-2 flex-row items-center"
          >
            <AppIcon name="eye" size={16} color="white" variant="Bold" />
            <Text className="text-white font-semibold ml-1.5 text-sm">
              View PDF
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
