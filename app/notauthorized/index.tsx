import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const NotAuthorized = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Você não tem permissão para acessar esta página</Text>
      <Text style={styles.subtitle}>Faça login com uma conta de professor</Text>
      <Button title="Acessar conta" onPress={() => router.push('/posts')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
});

export default NotAuthorized;