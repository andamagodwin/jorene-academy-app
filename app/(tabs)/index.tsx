import { Stack } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { useAuthStore } from '~/store/authStore';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6 bg-white border-b border-gray-200">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</Text>
          <Text className="text-base text-gray-500">{user?.email}</Text>
          {user?.user_metadata?.full_name && (
            <Text className="text-lg text-blue-500 font-semibold">{user.user_metadata.full_name}</Text>
          )}
        </View>

        <View className="bg-white m-4 p-5 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Account Information</Text>
          <View className="flex-row justify-between py-2 border-b border-gray-100">
            <Text className="text-sm text-gray-500 font-medium">User ID:</Text>
            <Text className="text-sm text-gray-800 flex-1 text-right">{user?.id}</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-gray-100">
            <Text className="text-sm text-gray-500 font-medium">Email:</Text>
            <Text className="text-sm text-gray-800 flex-1 text-right">{user?.email}</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-gray-100">
            <Text className="text-sm text-gray-500 font-medium">Created:</Text>
            <Text className="text-sm text-gray-800 flex-1 text-right">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </Text>
          </View>
        </View>

        <View className="bg-white m-4 p-5 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Session Status</Text>
          <View className="bg-green-100 py-2 px-4 rounded-lg self-start mb-3">
            <Text className="text-green-800 font-semibold text-sm">✓ Authenticated</Text>
          </View>
          <Text className="text-sm text-gray-500 leading-5">
            Your session is active and will be automatically refreshed. You can safely close the
            app and return without logging in again.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
