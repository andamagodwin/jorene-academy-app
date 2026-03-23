import { View, Text, ScrollView, TouchableOpacity, Share, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { useDashboardStore } from '../../store/dashboardStore';

export default function CircularViewScreen() {
  const { circular } = useDashboardStore();

  const handleOpenPDF = async () => {
    if (circular?.pdf_url) {
      await WebBrowser.openBrowserAsync(circular.pdf_url);
    }
  };

  const handleDownload = async () => {
    if (circular?.pdf_url) {
      try {
        await Share.share({
          message: `Check out the ${circular.title || 'latest School Circular'} from Jorene Academy!`,
          url: circular.pdf_url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (!circular) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center p-6">
        <Ionicons name="document-text-outline" size={64} color="#E5E7EB" />
        <Text className="text-gray-500 mt-4 text-center">No circular available at the moment.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-6 bg-gray-100 px-6 py-3 rounded-xl">
          <Text className="text-gray-600 font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Custom Header */}
      <View className="px-4 py-4 border-b border-gray-100 flex-row items-center justify-between">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-50"
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">School Circular</Text>
        <TouchableOpacity 
          onPress={handleDownload}
          className="w-10 h-10 items-center justify-center rounded-full bg-primary/10"
        >
          <Ionicons name="share-outline" size={22} color="#750E11" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-gray-50 p-4">
        <View className="bg-white rounded-[32px] p-8 mt-4 shadow-sm border border-gray-100 items-center">
          <View className="w-20 h-20 bg-red-50 rounded-2xl items-center justify-center mb-6">
            <Ionicons name="document-text" size={40} color="#EF4444" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 text-center mb-2">{circular.title}</Text>
          <Text className="text-gray-500 text-center mb-8">
            Issued on {new Date(circular.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Text>

          <TouchableOpacity 
            onPress={handleOpenPDF}
            className="w-full bg-primary flex-row items-center justify-center py-5 rounded-2xl shadow-lg shadow-primary/20 mb-4"
          >
            <Ionicons name="eye" size={22} color="white" />
            <Text className="text-white font-bold ml-2 text-lg">Read Circular</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleDownload}
            className="w-full bg-gray-50 flex-row items-center justify-center py-5 rounded-2xl border border-gray-100"
          >
            <Ionicons name="download-outline" size={22} color="#4B5563" />
            <Text className="text-gray-600 font-bold ml-2 text-lg">Share / Save PDF</Text>
          </TouchableOpacity>
        </View>

        <View className="p-6 mt-4">
          <Text className="text-sm text-gray-400 text-center leading-relaxed">
            School circulars contain important information regarding school activities, fees, and updates. Please read carefully.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
