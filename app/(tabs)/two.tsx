import { Stack } from 'expo-router';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useAuthStore } from '~/store/authStore';
import { Button } from '~/components/atoms/Button';

export default function Profile() {
  const { user, signOut } = useAuthStore();

  const handleSignOut = () => {
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
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="bg-white items-center py-8 px-6 border-b border-gray-200">
          <View className="w-20 h-20 rounded-full bg-blue-500 justify-center items-center mb-4">
            <Text className="text-4xl font-bold text-white">
              {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || 
               user?.email?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-1">
            {user?.user_metadata?.full_name || 'User'}
          </Text>
          <Text className="text-base text-gray-500">{user?.email}</Text>
        </View>

        <View className="p-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Profile Details</Text>
          
          <View className="bg-white p-4 rounded-lg mb-3 shadow-sm">
            <Text className="text-xs text-gray-500 mb-1 uppercase font-medium">Full Name</Text>
            <Text className="text-base text-gray-800 font-medium">
              {user?.user_metadata?.full_name || 'Not set'}
            </Text>
          </View>

          <View className="bg-white p-4 rounded-lg mb-3 shadow-sm">
            <Text className="text-xs text-gray-500 mb-1 uppercase font-medium">Email Address</Text>
            <Text className="text-base text-gray-800 font-medium">{user?.email}</Text>
          </View>

          <View className="bg-white p-4 rounded-lg mb-3 shadow-sm">
            <Text className="text-xs text-gray-500 mb-1 uppercase font-medium">Member Since</Text>
            <Text className="text-base text-gray-800 font-medium">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'N/A'}
            </Text>
          </View>

          <View className="bg-white p-4 rounded-lg mb-3 shadow-sm">
            <Text className="text-xs text-gray-500 mb-1 uppercase font-medium">Last Sign In</Text>
            <Text className="text-base text-gray-800 font-medium">
              {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'N/A'}
            </Text>
          </View>
        </View>

        <View className="p-4">
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="outline"
            fullWidth
          />
        </View>
      </ScrollView>
    </>
  );
}
