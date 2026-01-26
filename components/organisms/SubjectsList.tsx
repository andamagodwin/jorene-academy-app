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
              className={`mr-3 p-3 rounded-xl border ${
                isSelected
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-200'
              }`}
              style={{ minWidth: 120 }}
            >
              <View className="items-center">
                <View
                  className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${
                    isSelected ? 'bg-white/20' : 'bg-primary/10'
                  }`}
                >
                  <Ionicons
                    name={getSubjectIcon(subject)}
                    size={24}
                    color={isSelected ? 'white' : '#750E11'}
                  />
                </View>
                <Text
                  className={`text-sm font-medium text-center mb-1 ${
                    isSelected ? 'text-white' : 'text-gray-800'
                  }`}
                  numberOfLines={2}
                >
                  {subject}
                </Text>
                <Text
                  className={`text-xs ${
                    isSelected ? 'text-white/80' : 'text-gray-500'
                  }`}
                >
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
