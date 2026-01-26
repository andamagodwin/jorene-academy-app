import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AttendanceViewProps {
  attendancePercentage: number;
  isLoading?: boolean;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  attendancePercentage,
  isLoading = false,
}) => {
  // Generate calendar days for current month
  const calendarData = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, []);

  const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Ionicons name="hourglass" size={48} color="#CCBEB7" />
        <Text className="text-gray-600 mt-4">Loading attendance...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-4 pt-4">
        {/* Attendance Summary Card */}
        <View className="bg-white rounded-lg p-6 mb-4 border border-gray-200">
          <View className="items-center mb-4">
            <View className="w-24 h-24 rounded-full bg-accent/20 items-center justify-center mb-3">
              <Text className="text-4xl font-bold text-accent">
                {attendancePercentage}%
              </Text>
            </View>
            <Text className="text-gray-800 font-semibold text-lg">
              Current Attendance
            </Text>
          </View>

          <View className="flex-row justify-around pt-4 border-t border-gray-200">
            <View className="items-center">
              <Text className="text-sm text-gray-600">Present Days</Text>
              <Text className="text-xl font-bold text-accent mt-1">
                ~{Math.round((attendancePercentage / 100) * 20)}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-gray-600">Absent Days</Text>
              <Text className="text-xl font-bold text-red-500 mt-1">
                ~{Math.round((20 * (100 - attendancePercentage)) / 100)}
              </Text>
            </View>
          </View>
        </View>

        {/* Calendar View */}
        <View className="bg-white rounded-lg p-4 border border-gray-200">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            {monthName}
          </Text>

          {/* Day Headers */}
          <View className="flex-row mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Text key={day} className="flex-1 text-center text-xs font-semibold text-gray-600">
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View>
            {Array.from({ length: Math.ceil(calendarData.length / 7) }).map((_, weekIndex) => (
              <View key={weekIndex} className="flex-row mb-2">
                {calendarData.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                  <View
                    key={dayIndex}
                    className="flex-1 aspect-square items-center justify-center"
                  >
                    {day ? (
                      <View
                        className={`w-8 h-8 rounded items-center justify-center ${
                          day % 7 === 0 ? 'bg-red-100' : 'bg-green-100'
                        }`}
                      >
                        <Text className="text-xs font-medium text-gray-800">
                          {day}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Legend */}
          <View className="flex-row justify-center mt-4 pt-4 border-t border-gray-200">
            <View className="flex-row items-center mr-4">
              <View className="w-3 h-3 bg-red-400 rounded mr-2" />
              <Text className="text-xs text-gray-600">Absent</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 bg-green-400 rounded mr-2" />
              <Text className="text-xs text-gray-600">Present</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="h-8" />
    </ScrollView>
  );
};
