import React from 'react';
import { View, TextInputProps } from 'react-native';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { ErrorText } from '../atoms/ErrorText';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  isPassword?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  required,
  isPassword = false,
  ...inputProps
}) => {
  return (
    <View className="mb-4">
      {label && <Label required={required}>{label}</Label>}
      <Input error={!!error} isPassword={isPassword} {...inputProps} />
      <ErrorText>{error}</ErrorText>
    </View>
  );
};
