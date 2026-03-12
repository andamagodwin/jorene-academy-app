import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from '../../components/organisms/LoginForm';
import { useKeyboardAvoidingView } from '../../hooks/useKeyboardAvoidingView';

type Href = Parameters<typeof router.push>[0];

export default function LoginScreen() {
  const { paddingBottom } = useKeyboardAvoidingView();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView edges={['top']} className="flex-1 bg-background">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 bg-background">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24, paddingBottom: paddingBottom + 24 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View className="w-full max-w-md self-center">
              <View className="items-center mb-8">
                <Image
                  source={require('../../assets/images/jorene-logo-1.png')}
                  className="w-40 h-40"
                  resizeMode="contain"
                />
              </View>
              <LoginForm onSignUpPress={() => router.push('/(auth)/signup' as Href)} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
