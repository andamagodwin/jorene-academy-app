import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AppIcon } from '../AppIcon';
import { Timetable } from '../../types/database';

interface TimetableViewProps {
  timetable: Timetable[];
  isLoading?: boolean;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const TimetableView: React.FC<TimetableViewProps> = ({ timetable, isLoading = false }) => {
  const todayIndex = new Date().getDay() - 1;
  const [selectedDay, setSelectedDay] = useState(DAYS[todayIndex >= 0 ? todayIndex : 0]);

  const dayTimetable = useMemo(() => {
    return timetable
      .filter(t => t.day === selectedDay)
      .sort((a, b) => a.start_time.localeCompare(b.start_time));
  }, [timetable, selectedDay]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppIcon name="hourglass" size={48} color="#CCBEB7" />
        <Text className="text-gray-600 mt-4">Loading timetable...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-4 pt-4">
        {/* Day Selector */}
        <Text className="text-sm text-gray-600 mb-2 font-medium">Select Day</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-full mr-2 border ${
                day === selectedDay
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text
                className={`font-medium text-sm ${
                  day === selectedDay ? 'text-white' : 'text-gray-800'
                }`}
              >
                {day.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Classes for Selected Day */}
        {dayTimetable.length > 0 ? (
          <View className="pb-4">
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              {selectedDay}&apos;s Classes
            </Text>
            {dayTimetable.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-lg p-4 mb-3 border border-gray-200 flex-row items-center"
              >
                {/* Time Indicator */}
                <View className="w-1 h-16 bg-primary rounded mr-4" />

                {/* Class Details */}
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-base font-semibold text-gray-800">
                      {item.subject}
                    </Text>
                    <Text className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Room {item.room || 'TBA'}
                    </Text>
                  </View>

                  <View className="flex-row items-center mb-2">
                    <AppIcon name="time" size={14} color="#6B7280" />
                    <Text className="text-sm text-gray-600 ml-2">
                      {item.start_time} - {item.end_time}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <AppIcon name="person" size={14} color="#6B7280" />
                    <Text className="text-sm text-gray-600 ml-2">
                      {item.teacher}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="items-center py-12">
            <AppIcon name="calendar-outline" size={48} color="#CCBEB7" />
            <Text className="text-gray-600 mt-4">No classes on {selectedDay}</Text>
          </View>
        )}
      </View>

      <View className="h-8" />
    </ScrollView>
  );
};
