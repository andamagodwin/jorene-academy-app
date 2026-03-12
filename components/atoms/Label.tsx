import React from 'react';
import { Text, TextProps } from 'react-native';

interface LabelProps extends TextProps {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ children, required, className, ...props }) => {
  return (
    <Text className={`text-sm font-medium text-black mb-1.5 ${className || ''}`} {...props}>
      {children}
      {required && <Text className="text-red-500"> *</Text>}
    </Text>
  );
};
