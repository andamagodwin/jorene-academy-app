import React, { useState } from 'react';
import { TextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  error?: boolean;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  error, 
  className, 
  isPassword = false,
  secureTextEntry,
  ...props 
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const shouldSecureText = isPassword ? !isPasswordVisible : secureTextEntry;

  if (isPassword) {
    return (
      <View className="relative">
        <TextInput
          className={`h-[50px] border rounded-lg px-4 pr-12 text-base bg-white text-gray-800 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className || ''}`}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={shouldSecureText}
          {...props}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute right-0 h-full justify-center px-4"
          activeOpacity={0.7}>
          <Ionicons
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TextInput
      className={`h-[50px] border rounded-lg px-4 text-base bg-white text-gray-800 ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className || ''}`}
      placeholderTextColor="#9CA3AF"
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
};
