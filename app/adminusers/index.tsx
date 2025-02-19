import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import api from "../../services/api";
import Header from "@/components/Header";
import { User } from "@/interfaces/User";
import { useUser } from "@/contexts/UserContext";

const AdminUsers = () => {
  const router = useRouter();
  const userContext = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOnDeletePost = (user: User) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const deleteUser = async () => {
    try {
      await api.delete(`/user/${currentUser?.id}`);
      if(currentUser?.id === userContext?.user?.id) {
        userContext?.setUser(null);
        router.push("/login");
      }
      getUsers();
      setOpenModal(false);
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await api.get("/users");
      if (response.status === 200) {
        setUsers(response.data as User[]);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.headerRow}>
        <Text style={styles.title}>Usuários</Text>
        <TouchableOpacity style={styles.createButton} onPress={() => router.push("/adminusers/createuser")}>
          <Text style={styles.buttonText}>Criar usuário</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#007bff" />}
      {error && <Text style={styles.errorText}>Erro ao carregar os usuários</Text>}
      {!loading && !error && users.length === 0 && <Text>Nenhum usuário encontrado</Text>}

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => router.push(`/adminusers/edituser/${item.id}`)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOnDeletePost(item)}>
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.postTitle}>{item.name}</Text>
            <Text>email: {item.email}</Text>
            <Text>cargo: {item.role_id === 1 ? "docente" : "estudante"}</Text>
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
            <Text style={styles.modalTitle}>Excluir usuário</Text>
            <Text>Tem certeza que deseja excluir a usuário?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setOpenModal(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteUser} style={[styles.modalButton, styles.modalDeleteButton]}>
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

export default AdminUsers;