import React, { useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useResourcesStore } from '../../store/resourcesStore';
import { SubjectsList } from '../../components/organisms/SubjectsList';
import { ResourceCard } from '../../components/molecules/ResourceCard';
import { LoadingScreen } from '../../components/organisms/LoadingScreen';

export default function ResourcesScreen() {
  const { selectedStudent } = useAuthStore();
  const {
    filteredResources,
    subjects,
    selectedSubject,
    searchQuery,
    isLoading,
    loadResources,
    setSelectedSubject,
    setSearchQuery,
    downloadResource,
  } = useResourcesStore();

  // Calculate resource counts per subject
  const resourceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredResources.forEach((resource) => {
      counts[resource.subject] = (counts[resource.subject] || 0) + 1;
    });
    return counts;
  }, [filteredResources]);

  // Load resources when student changes
  useEffect(() => {
    if (selectedStudent) {
      loadResources(selectedStudent.class);
    }
  }, [selectedStudent, loadResources]);

  // Show loading screen only on initial load
  if (isLoading && filteredResources.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Search Bar */}
        <View className="px-4 mb-4">
          <View className="flex-row items-center bg-white rounded-xl px-4 py-3 border border-gray-200">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-3 text-gray-800"
              placeholder="Search by title, subject..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Subjects List */}
        {subjects.length > 0 && !searchQuery && (
          <SubjectsList
            subjects={subjects}
            selectedSubject={selectedSubject}
            onSelectSubject={setSelectedSubject}
            resourceCounts={resourceCounts}
          />
        )}

        {/* Resources List */}
        <View className="px-4 py-4">
          {selectedSubject && (
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-semibold text-gray-800">
                {selectedSubject} Resources
              </Text>
              <Text className="text-sm text-gray-500">
                {filteredResources.length} file{filteredResources.length !== 1 ? 's' : ''}
              </Text>
            </View>
          )}

          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onDownload={downloadResource}
              />
            ))
          ) : (
            <View className="items-center py-12">
              <Ionicons name="folder-open-outline" size={48} color="#CCBEB7" />
              <Text className="text-gray-600 mt-4 text-center">
                {searchQuery
                  ? 'No resources found matching your search'
                  : 'No resources available yet'}
              </Text>
              {!searchQuery && (
                <Text className="text-gray-400 text-sm mt-2 text-center">
                  Resources will appear here once uploaded by teachers
                </Text>
              )}
            </View>
          )}
        </View>

        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
