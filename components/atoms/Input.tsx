import React, { useState } from 'react';
import { TextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import { Eye, EyeSlash } from 'iconsax-react-native';

interface InputProps extends TextInputProps {
  error?: boolean;
  isPassword?: boolean;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
  error, 
  className, 
  isPassword = false,
  secureTextEntry,
  leftIcon,
  ...props 
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const shouldSecureText = isPassword ? !isPasswordVisible : secureTextEntry;
  const hasLeftIcon = !!leftIcon;

  if (isPassword) {
    return (
      <View className="relative flex-row items-center">
        {hasLeftIcon && (
          <View className="absolute left-0 h-full justify-center pl-4 z-10">
            {leftIcon}
          </View>
        )}
        <TextInput
          className={`flex-1 h-[50px] border rounded-xl text-base bg-white text-black ${
            hasLeftIcon ? 'pl-12' : 'px-4'
          } pr-12 ${
            error ? 'border-red-500' : 'border-black'
          } ${className || ''}`}
          placeholderTextColor="#999"
          secureTextEntry={shouldSecureText}
          {...props}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute right-0 h-full justify-center px-4"
          activeOpacity={0.7}>
          {isPasswordVisible ? (
            <EyeSlash size={20} color="#000" variant="Linear" />
          ) : (
            <Eye size={20} color="#000" variant="Linear" />
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="relative flex-row items-center">
      {hasLeftIcon && (
        <View className="absolute left-0 h-full justify-center pl-4 z-10">
          {leftIcon}
        </View>
      )}
      <TextInput
        className={`flex-1 h-[50px] border rounded-xl text-base bg-white text-black ${
          hasLeftIcon ? 'pl-12' : 'px-4'
        } ${
          error ? 'border-red-500' : 'border-black'
        } ${className || ''}`}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  );
};
