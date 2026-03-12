import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardStore } from '~/store/dashboardStore';

export default function NotificationsScreen() {
  const { alerts } = useDashboardStore();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'attendance': return 'calendar';
      case 'fees': return 'cash';
      case 'performance': return 'trending-up';
      default: return 'information-circle';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'error': return '#DC2626';
      case 'warning': return '#F59E0B';
      default: return '#3B82F6';
    }
  };

  const getAlertBgColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-100';
      case 'warning': return 'bg-yellow-100';
      default: return 'bg-blue-100';
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Subheader */}
        <View className="px-6 pt-4 pb-3">
          <Text className="text-sm text-gray-500">
            Stay updated with your child&apos;s activities
          </Text>
        </View>

        {/* Notifications List */}
        <View className="px-4 py-4">
          {alerts && alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <View
                key={index}
                className="bg-white rounded-lg p-4 mb-3"
              >
                <View className="flex-row items-start">
                  <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${getAlertBgColor(alert.severity)}`}>
                    <Ionicons
                      name={getAlertIcon(alert.type)}
                      size={24}
                      color={getAlertColor(alert.severity)}
                    />
                  </View>
                  
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800 mb-1 capitalize">
                      {alert.type}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      {alert.message}
                    </Text>
                    <Text className="text-xs text-gray-400 mt-2">
                      Just now
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-20">
              <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
                <Ionicons name="notifications-off-outline" size={40} color="#9CA3AF" />
              </View>
              <Text className="text-gray-800 font-semibold text-lg">No Notifications</Text>
              <Text className="text-gray-500 text-center mt-2 px-8">
                You&apos;re all caught up! New notifications will appear here.
              </Text>
            </View>
          )}
        </View>

        {/* Sample Notifications (for demonstration) */}
        {(!alerts || alerts.length === 0) && (
          <View className="px-4">
            <Text className="text-gray-400 text-xs uppercase tracking-wide mb-3 px-1">
              Recent Activity
            </Text>
            
            <View className="bg-white rounded-lg p-4 mb-3 opacity-50">
              <View className="flex-row items-start">
                <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3">
                  <Ionicons name="checkmark-circle" size={24} color="#10A753" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800 mb-1">
                    Attendance Marked
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Your child was marked present today
                  </Text>
                  <Text className="text-xs text-gray-400 mt-2">
                    2 hours ago
                  </Text>
                </View>
              </View>
            </View>

            <View className="bg-white rounded-lg p-4 mb-3 opacity-50">
              <View className="flex-row items-start">
                <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                  <Ionicons name="information-circle" size={24} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800 mb-1">
                    New Announcement
                  </Text>
                  <Text className="text-sm text-gray-600">
                    School has posted a new announcement
                  </Text>
                  <Text className="text-xs text-gray-400 mt-2">
                    Yesterday
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
