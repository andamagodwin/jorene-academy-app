import { Stack } from 'expo-router';
import { View, Text, ScrollView, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useAuthStore } from '~/store/authStore';
import { Button } from '~/components/atoms/Button';
import { pickProfilePhoto, uploadProfilePhoto, updateProfileAvatar, deleteOldProfilePhoto, uploadStudentPhoto, updateStudentPhoto, deleteOldStudentPhoto } from '~/utils/profilePhoto';

export default function Profile() {
  const { user, profile, students, signOut, updateProfileAvatar: updateStoreAvatar, loadStudents } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingStudentId, setUploadingStudentId] = useState<string | null>(null);

  const handleChangePhoto = async () => {
    try {
      // Pick image
      const image = await pickProfilePhoto();
      if (!image || !user) return;

      setIsUploading(true);

      // Delete old photo if exists
      if (profile?.avatar_url) {
        await deleteOldProfilePhoto(profile.avatar_url);
      }

      // Upload new photo
      const uploadResult = await uploadProfilePhoto(user.id, image.uri);
      
      if (!uploadResult.success || !uploadResult.url) {
        Alert.alert('Error', uploadResult.error || 'Failed to upload photo');
        setIsUploading(false);
        return;
      }

      // Update profile in database
      const updateResult = await updateProfileAvatar(user.id, uploadResult.url);
      
      if (!updateResult.success) {
        Alert.alert('Error', updateResult.error || 'Failed to update profile');
        setIsUploading(false);
        return;
      }

      // Update store
      updateStoreAvatar(uploadResult.url);
      
      Alert.alert('Success', 'Profile photo updated successfully');
    } catch (error) {
      console.error('Error changing photo:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const handleChangeStudentPhoto = async (studentId: string, currentPhotoUrl?: string) => {
    try {
      // Pick image
      const image = await pickProfilePhoto();
      if (!image) return;

      setUploadingStudentId(studentId);

      // Delete old photo if exists
      if (currentPhotoUrl) {
        await deleteOldStudentPhoto(currentPhotoUrl);
      }

      // Upload new photo
      const uploadResult = await uploadStudentPhoto(studentId, image.uri);
      
      if (!uploadResult.success || !uploadResult.url) {
        Alert.alert('Error', uploadResult.error || 'Failed to upload photo');
        setUploadingStudentId(null);
        return;
      }

      // Update student in database
      const updateResult = await updateStudentPhoto(studentId, uploadResult.url);
      
      if (!updateResult.success) {
        Alert.alert('Error', updateResult.error || 'Failed to update student photo');
        setUploadingStudentId(null);
        return;
      }

      // Reload students to get updated data
      await loadStudents();
      
      Alert.alert('Success', 'Student photo updated successfully');
    } catch (error) {
      console.error('Error changing student photo:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setUploadingStudentId(null);
    }
  };

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
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 bg-background">
        {/* Header with bg-primary */}
        <View className="bg-primary pt-12 pb-8 px-6">
          <View className="items-center">
            <View className="relative">
              {profile?.avatar_url ? (
                <Image 
                  source={{ uri: profile.avatar_url }} 
                  className="w-24 h-24 rounded-full bg-white"
                />
              ) : (
                <View className="w-24 h-24 rounded-full bg-white justify-center items-center">
                  <Text className="text-4xl font-bold text-primary">
                    {profile?.full_name?.charAt(0).toUpperCase() || 
                     user?.email?.charAt(0).toUpperCase() || '?'}
                  </Text>
                </View>
              )}
              
              {/* Edit button */}
              <TouchableOpacity 
                onPress={handleChangePhoto}
                disabled={isUploading}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-secondary justify-center items-center shadow-md"
              >
                {isUploading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Ionicons name="camera" size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>
            
            <Text className="text-2xl font-bold text-white mb-1 mt-4">
              {profile?.full_name || 'User'}
            </Text>
            <Text className="text-base text-white/80">{user?.email}</Text>
            <View className="mt-3 bg-white/20 px-4 py-2 rounded-full">
              <Text className="text-white font-semibold capitalize">{profile?.role || 'Parent'}</Text>
            </View>
          </View>
        </View>

        {/* Children Section */}
        {profile?.role === 'parent' && students.length > 0 && (
          <View className="px-4 py-4">
            <Text className="text-lg font-semibold text-gray-800 mb-3">My Children</Text>
            {students.map((student) => (
              <View key={student.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm flex-row items-center">
                <View className="relative mr-3">
                  {student.photo_url ? (
                    <Image 
                      source={{ uri: student.photo_url }} 
                      className="w-16 h-16 rounded-full bg-primary/10"
                    />
                  ) : (
                    <View className="w-16 h-16 rounded-full bg-primary/10 justify-center items-center">
                      <Text className="text-xl font-bold text-primary">
                        {student.full_name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  )}
                  
                  {/* Edit button for student photo */}
                  <TouchableOpacity 
                    onPress={() => handleChangeStudentPhoto(student.id, student.photo_url)}
                    disabled={uploadingStudentId === student.id}
                    className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-secondary justify-center items-center shadow-md"
                  >
                    {uploadingStudentId === student.id ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Ionicons name="camera" size={12} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                </View>
                
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800">{student.full_name}</Text>
                  <Text className="text-sm text-gray-600">{student.class}</Text>
                  <Text className="text-xs text-gray-500 mt-0.5">Admission: {student.admission_no}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Profile Details */}
        <View className="px-4 pb-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Account Details</Text>
          
          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="text-xs text-gray-500 mb-1 uppercase font-medium">Full Name</Text>
            <Text className="text-base text-gray-800 font-medium">
              {profile?.full_name || 'Not set'}
            </Text>
          </View>

          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="text-xs text-gray-500 mb-1 uppercase font-medium">Email Address</Text>
            <Text className="text-base text-gray-800 font-medium">{user?.email}</Text>
          </View>

          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="text-xs text-gray-500 mb-1 uppercase font-medium">Phone Number</Text>
            <Text className="text-base text-gray-800 font-medium">
              {profile?.phone || 'Not set'}
            </Text>
          </View>

          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="text-xs text-gray-500 mb-1 uppercase font-medium">Member Since</Text>
            <Text className="text-base text-gray-800 font-medium">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'N/A'}
            </Text>
          </View>
        </View>

        <View className="px-4 pb-8">
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
