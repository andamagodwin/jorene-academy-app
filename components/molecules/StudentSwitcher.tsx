import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Student } from '../../types/database';

interface StudentSwitcherProps {
  students: Student[];
  selectedStudent: Student | null;
  onSelectStudent: (student: Student) => void;
  onNotificationPress?: () => void;
}

export const StudentSwitcher: React.FC<StudentSwitcherProps> = ({
  students,
  selectedStudent,
  onSelectStudent,
  onNotificationPress,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  if (!students || students.length === 0) return null;

  // Don't show switcher if only one student
  if (students.length === 1) {
    return (
      <View 
        className="bg-white px-4 py-3 border-b border-gray-200 flex-row items-center justify-between"
        style={{ paddingTop: statusBarHeight + 12 }}
      >
        <View className="bg-gray-100 rounded-lg px-3 py-2" style={{ width: '40%' }}>
          <Text className="text-sm font-semibold text-gray-800" numberOfLines={1}>
            {students[0].full_name}
          </Text>
          <Text className="text-xs text-gray-500">{students[0].class}</Text>
        </View>
        {onNotificationPress && (
          <TouchableOpacity onPress={onNotificationPress} className="p-2">
            <Ionicons name="notifications-outline" size={24} color="#750E11" />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <>
      <View 
        className="bg-white px-4 py-3 border-b border-gray-200 flex-row items-center justify-between"
        style={{ paddingTop: statusBarHeight + 12 }}
      >
        <TouchableOpacity
          onPress={() => setIsOpen(true)}
          className="bg-gray-100 rounded-lg px-3 py-2 flex-row items-center"
          style={{ width: '40%' }}
        >
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-800" numberOfLines={1}>
              {selectedStudent?.full_name || 'Select Student'}
            </Text>
            {selectedStudent && (
              <Text className="text-xs text-gray-500">{selectedStudent.class}</Text>
            )}
          </View>
          <Ionicons name="chevron-down" size={18} color="#6B7280" />
        </TouchableOpacity>
        {onNotificationPress && (
          <TouchableOpacity onPress={onNotificationPress} className="p-2">
            <Ionicons name="notifications-outline" size={24} color="#750E11" />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
          className="flex-1 bg-black/50 justify-center items-center p-4"
        >
          <View className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            <View className="bg-primary px-5 py-4">
              <Text className="text-white text-xl font-bold">Select Student</Text>
            </View>

            <ScrollView className="max-h-96">
              {students.map((student) => (
                <TouchableOpacity
                  key={student.id}
                  onPress={() => {
                    onSelectStudent(student);
                    setIsOpen(false);
                  }}
                  className={`px-5 py-4 border-b border-gray-100 ${
                    selectedStudent?.id === student.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-gray-800">
                        {student.full_name}
                      </Text>
                      <Text className="text-sm text-gray-500 mt-1">
                        {student.class} • {student.admission_no}
                      </Text>
                    </View>
                    {selectedStudent?.id === student.id && (
                      <Ionicons name="checkmark-circle" size={24} color="#750E11" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              className="px-5 py-4 border-t border-gray-200"
            >
              <Text className="text-center text-gray-600 font-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
