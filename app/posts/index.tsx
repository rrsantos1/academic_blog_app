import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useDebounce } from "use-debounce";
import { useRouter } from "expo-router";
import api from "@/services/api";
import Header from "@/components/Header";
import { Post } from "../../interfaces/Post";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const router = useRouter();

  const handleOnSearch = async () => {
    try {
      const response = await api.get(`/posts/search?search=${value}`);
      setPosts(response.data as Post[]);
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await api.get("/posts");
      if (response.status === 200) {
        setPosts(response.data as Post[]);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (value) {
      handleOnSearch();
    } else {
      getPosts();
    }
  }, [value]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Postagens</Text>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar"
        value={search}
        onChangeText={setSearch}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>Erro ao carregar os posts</Text>}
      {!loading && !error && posts.length === 0 && <Text>Nenhum post encontrado</Text>}
      <FlatList
        data={posts}
        keyExtractor={(post) => String(post.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: "/posts/[id]", params: { id: String(item.id) } })}
          >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.content.slice(0, 200)}...</Text>
            <Text style={styles.caption}>
              Criado por {item.created_by_name} em {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Data desconhecida"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  caption: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
});

export default Posts;