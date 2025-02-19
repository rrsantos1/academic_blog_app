import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, Modal, ActivityIndicator, StyleSheet } from "react-native";
import { useDebounce } from "use-debounce";
import { useRouter } from "expo-router";
import api from "../../services/api";
import Header from "@/components/Header";
import { Post } from "../../interfaces/Post";

const Admin = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOnSearch = async () => {
    try {
      const response = await api.get(`/posts/search?search=${value}`);
      setPosts(response.data as Post[]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnDeletePost = (post: Post) => {
    setCurrentPost(post);
    setOpenModal(true);
  };

  const deletePost = async () => {
    try {
      await api.delete(`/posts/${currentPost?.id}`);
      getPosts();
      setOpenModal(false);
      setCurrentPost(null);
    } catch (error) {
      console.error(error);
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
      
      <View style={styles.headerRow}>
        <Text style={styles.title}>Postagens</Text>
        <TouchableOpacity style={styles.createButton} onPress={() => router.push("/admin/createpost")}>
          <Text style={styles.buttonText}>Criar Postagem</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar"
        onChangeText={setSearch}
      />

      {loading && <ActivityIndicator size="large" color="#007bff" />}
      {error && <Text style={styles.errorText}>Erro ao carregar os posts</Text>}
      {!loading && !error && posts.length === 0 && <Text>Nenhum post encontrado</Text>}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => router.push(`/admin/editpost/${item.id}`)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOnDeletePost(item)}>
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.content.slice(0, 20)}...</Text>
            <Text>Criado por: {item.created_by_name}</Text>
            <Text>Criado em: {new Date(item.created_at!).toLocaleDateString()}</Text>
            <Text>Atualizado por: {item.updated_by_name}</Text>
            <Text>Atualizado em: {new Date(item.updated_at!).toLocaleDateString()}</Text>
          </View>
        )}
      />

      {/* Modal para confirmação de exclusão */}
      <Modal
        visible={openModal}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Excluir postagem</Text>
            <Text>Tem certeza que deseja excluir a postagem?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setOpenModal(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deletePost} style={[styles.modalButton, styles.modalDeleteButton]}>
                <Text style={styles.modalButtonDeleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
  },
  postItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  editButton: {
    color: "#007bff",
  },
  deleteButton: {
    color: "red",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  modalButtonText: {
    fontWeight: "bold",
  },
  modalDeleteButton: {
    backgroundColor: "red",
  },
  modalButtonDeleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Admin;