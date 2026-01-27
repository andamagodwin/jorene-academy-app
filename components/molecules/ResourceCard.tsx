import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Resource } from '../../types/database';

interface ResourceCardProps {
  resource: Resource;
  onDownload?: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onDownload }) => {
  const getFileIcon = (fileType?: string) => {
    if (!fileType) return 'document-outline';
    if (fileType.includes('pdf')) return 'document-text';
    if (fileType.includes('word') || fileType.includes('doc')) return 'document';
    if (fileType.includes('image')) return 'image';
    return 'document-outline';
  };

  const getFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(resource);
    } else {
      // Default behavior: open the URL
      Linking.openURL(resource.file_url);
    }
  };

  return (
    <View className="bg-white rounded-lg p-4 mb-3">
      <View className="flex-row items-start">
        {/* File Icon */}
        <View className="w-12 h-12 bg-primary/10 rounded-lg items-center justify-center mr-3">
          <Ionicons name={getFileIcon(resource.file_type)} size={24} color="#750E11" />
        </View>

        {/* File Info */}
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-800 mb-1">
            {resource.title}
          </Text>
          
          {resource.description && (
            <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
              {resource.description}
            </Text>
          )}

          <View className="flex-row items-center">
            <View className="bg-gray-100 px-2 py-1 rounded mr-2">
              <Text className="text-xs text-gray-600">{resource.subject}</Text>
            </View>
            {resource.file_size && (
              <Text className="text-xs text-gray-500">
                {getFileSize(resource.file_size)}
              </Text>
            )}
          </View>
        </View>

        {/* Download Button */}
        <TouchableOpacity
          onPress={handleDownload}
          className="w-10 h-10 bg-accent rounded-lg items-center justify-center ml-2"
        >
          <Ionicons name="download-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
