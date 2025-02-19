import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../../../services/api";
import Header from "@/components/Header";
import { User } from "@/interfaces/User";

const EditUser = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async () => {
    try {
      setUpdated(false);
      setError(false);
      setLoading(true);
      const response = await api.put(`/user/${id}`, { name, email, password, role_id: Number(role) });
      if (response.status === 201) {
        setUpdated(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await api.get<User>(`/user/${id}`);

        if (response.status === 200) {
          setName(response.data.name);
          setEmail(response.data.email);
          setRole(response.data.role_id);          
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) getUser();
  }, [id]);	

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Text style={styles.title}>Atualizar usuário</Text>
      {error && <Text style={styles.errorText}>Erro ao atualizar usuário</Text>}
      {updated && <Text style={styles.successText}>Usuário atualizado com sucesso</Text>}

      <TextInput style={styles.input} placeholder="Nome completo" value={name} onChangeText={setName} />

      <Picker selectedValue={role} onValueChange={(itemValue, itemIndex) => setRole(Number(itemValue))} style={styles.select}>
        <Picker.Item label="Selecione uma opção" value={0} />
        <Picker.Item label="Docente" value={1} />
        <Picker.Item label="Estudante" value={2} />
      </Picker>

      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />

      <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} />

      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleOnSubmit} disabled={loading || !name || !email || role === 0}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Atualizar</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.push("/adminusers")}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  caption: {
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007bff",
  },
  cancelButtonText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  successText: {
    color: "green",
    marginBottom: 10,
  },
  select: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default EditUser;
