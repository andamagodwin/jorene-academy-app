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
  // Generate calendar days for current month with attendance status
  const calendarData = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const currentDay = today.getDate();

    const days: Array<{ day: number | null; status: 'present' | 'absent' | 'future' | 'weekend' }> = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, status: 'future' });
    }
    
    // Add days of the month with simulated attendance
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayOfWeek = date.getDay();
      
      // Determine status
      let status: 'present' | 'absent' | 'future' | 'weekend';
      
      if (i > currentDay) {
        status = 'future';
      } else if (dayOfWeek === 0 || dayOfWeek === 6) {
        status = 'weekend';
      } else {
        // Simulate attendance based on the percentage (90% present, 10% absent)
        status = Math.random() < (attendancePercentage / 100) ? 'present' : 'absent';
      }
      
      days.push({ day: i, status });
    }
    
    return { days, currentDay };
  }, [attendancePercentage]);

  const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getStatusColor = (status: string, isToday: boolean) => {
    if (isToday) return 'bg-primary border-2 border-primary';
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'absent': return 'bg-red-500';
      case 'weekend': return 'bg-gray-200';
      default: return 'bg-gray-100';
    }
  };

  const getTextColor = (status: string, isToday: boolean) => {
    if (isToday || status === 'present' || status === 'absent') return 'text-white';
    return 'text-gray-600';
  };

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
        <View className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-800">
              {monthName}
            </Text>
            <Ionicons name="calendar" size={20} color="#750E11" />
          </View>

          {/* Day Headers */}
          <View className="flex-row mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <View key={index} className="flex-1 items-center py-2">
                <Text className="text-xs font-bold text-gray-500">
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* Calendar Grid */}
          <View>
            {Array.from({ length: Math.ceil(calendarData.days.length / 7) }).map((_, weekIndex) => (
              <View key={weekIndex} className="flex-row mb-1">
                {calendarData.days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((item, dayIndex) => {
                  const isToday = item.day === calendarData.currentDay;
                  return (
                    <View
                      key={dayIndex}
                      className="flex-1 items-center justify-center p-1"
                    >
                      {item.day ? (
                        <View
                          className={`w-9 h-9 rounded-full items-center justify-center ${getStatusColor(item.status, isToday)}`}
                        >
                          <Text className={`text-sm font-semibold ${getTextColor(item.status, isToday)}`}>
                            {item.day}
                          </Text>
                        </View>
                      ) : (
                        <View className="w-9 h-9" />
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Legend */}
          <View className="flex-row flex-wrap justify-center mt-4 pt-4 border-t border-gray-200">
            <View className="flex-row items-center mr-4 mb-2">
              <View className="w-4 h-4 bg-green-500 rounded-full mr-2" />
              <Text className="text-xs text-gray-600">Present</Text>
            </View>
            <View className="flex-row items-center mr-4 mb-2">
              <View className="w-4 h-4 bg-red-500 rounded-full mr-2" />
              <Text className="text-xs text-gray-600">Absent</Text>
            </View>
            <View className="flex-row items-center mr-4 mb-2">
              <View className="w-4 h-4 bg-gray-200 rounded-full mr-2" />
              <Text className="text-xs text-gray-600">Weekend</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <View className="w-4 h-4 bg-primary rounded-full mr-2" />
              <Text className="text-xs text-gray-600">Today</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="h-8" />
    </ScrollView>
  );
};
