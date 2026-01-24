import React from 'react';
import { Text, TextProps } from 'react-native';

interface ErrorTextProps extends TextProps {
  visible?: boolean;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ children, visible = true, className, ...props }) => {
  if (!visible || !children) return null;

  return (
    <Text className={`text-xs text-red-500 mt-1 ${className || ''}`} {...props}>
      {children}
    </Text>
  );
};
