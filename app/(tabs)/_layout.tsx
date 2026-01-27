import { Tabs, useRouter } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useAuthStore } from '../../store/authStore';
import { StudentSwitcher } from '../../components/molecules/StudentSwitcher';

export default function TabLayout() {
  const router = useRouter();
  const { profile, students, selectedStudent, setSelectedStudent } = useAuthStore();

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
          tabBarIcon: ({ color }) => <TabBarIcon name="home-fill" color={color} family="octicons" />,
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
        name="academics"
        options={{
          title: 'Academics',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerShown: profile?.role === 'parent',
          header: () => profile?.role === 'parent' ? (
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
        name="resources"
        options={{
          title: 'Resources',
          tabBarIcon: ({ color }) => <TabBarIcon name="folder" color={color} />,
          headerShown: profile?.role === 'parent',
          header: () => profile?.role === 'parent' ? (
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
        name="fees"
        options={{
          title: 'Fees',
          tabBarIcon: ({ color }) => <TabBarIcon name="dollar" color={color} />,
          headerShown: profile?.role === 'parent',
          header: () => profile?.role === 'parent' ? (
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
