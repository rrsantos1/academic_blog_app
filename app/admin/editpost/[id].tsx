import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import api from "@/services/api";
import Header from "@/components/Header";

const EditPost = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await api.get(`/posts/${id}`);

        if (response.status === 200) {
          const data = response.data as { title: string; content: string };
          setTitle(data.title);
          setContent(data.content);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) getPost();
  }, [id]);

  const handleOnSubmit = async () => {
    try {
      setUpdated(false);
      setError(false);
      setLoading(true);
      const response = await api.put(`/posts/${id}`, { title, content });
      if (response.status === 201) {
        setUpdated(true);
        Alert.alert("Sucesso", "Postagem atualizada com sucesso.", [
          { text: "OK", onPress: () => router.push("/admin") },
        ]);
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
      {error && <Text style={styles.error}>Erro ao atualizar postagem</Text>}
      {updated && <Text style={styles.success}>Postagem atualizada com sucesso. Redirecionando...</Text>}
      
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Conteúdo"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={setContent}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Atualizar" onPress={handleOnSubmit} />
          <Button title="Cancelar" color="red" onPress={() => router.push("/admin")} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  success: {
    color: "green",
    marginBottom: 10,
  },
});

export default EditPost;