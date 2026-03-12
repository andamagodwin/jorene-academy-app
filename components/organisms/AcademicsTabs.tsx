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
  { id: 'performance', label: 'Performance', icon: 'analytics' },
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
    <View className="px-4 pb-3">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              className={`mr-3 px-4 py-3 rounded-2xl flex-row items-center border ${isActive ? 'bg-primary border-primary' : 'bg-white border-black'
                }`}
            >
              <AppIcon
                name={tab.icon as any}
                size={18}
                color={isActive ? '#FFFFFF' : '#111111'}
                variant={isActive ? 'Bold' : 'Linear'}
              />
              <Text
                className={`ml-2 font-semibold ${isActive ? 'text-white' : 'text-black'
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
