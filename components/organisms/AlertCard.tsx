import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppIcon } from '../AppIcon';
import { DashboardAlert } from '../../store/dashboardStore';

interface AlertCardProps {
  alerts: DashboardAlert[];
  onFixNow?: (alert: DashboardAlert) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alerts, onFixNow }) => {
  if (alerts.length === 0) return null;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'finance':
        return 'wallet';
      case 'performance':
        return 'star';
      default:
        return 'notification';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return {
          bg: '#FEE2E2',
          text: '#DC2626',
          icon: '#EF4444',
        };
      case 'warning':
        return {
          bg: '#FEF3C7',
          text: '#B45309',
          icon: '#F59E0B',
        };
      default:
        return {
          bg: '#DBEAFE',
          text: '#1E40AF',
          icon: '#3B82F6',
        };
    }
  };

  return (
    <View className="bg-white mx-4 my-2 p-5 rounded-[24px] shadow-sm">
      <View className="flex-row items-center mb-4">
        <AppIcon name="warning" size={24} color="#F59E0B" variant="Bold" />
        <Text className="text-lg font-bold text-gray-800 ml-2">Alerts</Text>
        <View className="bg-red-500 rounded-full w-6 h-6 items-center justify-center ml-2">
          <Text className="text-white text-xs font-bold">{alerts.length}</Text>
        </View>
      </View>

      <View>
        {alerts.map((alert, index) => {
          const colors = getAlertColor(alert.severity);
          return (
            <View
              key={index}
              className="mb-3 rounded-2xl p-4"
              style={{ backgroundColor: colors.bg }}
            >
              <View className="flex-row items-start">
                <AppIcon
                  name={getAlertIcon(alert.type)}
                  size={20}
                  color={colors.icon}
                  variant="Bold"
                  style={{ marginTop: 2 }}
                />
                <View className="flex-1 ml-3">
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: colors.text }}
                  >
                    {alert.message}
                  </Text>
                </View>
              </View>

              {onFixNow && (
                <TouchableOpacity
                  onPress={() => onFixNow(alert)}
                  className="mt-3 self-start"
                >
                  <Text
                    className="text-sm font-bold"
                    style={{ color: colors.icon }}
                  >
                    Fix Now →
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};
