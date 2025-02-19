import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from "react-native";
import api, { saveUserData } from "../../services/api";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "expo-router";
import { User } from "@/interfaces/User";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const userContext = useUser();

  const handleOnSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      interface LoginResponse {
        token: string;
        user: User;
      }      
      const response = await api.post<LoginResponse>("/user/login", { email, password });      
      if (response.status === 200) {
        const { token, user } = response.data;
        await saveUserData({ token, user });
        userContext?.setUser(user);
        router.push("/posts");
      }
    } catch (error) {
      console.log(error);
      console.error(error);
      setError("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Blog acadêmico</Text>
        <Text style={styles.subtitle}>Conteúdo sempre atualizado</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Acessar conta de professor</Text>
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleOnSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Acessar</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/posts")}> 
          <Text style={styles.link}>Sou aluno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4" },
  header: { marginBottom: 40, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 16, color: "#666" },
  form: { width: "80%", alignItems: "center" },
  label: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  input: { width: "100%", height: 40, backgroundColor: "#fff", paddingHorizontal: 10, borderRadius: 5, marginBottom: 10, borderWidth: 1, borderColor: "#ccc" },
  button: { width: "100%", height: 40, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", borderRadius: 5, marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 10, color: "#007bff", fontSize: 14 },
  error: { color: "red", marginBottom: 10 },
});

export default Login;