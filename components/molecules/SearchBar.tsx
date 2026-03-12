import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { AppIcon } from '../AppIcon';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  className = '',
}) => {
  return (
    <View className={`flex-row items-center bg-transparent border border-black rounded-2xl px-4 h-[50px] ${className}`}>
      <AppIcon name="search" size={20} color="#000000" variant="Linear" />
      <TextInput
        className="flex-1 ml-3 text-black text-base h-full"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear || (() => onChangeText(''))} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <AppIcon name="close-circle" size={20} color="#000000" variant="Linear" />
        </TouchableOpacity>
      )}
    </View>
  );
};
