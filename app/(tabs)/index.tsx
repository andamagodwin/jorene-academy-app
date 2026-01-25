import { useRouter } from 'expo-router';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '~/store/authStore';
import { useDashboardStore } from '~/store/dashboardStore';
import { AttendanceCard } from '~/components/organisms/AttendanceCard';
import { HomeworkCard } from '~/components/organisms/HomeworkCard';
import { AnnouncementCard } from '~/components/organisms/AnnouncementCard';
import { AlertCard } from '~/components/organisms/AlertCard';

export default function Home() {
  const router = useRouter();
  const { profile, selectedStudent } = useAuthStore();
  const { attendance, homework, announcements, alerts, isLoading, loadDashboardData } = useDashboardStore();
  const [refreshing, setRefreshing] = useState(false);

  // Load dashboard data when student changes
  useEffect(() => {
    if (selectedStudent && profile?.role === 'parent') {
      loadDashboardData(selectedStudent.id, selectedStudent.class);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudent?.id, profile?.role]);

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
    <View className="flex-1 bg-background">
      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
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

                  {/* Homework Card */}
                  <View className="w-[48%] mb-3">
                    <HomeworkCard homework={homework} isLoading={isLoading} />
                  </View>

                  {/* Announcements Card */}
                  <View className="w-[48%] mb-3">
                    <AnnouncementCard announcements={announcements} isLoading={isLoading} />
                  </View>

                  {/* Quick Actions Card */}
                  <View className="w-[48%] mb-3">
                    <View className="bg-white rounded-xl p-4 shadow-sm">
                      <View className="flex-row items-center mb-3">
                        <Ionicons name="flash" size={20} color="#4D3E84" />
                        <Text className="text-gray-800 font-semibold ml-2">Quick Actions</Text>
                      </View>
                      <TouchableOpacity className="flex-row items-center py-2">
                        <Ionicons name="call-outline" size={16} color="#6B7280" />
                        <Text className="text-gray-600 text-sm ml-2">Contact School</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center py-2">
                        <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                        <Text className="text-gray-600 text-sm ml-2">View Calendar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
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
    </View>
  );
}
