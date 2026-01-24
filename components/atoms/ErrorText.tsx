import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface ErrorTextProps extends TextProps {
  visible?: boolean;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ children, visible = true, style, ...props }) => {
  if (!visible || !children) return null;

  return (
    <Text style={[styles.error, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
});
