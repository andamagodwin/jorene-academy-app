import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PerformanceViewProps {
  termAverages: { term: string; average: number }[];
  subjectTrends: { subject: string; scores: number[] }[];
  isLoading?: boolean;
}

export const PerformanceView: React.FC<PerformanceViewProps> = ({
  termAverages,
  subjectTrends,
  isLoading = false,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10A753';
    if (score >= 70) return '#3B82F6';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getTrendIcon = (scores: number[]): 'trending-up' | 'trending-down' | 'remove-outline' => {
    if (scores.length < 2) return 'remove-outline';
    const first = scores[0];
    const last = scores[scores.length - 1];
    if (last > first) return 'trending-up';
    if (last < first) return 'trending-down';
    return 'remove-outline';
  };

  const getTrendColor = (scores: number[]) => {
    if (scores.length < 2) return '#6B7280';
    const first = scores[0];
    const last = scores[scores.length - 1];
    if (last > first) return '#10A753';
    if (last < first) return '#EF4444';
    return '#6B7280';
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Ionicons name="hourglass" size={48} color="#CCBEB7" />
        <Text className="text-gray-600 mt-4">Loading performance...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-4 pt-4">
        {/* Term Progress */}
        {termAverages.length > 0 && (
          <>
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Term Progress
            </Text>
            <View className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
              {termAverages.map((item, index) => (
                <View key={item.term} className={index !== termAverages.length - 1 ? 'mb-3 pb-3 border-b border-gray-100' : ''}>
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-sm font-medium text-gray-800">{item.term}</Text>
                    <Text className="text-lg font-bold text-gray-800">
                      {item.average}%
                    </Text>
                  </View>
                  <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${item.average}%`,
                        backgroundColor: getScoreColor(item.average),
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Subject Analysis */}
        {subjectTrends.length > 0 && (
          <>
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Subject Performance
            </Text>
            {subjectTrends.map((subject) => (
              <View key={subject.subject} className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800">
                      {subject.subject}
                    </Text>
                    <Text className="text-sm text-gray-600 mt-1">
                      {subject.scores.length} assessment{subject.scores.length !== 1 ? 's' : ''}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Ionicons
                      name={getTrendIcon(subject.scores)}
                      size={24}
                      color={getTrendColor(subject.scores)}
                    />
                  </View>
                </View>

                {/* Score Bars */}
                <View className="flex-row items-end justify-between h-12">
                  {subject.scores.map((score, index) => (
                    <View key={index} className="flex-1 items-center mx-1">
                      <View
                        className="w-6 rounded-t"
                        style={{
                          height: `${Math.max(score / 2, 10)}%`,
                          backgroundColor: getScoreColor(score),
                        }}
                      />
                      <Text className="text-xs text-gray-600 mt-1">{score}</Text>
                    </View>
                  ))}
                </View>

                {/* Stats */}
                <View className="flex-row justify-between mt-3 pt-3 border-t border-gray-100">
                  <View className="items-center">
                    <Text className="text-xs text-gray-600">Avg</Text>
                    <Text className="text-sm font-semibold text-gray-800 mt-1">
                      {Math.round(subject.scores.reduce((a, b) => a + b, 0) / subject.scores.length)}%
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-xs text-gray-600">High</Text>
                    <Text className="text-sm font-semibold text-accent mt-1">
                      {Math.max(...subject.scores)}%
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-xs text-gray-600">Low</Text>
                    <Text className="text-sm font-semibold text-red-500 mt-1">
                      {Math.min(...subject.scores)}%
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {termAverages.length === 0 && subjectTrends.length === 0 && (
          <View className="items-center py-12">
            <Ionicons name="analytics" size={48} color="#CCBEB7" />
            <Text className="text-gray-600 mt-4">No performance data available</Text>
          </View>
        )}
      </View>

      <View className="h-8" />
    </ScrollView>
  );
};
