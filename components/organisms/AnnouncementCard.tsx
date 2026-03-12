import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { AppIcon } from '../AppIcon';
import { Announcement } from '../../types/database';

interface AnnouncementCardProps {
  announcements: Announcement[];
  isLoading?: boolean;
  onViewMore?: () => void;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcements,
  isLoading,
  onViewMore,
}) => {
  if (isLoading) {
    return (
      <View className="bg-white p-4 rounded-[24px] shadow-sm h-full">
        <View className="flex-row items-center mb-2">
          <AppIcon name="megaphone" size={20} color="#750E11" variant="Bold" />
          <Text className="text-sm font-bold text-gray-800 ml-2">News</Text>
        </View>
        <View className="items-center py-4">
          <ActivityIndicator size="small" color="#750E11" />
        </View>
      </View>
    );
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <View className="bg-white p-4 rounded-[24px] shadow-sm h-full">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <AppIcon name="megaphone" size={20} color="#750E11" variant="Bold" />
          <Text className="text-sm font-bold text-gray-800 ml-2">News</Text>
        </View>
        {announcements.length > 0 && (
          <View className="bg-primary/10 px-2 py-1 rounded-full">
            <Text className="text-xs text-primary font-semibold">{announcements.length}</Text>
          </View>
        )}
      </View>

      {announcements.length > 0 ? (
        <View>
          {announcements.slice(0, 2).map((announcement, index) => (
            <View
              key={announcement.id}
              className={`py-2 ${index !== Math.min(announcements.length, 2) - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <Text className="text-sm font-medium text-gray-800" numberOfLines={1}>
                {announcement.title}
              </Text>
              <Text className="text-xs text-gray-400 mt-1">
                {getTimeAgo(announcement.created_at)}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View className="items-center py-2">
          <AppIcon name="information-circle" size={24} color="#6B7280" />
          <Text className="text-xs text-gray-600 mt-1">No news</Text>
        </View>
      )}
    </View>
  );
};
