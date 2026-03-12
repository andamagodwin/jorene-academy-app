import React, { useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIcon } from '../../components/AppIcon';
import { useAuthStore } from '../../store/authStore';
import { useResourcesStore } from '../../store/resourcesStore';
import { SubjectsList } from '../../components/organisms/SubjectsList';
import { ResourceCard } from '../../components/molecules/ResourceCard';
import { LoadingScreen } from '../../components/organisms/LoadingScreen';
import { SearchBar } from '../../components/molecules/SearchBar';

export default function ResourcesScreen() {
  const { selectedStudent, profile, students } = useAuthStore();
  const showHeader = profile?.role === 'parent' && students.length > 0;
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
    <SafeAreaView edges={showHeader ? [] : ['top']} className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Search Bar */}
        <View className="px-4 mb-4 mt-2">
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by title, subject..."
          />
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
              <AppIcon name="folder-open-outline" size={48} color="#CCBEB7" />
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
    </SafeAreaView>
  );
}
