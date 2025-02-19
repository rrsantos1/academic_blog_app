import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import api from "@/services/api";
import { Post } from "@/interfaces/Post";
import Header from "@/components/Header";

const PostDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>(); // Obtém o ID da URL
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get<Post>(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error || !post) return <Text>Erro ao carregar o post.</Text>;

  return (
    <View style={{ padding: 20 }}>
        <Header />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>{post.title}</Text>
      <Text style={{ marginTop: 10 }}>{post.content}</Text>
      <Text style={{ marginTop: 10, fontSize: 12, color: "gray" }}>
        Criado por {post.created_by_name} em {new Date(post.created_at!).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default PostDetails;