import '../global.css';

import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/authStore';
import { useDashboardStore } from '../store/dashboardStore';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { LoadingScreen } from '../components/organisms/LoadingScreen';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const { user, profile, selectedStudent, isInitialized, isFirstVisit, initialize } = useAuthStore();
  const { loadDashboardData } = useDashboardStore();
  const segments = useSegments();
  const router = useRouter();

  // Initialize Push Notifications (Token is saved to DB if user is logged in)
  const { notification } = usePushNotifications(user?.id);

  // Silently reload the dashboard in the background when a foreground notification is received
  useEffect(() => {
    if (notification && profile?.role === 'parent' && selectedStudent) {
      loadDashboardData(selectedStudent.id, selectedStudent.class);
    }
  }, [notification]);

  // Initialize auth on app start
  useEffect(() => {
    initialize();
  }, []);

  // Handle navigation based on auth state and role
  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!user && inTabsGroup) {
      // Redirect based on first visit status
      if (isFirstVisit) {
        router.replace('/(auth)/welcome');
      } else {
        router.replace('/(auth)/login');
      }
    } else if (user && inAuthGroup) {
      // Redirect to appropriate home based on role
      router.replace('/(tabs)');
    }
  }, [user, profile, segments, isInitialized, isFirstVisit]);

  // Show loading screen while initializing
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
