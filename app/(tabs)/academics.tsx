import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AcademicsTabs } from '../../components/organisms/AcademicsTabs';
import { ResultsView } from '../../components/organisms/ResultsView';
import { PerformanceView } from '../../components/organisms/PerformanceView';
import { AppIcon } from '../../components/AppIcon';
import { useAcademicsStore } from '../../store/academicsStore';
import { useAuthStore } from '../../store/authStore';
import { LoadingScreen } from '../../components/organisms/LoadingScreen';

type TabType = 'results' | 'performance';

export default function AcademicsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('results');

  const {
    results,
    termAverages,
    subjectTrends,
    selectedTerm,
    isLoading,
    loadResults,
    loadPerformanceMetrics,
    setSelectedTerm,
  } = useAcademicsStore();

  const { selectedStudent, profile, students } = useAuthStore();
  const showHeader = profile?.role === 'parent' && students.length > 0;

  // Load all data when student changes
  useEffect(() => {
    if (selectedStudent) {
      loadResults(selectedStudent.id);
      loadPerformanceMetrics(selectedStudent.id);
    }
  }, [selectedStudent, loadResults, loadPerformanceMetrics]);

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

      <AcademicsTabs activeTab={activeTab} onTabChange={handleTabChange} />
      {renderContent()}
    </SafeAreaView>
  );
}
