import { Link, Tabs } from 'expo-router';
import { TouchableOpacity, Text, Alert } from 'react-native';

import { TabBarIcon } from '../../components/TabBarIcon';
import { useAuthStore } from '../../store/authStore';

export default function TabLayout() {
  const { signOut } = useAuthStore();

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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} className="mr-4">
              <Text className="text-red-500 font-semibold">Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
