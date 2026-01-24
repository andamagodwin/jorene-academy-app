import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../components/atoms/Button';

type Href = Parameters<typeof router.push>[0];

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Jorene Academy</Text>
          <Text style={styles.subtitle}>
            Your journey to excellence starts here
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Sign In"
            onPress={() => router.push('/login' as Href)}
            fullWidth
            style={styles.button}
          />
          <Button
            title="Create Account"
            variant="outline"
            onPress={() => router.push('/signup' as Href)}
            fullWidth
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 80,
    paddingBottom: 48,
  },
  hero: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 300,
  },
  actions: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  button: {
    marginBottom: 16,
  },
});
