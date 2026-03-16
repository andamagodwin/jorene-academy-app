import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AppIcon } from '../../components/AppIcon';
import MailBroIllustration from '../../assets/illustrations/Mail-bro.svg';
import { useDashboardStore } from '~/store/dashboardStore';

export default function NotificationsScreen() {
  const { alerts, markAlertAsRead } = useDashboardStore();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'finance': return 'cash';
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

        </View>

        {/* Notifications List */}
        <View className="px-4 py-4">
          {alerts && alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <TouchableOpacity
                key={alert.id || index}
                onPress={() => !alert.isRead && markAlertAsRead(alert.id)}
                activeOpacity={alert.isRead ? 1 : 0.7}
                className={`rounded-[16px] p-4 mb-3 shadow-sm border ${
                  alert.isRead ? 'bg-gray-50 border-gray-100' : 'bg-white border-primary/20'
                }`}
              >
                <View className="flex-row items-start">
                  <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${getAlertBgColor(alert.severity)}`}>
                    <AppIcon
                      name={getAlertIcon(alert.type)}
                      size={24}
                      color={getAlertColor(alert.severity)}
                      variant="Bold"
                    />
                  </View>

                  <View className="flex-1">
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className={`text-base capitalize ${
                        alert.isRead ? 'font-medium text-gray-500' : 'font-bold text-gray-900'
                      }`}>
                        {alert.type}
                      </Text>
                      {!alert.isRead && (
                        <View className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </View>
                    <Text className={`text-sm ${
                      alert.isRead ? 'text-gray-400' : 'text-gray-700'
                    }`}>
                      {alert.message}
                    </Text>
                    <Text className="text-xs text-gray-400 mt-2">
                      Just now
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="items-center py-20">
              <MailBroIllustration width={240} height={240} />
              <Text className="text-gray-800 font-semibold text-xl mt-6">All caught up!</Text>

            </View>
          )}
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
