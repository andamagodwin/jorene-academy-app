import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SubjectsListProps {
  subjects: string[];
  selectedSubject: string | null;
  onSelectSubject: (subject: string | null) => void;
  resourceCounts?: Record<string, number>;
}

export const SubjectsList: React.FC<SubjectsListProps> = ({
  subjects,
  selectedSubject,
  onSelectSubject,
  resourceCounts = {},
}) => {
  const getSubjectIcon = (subject: string): any => {
    const subjectLower = subject.toLowerCase();
    if (subjectLower.includes('math')) return 'calculator';
    if (subjectLower.includes('english')) return 'book';
    if (subjectLower.includes('science')) return 'flask';
    if (subjectLower.includes('social')) return 'globe';
    if (subjectLower.includes('kiswahili')) return 'language';
    if (subjectLower.includes('art')) return 'color-palette';
    if (subjectLower.includes('music')) return 'musical-notes';
    if (subjectLower.includes('physical') || subjectLower.includes('pe')) return 'fitness';
    if (subjectLower.includes('religious') || subjectLower.includes('cre')) return 'book';
    return 'folder';
  };

  return (
    <View className="px-4 py-3">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-800">Subjects</Text>
        {selectedSubject && (
          <TouchableOpacity onPress={() => onSelectSubject(null)}>
            <Text className="text-sm text-primary font-medium">View All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {subjects.map((subject) => {
          const isSelected = selectedSubject === subject;
          const count = resourceCounts[subject] || 0;

          return (
            <TouchableOpacity
              key={subject}
              onPress={() => onSelectSubject(isSelected ? null : subject)}
              className="mr-3 p-3 rounded-xl bg-primary"
              style={{ 
                minWidth: 120,
                opacity: isSelected ? 1 : 0.7
              }}
            >
              <View className="items-center">
                <View className="w-12 h-12 rounded-full items-center justify-center mb-2 bg-white/20">
                  <Ionicons
                    name={getSubjectIcon(subject)}
                    size={24}
                    color="white"
                  />
                </View>
                <Text
                  className="text-sm font-medium text-center mb-1 text-white"
                  numberOfLines={2}
                >
                  {subject}
                </Text>
                <Text className="text-xs text-white/80">
                  {count} file{count !== 1 ? 's' : ''}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
