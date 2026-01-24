import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const variantClasses = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    outline: 'bg-transparent border border-blue-500',
  };

  const textVariantClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-blue-500',
  };

  return (
    <TouchableOpacity
      className={`h-[50px] rounded-lg justify-center items-center px-6 ${variantClasses[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${isDisabled ? 'opacity-50' : ''} ${className || ''}`}
      disabled={isDisabled}
      {...props}>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#3B82F6' : '#FFFFFF'} />
      ) : (
        <Text className={`text-base font-semibold ${textVariantClasses[variant]}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
