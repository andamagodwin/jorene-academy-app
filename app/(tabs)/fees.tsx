import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { useFeesStore } from '../../store/feesStore';
import { BalanceCard } from '../../components/molecules/BalanceCard';
import { PaymentCard } from '../../components/molecules/PaymentCard';
import { InvoiceCard } from '../../components/molecules/InvoiceCard';
import { ReceiptCard } from '../../components/molecules/ReceiptCard';
import { LoadingScreen } from '../../components/organisms/LoadingScreen';

type TabType = 'overview' | 'history' | 'invoices' | 'receipts';

export default function FeesScreen() {
  const { selectedStudent, profile, students } = useAuthStore();
  const showHeader = profile?.role === 'parent' && students.length > 0;
  const {
    balance,
    payments,
    invoices,
    receipts,
    isLoading,
    loadBalance,
    loadPayments,
    loadInvoices,
    loadReceipts,
  } = useFeesStore();

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Load data when student changes or tab changes
  useEffect(() => {
    if (!selectedStudent) return;

    switch (activeTab) {
      case 'overview':
        loadBalance(selectedStudent.id, selectedStudent.class);
        break;
      case 'history':
        loadPayments(selectedStudent.id);
        break;
      case 'invoices':
        loadInvoices(selectedStudent.id);
        break;
      case 'receipts':
        loadReceipts(selectedStudent.id);
        break;
    }
  }, [selectedStudent, activeTab, loadBalance, loadPayments, loadInvoices, loadReceipts]);

  // Show loading screen only on initial load
  if (isLoading && activeTab === 'overview' && !balance) {
    return <LoadingScreen />;
  }

  const renderTabButton = (tab: TabType, label: string) => (
    <TouchableOpacity
      onPress={() => setActiveTab(tab)}
      className={`flex-1 py-3 ${
        activeTab === tab
          ? 'border-b-2 border-primary'
          : 'border-b border-gray-200'
      }`}
    >
      <Text
        className={`text-center font-semibold ${
          activeTab === tab ? 'text-primary' : 'text-gray-500'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <View className="py-4">
            {balance ? (
              <>
                <BalanceCard balance={balance} />
                <View className="px-4 mt-2">
                  <Text className="text-sm text-gray-600 text-center">
                    View payment history and invoices using the tabs above
                  </Text>
                </View>
              </>
            ) : (
              <View className="px-4 py-8">
                <Text className="text-center text-gray-500">
                  No fee structure found for {selectedStudent?.class}
                </Text>
              </View>
            )}
          </View>
        );

      case 'history':
        return (
          <View className="py-4 px-4">
            {payments.length > 0 ? (
              payments.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))
            ) : (
              <View className="py-8">
                <Text className="text-center text-gray-500">
                  No payment history found
                </Text>
              </View>
            )}
          </View>
        );

      case 'invoices':
        return (
          <View className="py-4 px-4">
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
              ))
            ) : (
              <View className="py-8">
                <Text className="text-center text-gray-500">
                  No invoices found
                </Text>
              </View>
            )}
          </View>
        );

      case 'receipts':
        return (
          <View className="py-4 px-4">
            {receipts.length > 0 ? (
              receipts.map((receipt) => (
                <ReceiptCard key={receipt.id} receipt={receipt} />
              ))
            ) : (
              <View className="py-8">
                <Text className="text-center text-gray-500">
                  No receipts found
                </Text>
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView edges={showHeader ? [] : ['top']} className="flex-1 bg-background">
      {/* Tab Navigation */}
      <View className="bg-white flex-row border-b border-gray-200">
        {renderTabButton('overview', 'Overview')}
        {renderTabButton('history', 'History')}
        {renderTabButton('invoices', 'Invoices')}
        {renderTabButton('receipts', 'Receipts')}
      </View>

      {/* Content */}
      <ScrollView className="flex-1">
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
