import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuthStore } from '~/store/authStore';
import { useDashboardStore } from '~/store/dashboardStore';
import { AttendanceCard } from '~/components/organisms/AttendanceCard';
import { AlertCard } from '~/components/organisms/AlertCard';
import { LoadingScreen } from '~/components/organisms/LoadingScreen';
import { DashboardCard } from '~/components/molecules/DashboardCard';

export default function Home() {
  const { profile, selectedStudent, isInitialized } = useAuthStore();
  const { attendance, announcements, alerts, isLoading, loadDashboardData } = useDashboardStore();
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const hasLoadedOnce = useRef(false);
  const showHeader = profile?.role === 'parent' && selectedStudent;

  // Single effect to handle all initial loading
  useEffect(() => {
    // Wait for auth to be initialized
    if (!isInitialized) return;

    const loadInitialData = async () => {
      // For parents with students, load dashboard data
      if (profile?.role === 'parent' && selectedStudent) {
        await loadDashboardData(selectedStudent.id, selectedStudent.class);
      }
      
      // Mark as ready only once after first successful load
      if (!hasLoadedOnce.current) {
        hasLoadedOnce.current = true;
        setIsReady(true);
      }
    };

    // Only run if we haven't loaded yet, or if student changed after initial load
    if (!hasLoadedOnce.current) {
      loadInitialData();
    } else if (selectedStudent) {
      // Subsequent student changes - load without showing loading screen
      loadDashboardData(selectedStudent.id, selectedStudent.class);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, profile?.role, selectedStudent?.id, loadDashboardData]);

  // Show loading screen only during initial app load
  if (!isInitialized || !isReady) {
    return <LoadingScreen />;
  }

  const handleRefresh = async () => {
    if (selectedStudent) {
      setRefreshing(true);
      await loadDashboardData(selectedStudent.id, selectedStudent.class);
      setRefreshing(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView edges={showHeader ? [] : ['top']} className="flex-1 bg-background">
      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
          {/* Banner Image */}
          <View className="px-4 pt-4">
            <Image
              source={require('../../assets/images/banner-1.png')}
              className="w-full h-40 rounded-2xl"
              resizeMode="cover"
            />
          </View>

          {/* Greeting */}
          <View className="px-6 pt-6 pb-4">
            <Text className="text-2xl font-bold text-gray-800">
              {getGreeting()}, {profile?.full_name?.split(' ')[0] || 'Parent'} 👋
            </Text>
            {selectedStudent && (
              <Text className="text-sm text-gray-500 mt-1">
                Viewing {selectedStudent.full_name}&apos;s dashboard
              </Text>
            )}
          </View>

          {/* Dashboard Cards - Only show for parents with selected student */}
          {profile?.role === 'parent' && selectedStudent ? (
            <>
              {/* Alerts Card - Full Width */}
              <AlertCard alerts={alerts} />

              {/* 2x2 Grid of Cards */}
              <View className="px-4">
                <View className="flex-row flex-wrap justify-between">
                  {/* Attendance Card */}
                  <View className="w-[48%] mb-3">
                    <AttendanceCard attendance={attendance} isLoading={isLoading} />
                  </View>

                  {/* Resources Card */}
                  <View className="w-[48%] mb-3">
                    <DashboardCard
                      icon="folder"
                      iconColor="#FFFFFF"
                      title="Resources"
                      mainText="26"
                      subtitle="Learning Materials"
                      buttonText="Browse Files"
                      buttonColor="#FFFFFF"
                      buttonTextColor="#750E11"
                      onPress={() => router.push('/resources')}
                    />
                  </View>

                  {/* Fees Summary Card */}
                  <View className="w-[48%] mb-3">
                    <DashboardCard
                      icon="wallet"
                      iconColor="#FFFFFF"
                      title="Fees"
                      mainText="Term 1"
                      subtitle="Payment Status"
                      buttonText="View Details"
                      buttonColor="#FFFFFF"
                      buttonTextColor="#750E11"
                      onPress={() => router.push('/fees')}
                    />
                  </View>

                  {/* Results Card */}
                  <View className="w-[48%] mb-3">
                    <DashboardCard
                      icon="trophy"
                      iconColor="#FFFFFF"
                      title="Results"
                      mainText="Term 1"
                      subtitle="Academic Performance"
                      buttonText="View Grades"
                      buttonColor="#FCB316"
                      buttonTextColor="#750E11"
                      onPress={() => router.push('/academics')}
                    />
                  </View>
                </View>
              </View>

              {/* Announcements Section */}
              <View className="px-4 mb-4">
                <View className="bg-primary rounded-xl px-4 py-3 flex-row items-center justify-between mb-3">
                  <Text className="text-lg font-semibold text-white">Announcements</Text>
                  <TouchableOpacity onPress={() => router.push('/notifications')}>
                    <Text className="text-sm text-white font-medium">View All</Text>
                  </TouchableOpacity>
                </View>
                {announcements && announcements.length > 0 ? (
                  announcements.slice(0, 3).map((announcement) => (
                    <View key={announcement.id} className="bg-white rounded-xl p-4 mb-3">
                      <View className="flex-row items-start">
                        <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                          <Ionicons name="megaphone" size={20} color="#750E11" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-base font-semibold text-gray-800 mb-1">
                            {announcement.title}
                          </Text>
                          <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
                            {announcement.content}
                          </Text>
                          <Text className="text-xs text-gray-400">
                            {new Date(announcement.created_at).toLocaleDateString()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <View className="bg-white rounded-xl p-6 items-center">
                    <Ionicons name="megaphone-outline" size={40} color="#CCBEB7" />
                    <Text className="text-gray-500 mt-2">No announcements yet</Text>
                  </View>
                )}
              </View>
            </>
          ) : profile?.role === 'parent' && !selectedStudent ? (
            <View className="bg-white mx-4 my-2 p-8 rounded-xl shadow-sm items-center">
              <Ionicons name="people" size={48} color="#CCBEB7" />
              <Text className="text-gray-600 text-center mt-4">
                No students linked to your account yet.
              </Text>
              <Text className="text-gray-400 text-center mt-2 text-sm">
                Contact admin to link students to your profile.
              </Text>
            </View>
          ) : null}

          {/* Teacher/Admin View - Coming Soon */}
          {(profile?.role === 'teacher' || profile?.role === 'admin') && (
            <View className="bg-white mx-4 my-2 p-8 rounded-xl shadow-sm items-center">
              <Ionicons name="construct" size={48} color="#CCBEB7" />
              <Text className="text-gray-800 font-bold text-lg mt-4">
                {profile.role === 'teacher' ? 'Teacher' : 'Admin'} Dashboard
              </Text>
              <Text className="text-gray-500 text-center mt-2">
                Coming soon! This section is under development.
              </Text>
            </View>
          )}

          {/* Bottom Spacing */}
          <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
