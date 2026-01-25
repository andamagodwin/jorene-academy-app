import { Tabs, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useAuthStore } from '../../store/authStore';
import { StudentSwitcher } from '../../components/molecules/StudentSwitcher';

export default function TabLayout() {
  const router = useRouter();
  const { signOut, profile, students, selectedStudent, setSelectedStudent } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  const handleNotificationPress = () => {
    router.push('/(tabs)/notifications');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#750E11',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: profile?.role === 'parent' && students.length > 0,
          header: () => profile?.role === 'parent' && students.length > 0 ? (
            <StudentSwitcher
              students={students}
              selectedStudent={selectedStudent}
              onSelectStudent={setSelectedStudent}
              onNotificationPress={handleNotificationPress}
            />
          ) : null,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
