import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AppIcon } from '../AppIcon';
import { Result } from '../../types/database';
import { useRouter } from 'expo-router';

interface ResultsViewProps {
  results: Result[];
  isLoading?: boolean;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  results,
  isLoading = false,
}) => {
  const router = useRouter();
  
  // Group results by term
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.term]) {
      acc[result.term] = [];
    }
    acc[result.term].push(result);
    return acc;
  }, {} as Record<string, Result[]>);

  const terms = Object.keys(groupedResults).sort().reverse();

  if (isLoading && results.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppIcon name="hourglass" size={48} color="#CCBEB7" />
        <Text className="text-gray-600 mt-4">Loading report cards...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-4 py-4">
        <Text className="text-sm text-black mb-4 font-semibold uppercase tracking-wider opacity-60">
          Available Report Cards
        </Text>
        
        {terms.length > 0 ? (
          terms.map((term) => {
            const termData = groupedResults[term];
            const average = Math.round(
              termData.reduce((sum, r) => sum + r.score, 0) / termData.length
            );

            return (
              <TouchableOpacity
                key={term}
                onPress={() => router.push(`/report-card/${encodeURIComponent(term)}` as any)}
                className="bg-white rounded-[24px] p-5 mb-4 flex-row items-center justify-between border border-black/5 shadow-sm"
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mr-4">
                    <AppIcon name="document-text" size={24} color="#000000" variant="Bold" />
                  </View>
                  <View>
                    <Text className="text-lg font-bold text-black">
                      {term} Report Card
                    </Text>
                    <Text className="text-sm text-black/50 mt-1">
                      {termData.length} Subjects • Avg: {average}%
                    </Text>
                  </View>
                </View>
                <AppIcon name="chevron-forward" size={20} color="#000000" />
              </TouchableOpacity>
            );
          })
        ) : (
          <View className="items-center py-20 bg-white rounded-[24px] border border-black/5">
            <AppIcon name="document-outline" size={48} color="#CCBEB7" />
            <Text className="text-black mt-4 font-semibold">No report cards found</Text>
            <Text className="text-sm text-black/50 mt-1 px-10 text-center">
              When student results are uploaded, they will appear here as formal report cards.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
