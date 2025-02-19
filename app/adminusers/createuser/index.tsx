import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import api from "../../../services/api";
import Header from "@/components/Header";

const CreateUser = () => {
  const router = useRouter();
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async () => {
    try {
      setCreated(false);
      setError(false);
      setLoading(true);
      const response = await api.post("/user", { name, email, password, role_id: Number(role) });
      if (response.status === 201) {
        setName("");
        setEmail("");
        setPassword("");
        setRole(0);
        setCreated(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Text style={styles.title}>Criar usuário</Text>
      {error && <Text style={styles.errorText}>Erro ao criar usuário</Text>}
      {created && <Text style={styles.successText}>Usuário criado com sucesso</Text>}

      <Text style={styles.caption}>Crie acesso de um docente ou estudante.</Text>

      <TextInput style={styles.input} placeholder="Nome completo" value={name} onChangeText={setName} />

      <Picker selectedValue={role} onValueChange={(itemValue, itemIndex) => setRole(Number(itemValue))} style={styles.select}>
        <Picker.Item label="Selecione uma opção" value={0} />
        <Picker.Item label="Docente" value={1} />
        <Picker.Item label="Estudante" value={2} />
      </Picker>

      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />

      <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} />

      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleOnSubmit} disabled={loading || !name || !email || !password || role === 0}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Criar</Text>}
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

export default CreateUser;
