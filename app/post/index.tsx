import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import { useRoute } from '@react-navigation/native';
import Header from '@/components/Header';
import { Post as PostUnique } from '../../interfaces/Post';

const Post = () => {
  const route = useRoute();
  const { postId } = route.params as { postId: number };
  const [post, setPost] = React.useState<PostUnique | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await api.get(`/posts/${postId}`);

        if (response.status === 200) {
          setPost(response.data as PostUnique);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [postId]);

  return (
    <View style={styles.container}>
      <Header />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>Não foi possível carregar dados.</Text>}
      {!loading && !error && post && (
        <View style={styles.content}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.content}</Text>

          <View style={styles.divider} />

          {post.created_by_name && post.created_at && (
            <Text style={styles.meta}>
              Criado por {post.created_by_name} em {new Date(post.created_at).toLocaleDateString()}
            </Text>
          )}

          {post.updated_by_name && post.updated_at && (
            <Text style={styles.meta}>
              Atualizado por {post.updated_by_name} em {new Date(post.updated_at).toLocaleDateString()}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  meta: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
});

export default Post;