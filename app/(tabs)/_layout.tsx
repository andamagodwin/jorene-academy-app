import { Tabs, useRouter } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useAuthStore } from '../../store/authStore';
import { StudentSwitcher } from '../../components/molecules/StudentSwitcher';

export default function TabLayout() {
  const router = useRouter();
  const { profile, students, selectedStudent, setSelectedStudent } = useAuthStore();
  const showStudentHeader = profile?.role === 'parent' && students.length > 0;

  const handleNotificationPress = () => {
    router.push('/(tabs)/notifications');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#750E11',
        tabBarInactiveTintColor: '#000000',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="home-fill" color={color} focused={focused} />,
          headerShown: showStudentHeader,
          header: () => showStudentHeader ? (
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
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="book" color={color} focused={focused} />,
          headerShown: showStudentHeader,
          header: () => showStudentHeader ? (
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
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="folder" color={color} focused={focused} />,
          headerShown: showStudentHeader,
          header: () => showStudentHeader ? (
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
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="dollar" color={color} focused={focused} />,
          headerShown: showStudentHeader,
          header: () => showStudentHeader ? (
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
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="user" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          href: null,
          headerStyle: {
            backgroundColor: '#750E11',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            color: '#FFFFFF',
          },
        }}
      />
    </Tabs>
  );
}
