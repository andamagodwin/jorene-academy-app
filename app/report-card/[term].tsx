import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIcon } from '../../components/AppIcon';
import { useAcademicsStore } from '../../store/academicsStore';

export default function ReportCardDetailScreen() {
  const { term } = useLocalSearchParams();
  const router = useRouter();
  const { results } = useAcademicsStore();
  
  const termResults = results.filter(r => r.term === term);
  
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

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-50"
        >
          <AppIcon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black">{term} Report Card</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {/* Summary Card */}
        <View className="bg-primary rounded-[32px] p-6 mb-8 shadow-lg shadow-primary/20">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-white/70 text-sm font-medium uppercase tracking-widest">Average Score</Text>
              <Text className="text-white text-5xl font-bold mt-1">{average}%</Text>
            </View>
            <View className="w-16 h-16 rounded-3xl bg-white/20 items-center justify-center">
              <AppIcon name="ribbon" size={32} color="white" variant="Bold" />
            </View>
          </View>
          <View className="h-[1px] bg-white/20 w-full mb-4" />
          <View className="flex-row justify-between">
            <Text className="text-white/80 font-medium">{termResults.length} Subjects Evaluated</Text>
            <Text className="text-white font-bold">Excellent Progress</Text>
          </View>
        </View>

        {/* Results Table */}
        <Text className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Detailed Breakdown</Text>
        
        <View className="border border-gray-100 rounded-[24px] overflow-hidden mb-10">
          {/* Table Header */}
          <View className="bg-gray-50 flex-row px-4 py-3 border-b border-gray-100">
            <Text className="flex-[2] text-xs font-bold text-gray-500 uppercase">Subject</Text>
            <Text className="flex-1 text-xs font-bold text-gray-500 uppercase text-center">Score</Text>
            <Text className="flex-1 text-xs font-bold text-gray-500 uppercase text-center">Grade</Text>
          </View>

          {/* Table Rows */}
          {termResults.map((result, index) => (
            <View 
              key={result.id} 
              className={`flex-row px-4 py-4 items-center ${index !== termResults.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <View className="flex-[2]">
                <Text className="text-black font-bold text-base">{result.subject}</Text>
                {result.teacher_comment && (
                  <Text className="text-gray-400 text-xs mt-0.5 italic" numberOfLines={1}>
                    {result.teacher_comment}
                  </Text>
                )}
              </View>
              <Text className="flex-1 text-black font-bold text-center text-base">{result.score}%</Text>
              <View className="flex-1 items-center">
                <View 
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${getGradeColor(result.grade)}15` }}
                >
                  <Text 
                    className="font-bold text-sm"
                    style={{ color: getGradeColor(result.grade) }}
                  >
                    {result.grade}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action Button */}
      <View className="p-6 border-t border-gray-50">
        <TouchableOpacity className="bg-black py-4 rounded-2xl flex-row items-center justify-center">
          <AppIcon name="download" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Download PDF Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
