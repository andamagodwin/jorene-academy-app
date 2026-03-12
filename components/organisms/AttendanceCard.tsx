import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { router } from 'expo-router';
import { DashboardCard } from '../molecules/DashboardCard';
import { Attendance } from '../../types/database';

interface AttendanceCardProps {
  attendance: Attendance | null;
  isLoading?: boolean;
}

export const AttendanceCard: React.FC<AttendanceCardProps> = ({ attendance, isLoading }) => {
  if (isLoading) {
    return (
      <View className="bg-white p-5 rounded-[24px] shadow-sm" style={{ height: 170 }}>
        <ActivityIndicator size="small" color="#750E11" />
      </View>
    );
  }

  const isPresent = attendance?.status === 'present';
  const statusColor = isPresent ? '#10A753' : '#EF4444';
  const statusText = isPresent ? 'Present' : 'Absent';
  const timeText = attendance?.time_marked
    ? new Date(attendance.time_marked).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Not recorded';

  return (
    <DashboardCard
      icon="calendar"
      iconColor="#FFFFFF"
      title="Attendance"
      mainText={attendance ? statusText : 'N/A'}
      subtitle={timeText}
      buttonText="View Calendar"
      buttonColor={attendance ? (isPresent ? '#10A753' : '#EF4444') : '#FBBF24'}
      buttonTextColor="#750E11"
      onPress={() => router.push('/academics')}
    />
  );
};
