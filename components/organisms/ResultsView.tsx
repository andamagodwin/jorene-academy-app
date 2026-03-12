import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Result } from '../../types/database';

interface ResultsViewProps {
  results: Result[];
  selectedTerm: string;
  onTermChange: (term: string) => void;
  isLoading?: boolean;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  results,
  selectedTerm,
  onTermChange,
  isLoading = false,
}) => {
  const terms = Array.from(new Set(results.map(r => r.term))).sort().reverse();
  const termResults = results.filter(r => r.term === selectedTerm);
  
  const average = termResults.length > 0
    ? Math.round(termResults.reduce((sum, r) => sum + r.score, 0) / termResults.length)
    : 0;

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return '#10A753';
      case 'B': return '#3B82F6';
      case 'C': return '#F59E0B';
      case 'D': return '#EF4444';
      default: return '#6B7280';
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Ionicons name="hourglass" size={48} color="#CCBEB7" />
        <Text className="text-gray-600 mt-4">Loading results...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Term Selector */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-sm text-gray-600 mb-2">Select Term</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {terms.length > 0 ? terms.map((term) => (
            <TouchableOpacity
              key={term}
              onPress={() => onTermChange(term)}
              className={`px-4 py-2 rounded-lg mr-2 border ${
                term === selectedTerm
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text
                className={`font-medium ${
                  term === selectedTerm ? 'text-white' : 'text-gray-800'
                }`}
              >
                {term}
              </Text>
            </TouchableOpacity>
          )) : (
            <Text className="text-gray-500">No terms available</Text>
          )}
        </ScrollView>
      </View>

      {/* Results Cards */}
      <View className="px-4 py-4">
        {termResults.length > 0 ? (
          <>
            {termResults.map((result) => (
              <View
                key={result.id}
                className="bg-white rounded-lg p-4 mb-3 flex-row items-center justify-between"
              >
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800">
                    {result.subject}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1">
                    Score: {result.score}%
                  </Text>
                  {result.teacher_comment && (
                    <Text className="text-xs text-gray-500 mt-2 italic">
                      {result.teacher_comment}
                    </Text>
                  )}
                </View>
                <View className="items-center ml-4">
                  <View
                    className="w-16 h-16 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${getGradeColor(result.grade)}20` }}
                  >
                    <Text
                      className="text-3xl font-bold"
                      style={{ color: getGradeColor(result.grade) }}
                    >
                      {result.grade}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            {/* Term Summary */}
            <View className="bg-primary/10 rounded-lg p-4 mt-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-800 font-semibold">Term Average</Text>
                <Text className="text-2xl font-bold text-primary">{average}%</Text>
              </View>
              <View className="flex-row items-center mt-3 pt-3 border-t border-primary/20">
                <Ionicons name="star" size={16} color="#F59E0B" />
                <Text className="text-sm text-gray-600 ml-2">
                  {termResults.length} subjects
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View className="items-center py-12">
            <Ionicons name="document-outline" size={48} color="#CCBEB7" />
            <Text className="text-gray-600 mt-4">No results available</Text>
          </View>
        )}
      </View>

      <View className="h-8" />
    </ScrollView>
  );
};
