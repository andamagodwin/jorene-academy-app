import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { AppIcon } from '../../components/AppIcon';
import StudentRaisedHandIllustration from '../../assets/illustrations/student-raised-hand.svg';
import BannerNewIllustration from '../../assets/illustrations/banner-new.svg';
import { useAuthStore } from '~/store/authStore';
import { useDashboardStore } from '~/store/dashboardStore';
import { AlertCard } from '~/components/organisms/AlertCard';
import { LoadingScreen } from '~/components/organisms/LoadingScreen';
import { DashboardCard } from '~/components/molecules/DashboardCard';
import { useFinanceStore } from '~/store/financeStore';

export default function Home() {
  const { profile, selectedStudent, isInitialized } = useAuthStore();
  const { announcements, alerts, loadDashboardData, isLoading: isDashboardLoading } = useDashboardStore();
  const { balance, loadBalance, isLoading: isFinanceLoading } = useFinanceStore();
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const hasLoadedOnce = useRef(false);
  const showHeader = profile?.role === 'parent' && selectedStudent;

  // Single effect to handle all initial loading
  useEffect(() => {
    // Wait for auth to be initialized
    if (!isInitialized) return;

    const loadInitialData = async () => {
      // For parents with students, load dashboard data
      if (profile?.role === 'parent' && selectedStudent) {
        await Promise.all([
          loadDashboardData(selectedStudent.id, selectedStudent.class),
          loadBalance(selectedStudent.id, selectedStudent.class)
        ]);
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
      loadBalance(selectedStudent.id, selectedStudent.class);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, profile?.role, selectedStudent?.id, loadDashboardData, loadBalance]);

  // Show loading screen only during initial app load
  if (!isInitialized || !isReady) {
    return <LoadingScreen />;
  }

  const handleRefresh = async () => {
    if (selectedStudent) {
      setRefreshing(true);
      await Promise.all([
        loadDashboardData(selectedStudent.id, selectedStudent.class),
        loadBalance(selectedStudent.id, selectedStudent.class)
      ]);
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
          {isBannerVisible && (
            <View className="px-4 pt-4">
              <View className="relative w-full h-40 rounded-[24px] overflow-hidden bg-[#FFEEEE]">
                <BannerNewIllustration width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
                <TouchableOpacity
                  onPress={() => setIsBannerVisible(false)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 items-center justify-center"
                  accessibilityRole="button"
                  accessibilityLabel="Close banner"
                >
                  <AppIcon name="close" size={18} color="#FFFFFF" variant="Bold" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Greeting */}
          <View className="px-6 pt-6 pb-4">
            <Text className="text-2xl font-bold text-gray-800">
              {getGreeting()}, {profile?.full_name?.split(' ')[0] || 'Parent'} 👋
            </Text>
          </View>

          {/* Dashboard Cards - Only show for parents with selected student */}
          {profile?.role === 'parent' && selectedStudent ? (
            <>
              {/* Alerts Card - Full Width */}
              <AlertCard alerts={alerts.filter((a: any) => a.type !== 'general')} />

              {/* Grid of Cards */}
              <View className="px-4">
                <View className="flex-row flex-wrap justify-between">
                  {/* Fees Summary Card - Keep Full Width for importance */}
                  <View className="w-full mb-3">
                    <DashboardCard
                      icon="wallet"
                      iconColor="#FFFFFF"
                      title="Fees"
                      mainText={balance ? `UGX ${balance.balance.toLocaleString()}` : "UGX 0"}
                      buttonText="View Details"
                      buttonColor="#FFFFFF"
                      buttonTextColor="#750E11"
                      onPress={() => router.push('/finance')}
                    />
                  </View>

                  {/* Results Card - Side by Side */}
                  <View className="w-[48%] mb-3">
                    <DashboardCard
                      icon="trophy"
                      iconColor="#FFFFFF"
                      title="Results"
                      mainText="Term 1"
                      buttonText="View"
                      buttonColor="#FCB316"
                      buttonTextColor="#750E11"
                      onPress={() => router.push('/academics')}
                    />
                  </View>

                   {/* Circular Card - Side by Side */}
                  <View className="w-[48%] mb-3">
                    <DashboardCard
                      icon="document-text"
                      iconColor="#FFFFFF"
                      title="Circular"
                      mainText={useDashboardStore.getState().circular?.title || "Latest"}
                      buttonText="View"
                      buttonColor="#FFFFFF"
                      buttonTextColor="#111827"
                      onPress={async () => {
                        const circular = useDashboardStore.getState().circular;
                        if (circular?.pdf_url) {
                          await WebBrowser.openBrowserAsync(circular.pdf_url);
                        } else {
                          alert('No circular available at the moment.');
                        }
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* Upcoming Events Section */}
              <View className="px-4 mb-4">
                <View className="flex-row items-center justify-between mb-3 pt-2">
                  <Text className="text-lg font-bold text-gray-800">Upcoming Events</Text>
                  <View className="w-8 h-8 items-center justify-center rounded-full bg-gray-50">
                    <AppIcon name="calendar" size={18} color="#6B7280" />
                  </View>
                </View>
                
                {useDashboardStore.getState().events && useDashboardStore.getState().events.length > 0 ? (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                    {useDashboardStore.getState().events.map((event: any) => {
                      const eventDate = new Date(event.event_date);
                      return (
                        <View key={event.id} className="bg-white rounded-[24px] p-4 mr-3 border border-gray-100 shadow-sm w-[260px]">
                          <View className="flex-row items-center mb-3">
                            <View className="bg-primary/10 px-3 py-1 rounded-full">
                              <Text className="text-primary text-[10px] font-bold uppercase tracking-wider">
                                {event.category || 'School Event'}
                              </Text>
                            </View>
                          </View>
                          <Text className="text-base font-bold text-gray-800 mb-2 truncate" numberOfLines={1}>
                            {event.title}
                          </Text>
                          <View className="flex-row items-center mb-1">
                            <AppIcon name="time" size={14} color="#9CA3AF" />
                            <Text className="text-xs text-gray-500 ml-1">
                              {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </Text>
                          </View>
                          {event.location && (
                            <View className="flex-row items-center">
                              <AppIcon name="globe" size={14} color="#9CA3AF" />
                              <Text className="text-xs text-gray-500 ml-1 truncate flex-1">
                                {event.location}
                              </Text>
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <View className="bg-gray-50 rounded-[24px] p-6 items-center border border-dashed border-gray-200">
                    <Text className="text-gray-400 text-sm">No upcoming events scheduled</Text>
                  </View>
                )}
              </View>

              {/* Announcements Section */}
              <View className="px-4 mb-4">
                <View className="flex-row items-center justify-between mb-3 pt-2">
                  <Text className="text-lg font-bold text-gray-800">Announcements</Text>
                  <TouchableOpacity onPress={() => router.push('/notifications')}>
                    <Text className="text-sm text-gray-500 font-medium">View All</Text>
                  </TouchableOpacity>
                </View>
                {announcements && announcements.length > 0 ? (
                  announcements.slice(0, 3).map((announcement: any) => (
                    <View key={announcement.id} className="bg-white rounded-[24px] p-5 mb-3">
                      <View className="flex-row items-start">
                         <View className="w-10 h-10 border border-gray-100 rounded-full items-center justify-center mr-3">
                          <AppIcon name="megaphone" size={20} color="#000" variant="Linear" />
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
                  <View className="bg-white rounded-[24px] p-8 items-center border border-gray-100">
                    <AppIcon name="megaphone" size={40} color="#000" variant="Linear" />
                    <Text className="text-gray-500 mt-2">No announcements yet</Text>
                  </View>
                )}
              </View>
            </>
          ) : profile?.role === 'parent' && !selectedStudent ? (
            <View className="bg-white mx-4 my-2 p-8 rounded-[24px] items-center">
              <StudentRaisedHandIllustration width={180} height={180} />
              <Text className="text-black text-center mt-4">
                No students.
              </Text>
              <Text className="text-gray-400 text-center mt-2 text-sm">
                Contact admin to link students to your profile.
              </Text>
            </View>
          ) : null}

          {/* Teacher/Admin View - Coming Soon */}
          {(profile?.role === 'teacher' || profile?.role === 'admin') && (
            <View className="bg-white mx-4 my-2 p-8 rounded-[24px] shadow-sm items-center">
              <AppIcon name="construct" size={48} color="#CCBEB7" />
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
