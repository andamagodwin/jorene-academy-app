import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AcademicsTabs } from '../../components/organisms/AcademicsTabs';
import { ResultsView } from '../../components/organisms/ResultsView';
import { AttendanceView } from '../../components/organisms/AttendanceView';
import { TimetableView } from '../../components/organisms/TimetableView';
import { PerformanceView } from '../../components/organisms/PerformanceView';
import { AppIcon } from '../../components/AppIcon';
import { useAcademicsStore } from '../../store/academicsStore';
import { useAuthStore } from '../../store/authStore';
import { LoadingScreen } from '../../components/organisms/LoadingScreen';

type TabType = 'results' | 'attendance' | 'timetable' | 'performance';

export default function AcademicsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('results');

  const {
    results,
    timetable,
    attendancePercentage,
    termAverages,
    subjectTrends,
    selectedTerm,
    isLoading,
    loadResults,
    loadTimetable,
    loadAttendanceSummary,
    loadPerformanceMetrics,
    setSelectedTerm,
  } = useAcademicsStore();

  const { selectedStudent, profile, students } = useAuthStore();
  const showHeader = profile?.role === 'parent' && students.length > 0;

  // Load all data when student changes
  useEffect(() => {
    if (selectedStudent) {
      loadResults(selectedStudent.id);
      loadTimetable(selectedStudent.class);
      loadAttendanceSummary(selectedStudent.id);
      loadPerformanceMetrics(selectedStudent.id);
    }
  }, [selectedStudent, loadResults, loadTimetable, loadAttendanceSummary, loadPerformanceMetrics]);

  // Show loading screen only on initial load
  if (isLoading && results.length === 0) {
    return <LoadingScreen />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'results':
        return (
          <ResultsView
            results={results}
            selectedTerm={selectedTerm}
            onTermChange={setSelectedTerm}
            isLoading={isLoading}
          />
        );
      case 'attendance':
        return (
          <AttendanceView
            attendancePercentage={attendancePercentage}
            isLoading={isLoading}
          />
        );
      case 'timetable':
        return (
          <TimetableView
            timetable={timetable}
            isLoading={isLoading}
          />
        );
      case 'performance':
        return (
          <PerformanceView
            termAverages={termAverages}
            subjectTrends={subjectTrends}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabType);
  };

  return (
    <SafeAreaView edges={showHeader ? [] : ['top']} className="flex-1 bg-background">
      <View className="px-4 pt-4 pb-3">
        <View className="bg-white rounded-[28px] px-5 py-5 border border-black/5">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-2xl font-bold text-black">Academics</Text>
              <Text className="text-sm text-black/65 mt-1">
                {selectedStudent
                  ? `Track ${selectedStudent.full_name.split(' ')[0]}'s results, attendance, timetable, and growth.`
                  : 'Track results, attendance, timetable, and performance in one place.'}
              </Text>
            </View>
            <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center">
              <AppIcon name="document-text" size={22} color="#750E11" variant="Bold" />
            </View>
          </View>
        </View>
      </View>
      <AcademicsTabs activeTab={activeTab} onTabChange={handleTabChange} />
      {renderContent()}
    </SafeAreaView>
  );
}
