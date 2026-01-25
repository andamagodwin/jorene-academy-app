import { Stack } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuthStore } from '~/store/authStore';

export default function Home() {
  const { user, profile, students, selectedStudent, setSelectedStudent } = useAuthStore();

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView className="flex-1 bg-background">
        {/* Header */}
        <View className="p-6 bg-white border-b border-neutral">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!
          </Text>
          <Text className="text-base text-gray-500">{user?.email}</Text>
          
          {/* Role Badge */}
          {profile?.role && (
            <View className={`mt-3 self-start px-4 py-2 rounded-full ${
              profile.role === 'admin' ? 'bg-primary' :
              profile.role === 'teacher' ? 'bg-info' :
              'bg-accent'
            }`}>
              <Text className="text-white font-semibold text-sm">
                {profile.role === 'admin' && '🧑‍💼 Admin'}
                {profile.role === 'teacher' && '👨‍🏫 Teacher'}
                {profile.role === 'parent' && '👨‍👩‍👧 Parent'}
              </Text>
            </View>
          )}
        </View>

        {/* Student Switcher (for parents with multiple children) */}
        {profile?.role === 'parent' && students.length > 1 && (
          <View className="bg-white m-4 p-5 rounded-xl shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-4">My Children</Text>
            <View className="gap-2">
              {students.map((student) => (
                <TouchableOpacity
                  key={student.id}
                  onPress={() => setSelectedStudent(student)}
                  className={`p-4 rounded-lg border-2 ${
                    selectedStudent?.id === student.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Text className={`font-semibold ${
                    selectedStudent?.id === student.id ? 'text-primary' : 'text-gray-800'
                  }`}>
                    {student.full_name}
                  </Text>
                  <Text className="text-sm text-gray-500 mt-1">
                    {student.class} • {student.admission_no}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Current Student Info (for parents) */}
        {profile?.role === 'parent' && selectedStudent && (
          <View className="bg-white m-4 p-5 rounded-xl shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Student Profile</Text>
            <View className="flex-row justify-between py-2 border-b border-gray-100">
              <Text className="text-sm text-gray-500 font-medium">Name:</Text>
              <Text className="text-sm text-gray-800 flex-1 text-right">{selectedStudent.full_name}</Text>
            </View>
            <View className="flex-row justify-between py-2 border-b border-gray-100">
              <Text className="text-sm text-gray-500 font-medium">Class:</Text>
              <Text className="text-sm text-gray-800 flex-1 text-right">{selectedStudent.class}</Text>
            </View>
            <View className="flex-row justify-between py-2 border-b border-gray-100">
              <Text className="text-sm text-gray-500 font-medium">Admission No:</Text>
              <Text className="text-sm text-gray-800 flex-1 text-right">{selectedStudent.admission_no}</Text>
            </View>
            {selectedStudent.gender && (
              <View className="flex-row justify-between py-2 border-b border-gray-100">
                <Text className="text-sm text-gray-500 font-medium">Gender:</Text>
                <Text className="text-sm text-gray-800 flex-1 text-right capitalize">{selectedStudent.gender}</Text>
              </View>
            )}
          </View>
        )}

        {/* Account Information */}
        <View className="bg-white m-4 p-5 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Account Information</Text>
          <View className="flex-row justify-between py-2 border-b border-gray-100">
            <Text className="text-sm text-gray-500 font-medium">Full Name:</Text>
            <Text className="text-sm text-gray-800 flex-1 text-right">{profile?.full_name || 'N/A'}</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-gray-100">
            <Text className="text-sm text-gray-500 font-medium">Email:</Text>
            <Text className="text-sm text-gray-800 flex-1 text-right">{user?.email}</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-gray-100">
            <Text className="text-sm text-gray-500 font-medium">Role:</Text>
            <Text className="text-sm text-gray-800 flex-1 text-right capitalize">{profile?.role || 'N/A'}</Text>
          </View>
          {profile?.phone && (
            <View className="flex-row justify-between py-2 border-b border-gray-100">
              <Text className="text-sm text-gray-500 font-medium">Phone:</Text>
              <Text className="text-sm text-gray-800 flex-1 text-right">{profile.phone}</Text>
            </View>
          )}
        </View>

        {/* Session Status */}
        <View className="bg-white m-4 p-5 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Session Status</Text>
          <View className="bg-accent/20 py-2 px-4 rounded-lg self-start mb-3">
            <Text className="text-accent font-semibold text-sm">✓ Authenticated</Text>
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
