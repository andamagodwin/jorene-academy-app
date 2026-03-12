import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AcademicsTabs } from '../../components/organisms/AcademicsTabs';
import { ResultsView } from '../../components/organisms/ResultsView';
import { AttendanceView } from '../../components/organisms/AttendanceView';
import { TimetableView } from '../../components/organisms/TimetableView';
import { PerformanceView } from '../../components/organisms/PerformanceView';
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

  const { selectedStudent } = useAuthStore();

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
    <View className="flex-1 bg-background">
      <AcademicsTabs activeTab={activeTab} onTabChange={handleTabChange} />
      {renderContent()}
    </View>
  );
}
