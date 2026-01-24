import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { router } from 'expo-router';
import { LoginForm } from '../../components/organisms/LoginForm';
import { useKeyboardAvoidingView } from '../../hooks/useKeyboardAvoidingView';

type Href = Parameters<typeof router.push>[0];

export default function LoginScreen() {
  const { paddingBottom } = useKeyboardAvoidingView();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-background">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24, paddingBottom: paddingBottom + 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="w-full max-w-md self-center">
            <LoginForm onSignUpPress={() => router.push('/(auth)/signup' as Href)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
