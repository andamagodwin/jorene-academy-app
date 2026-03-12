import { View, Text, ScrollView } from 'react-native';
import { AppIcon } from '../../components/AppIcon';
import MailBroIllustration from '../../assets/illustrations/Mail-bro.svg';
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

        </View>

        {/* Notifications List */}
        <View className="px-4 py-4">
          {alerts && alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <View
                key={index}
                className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100"
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
