import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../../services/api';
import Header from '@/components/Header';

const EditPost = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const router = useRouter();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);

  React.useEffect(() => {
    const getPost = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await api.get<{ title: string; content: string }>(`/posts/${postId}`);

        if (response.status === 200) {
          setTitle(response.data.title);
          setContent(response.data.content);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (postId) getPost();
  }, [postId]);

  const handleOnSubmit = async () => {
    try {
      setUpdated(false);
      setError(false);
      setLoading(true);
      const response = await api.put(`/posts/${postId}`, { title, content });
      if (response.status === 201) {
        setUpdated(true);
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Atualizar postagem</Text>
      {error && (
        <Text style={styles.error}>Erro ao atualizar postagem</Text>
      )}
      {updated && (
        <Text style={styles.success}>Postagem atualizada com sucesso. Redirecionando...</Text>
      )}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Conteúdo"
          multiline
          value={content}
          onChangeText={setContent}
        />
        <Button
          title={loading ? 'Carregando...' : 'Atualizar'}
          onPress={handleOnSubmit}
          disabled={loading}
        />
        <Button
          title="Cancelar"
          onPress={() => router.push('/admin')}
        />
      </View>
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
    marginBottom: 20,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  success: {
    color: 'green',
    marginBottom: 20,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default EditPost;