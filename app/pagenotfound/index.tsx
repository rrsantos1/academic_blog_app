import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';  // Supondo que você tenha o componente Header adaptado para React Native

const PageNotFound = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>404</Text>
      <Text style={styles.subtitle}>Página não encontrada</Text>
      <Button title="Voltar para a página inicial" onPress={() => router.push('/')} />
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
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 32,
  },
});

export default PageNotFound;