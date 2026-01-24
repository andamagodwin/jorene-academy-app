import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, className, ...props }) => {
  return (
    <TextInput
      className={`h-[50px] border rounded-lg px-4 text-base bg-white text-gray-800 ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className || ''}`}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
};
