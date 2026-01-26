import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Attendance } from '../../types/database';

interface AttendanceCardProps {
  attendance: Attendance | null;
  isLoading?: boolean;
}

export const AttendanceCard: React.FC<AttendanceCardProps> = ({ attendance, isLoading }) => {
  if (isLoading) {
    return (
      <View className="bg-white p-4 rounded-xl shadow-sm h-full">
        <View className="flex-row items-center mb-2">
          <Ionicons name="calendar" size={20} color="#750E11" />
          <Text className="text-sm font-bold text-gray-800 ml-2">Attendance</Text>
        </View>
        <View className="items-center py-4">
          <ActivityIndicator size="small" color="#750E11" />
        </View>
      </View>
    );
  }

  const isPresent = attendance?.status === 'present';
  const statusColor = isPresent ? '#10A753' : '#EF4444';
  const statusIcon = isPresent ? 'checkmark-circle' : 'close-circle';
  const statusText = isPresent ? 'Present' : 'Absent';

  return (
    <View className="bg-white p-4 rounded-xl shadow-sm h-full">
      <View className="flex-row items-center mb-3">
        <Ionicons name="calendar" size={20} color="#750E11" />
        <Text className="text-sm font-bold text-gray-800 ml-2">Attendance</Text>
      </View>

      {attendance ? (
        <View className="items-center">
          <View
            className="w-12 h-12 rounded-full items-center justify-center mb-2"
            style={{ backgroundColor: `${statusColor}20` }}
          >
            <Ionicons name={statusIcon} size={28} color={statusColor} />
          </View>
          <Text className="text-lg font-bold" style={{ color: statusColor }}>
            {statusText}
          </Text>
          {attendance.time_marked && (
            <Text className="text-xs text-gray-500 mt-1">
              {new Date(attendance.time_marked).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          )}
        </View>
      ) : (
        <View className="bg-yellow-50 rounded-lg p-3">
          <Ionicons name="alert-circle" size={20} color="#F59E0B" />
          <Text className="text-xs text-yellow-800 mt-1">Not recorded</Text>
        </View>
      )}
    </View>
  );
};
