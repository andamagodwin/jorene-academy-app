import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { AppIcon } from '../AppIcon';
import { Homework } from '../../types/database';

interface HomeworkCardProps {
  homework: Homework[];
  isLoading?: boolean;
  onViewAll?: () => void;
}

export const HomeworkCard: React.FC<HomeworkCardProps> = ({ homework, isLoading, onViewAll }) => {
  if (isLoading) {
    return (
      <View className="bg-white p-4 rounded-xl shadow-sm h-full">
        <View className="flex-row items-center mb-2">
          <AppIcon name="book" size={20} color="#750E11" variant="Bold" />
          <Text className="text-sm font-bold text-gray-800 ml-2">Homework</Text>
        </View>
        <View className="items-center py-4">
          <ActivityIndicator size="small" color="#750E11" />
        </View>
      </View>
    );
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays < 0) return 'Overdue';
    return `Due in ${diffDays} days`;
  };

  const getDueDateColor = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return '#EF4444'; // Red - overdue
    if (diffDays === 0) return '#F59E0B'; // Orange - due today
    if (diffDays === 1) return '#F59E0B'; // Orange - due tomorrow
    return '#10A753'; // Green - future
  };

  return (
    <View className="bg-white p-4 rounded-xl shadow-sm h-full">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <AppIcon name="book" size={20} color="#750E11" variant="Bold" />
          <Text className="text-sm font-bold text-gray-800 ml-2">Homework</Text>
        </View>
        {homework.length > 0 && (
          <View className="bg-primary/10 px-2 py-1 rounded-full">
            <Text className="text-xs text-primary font-semibold">{homework.length}</Text>
          </View>
        )}
      </View>

      {homework.length > 0 ? (
        <View>
          {homework.slice(0, 2).map((hw, index) => (
            <View
              key={hw.id}
              className={`py-2 ${index !== Math.min(homework.length, 2) - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <Text className="text-sm font-medium text-gray-800" numberOfLines={1}>
                {hw.subject}
              </Text>
              <Text 
                className="text-xs mt-1"
                style={{ color: getDueDateColor(hw.due_date) }}
              >
                {getDaysUntilDue(hw.due_date)}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View className="items-center py-2">
          <AppIcon name="checkmark-circle" size={24} color="#10A753" variant="Bold" />
          <Text className="text-xs text-gray-600 mt-1">All done! 🎉</Text>
        </View>
      )}
    </View>
  );
};
