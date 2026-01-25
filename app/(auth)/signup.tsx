import React from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { SignUpForm } from '../../components/organisms/SignUpForm';
import { useKeyboardAvoidingView } from '../../hooks/useKeyboardAvoidingView';

export default function SignUpScreen() {
  const { paddingBottom } = useKeyboardAvoidingView();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-background">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24, paddingBottom: paddingBottom + 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="w-full max-w-md self-center">
            <View className="items-center mb-6">
              <Image
                source={require('../../assets/images/jorene-logo-1.png')}
                className="w-32 h-32"
                resizeMode="contain"
              />
            </View>
            <SignUpForm onSignInPress={() => router.back()} />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
