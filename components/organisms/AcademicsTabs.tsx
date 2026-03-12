import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AppIcon } from '../AppIcon';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: 'results', label: 'Results', icon: 'document-text' },
  { id: 'attendance', label: 'Attendance', icon: 'calendar' },
  { id: 'timetable', label: 'Timetable', icon: 'time' },
  { id: 'performance', label: 'Performance', icon: 'stats-chart' },
];

interface AcademicsTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const AcademicsTabs: React.FC<AcademicsTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <View className="bg-white border-b border-gray-200 flex-row">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              className={`px-4 py-3 flex-row items-center border-b-2 ${
                isActive ? 'border-primary' : 'border-transparent'
              }`}
            >
              <AppIcon
                name={tab.icon as any}
                size={18}
                color={isActive ? '#750E11' : '#9CA3AF'}
                variant={isActive ? 'Bold' : 'Linear'}
              />
              <Text
                className={`ml-2 font-medium ${
                  isActive ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
