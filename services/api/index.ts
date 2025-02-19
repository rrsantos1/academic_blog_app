import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define a API dependendo do ambiente
const API_URL =
  __DEV__ // Se estamos em modo de desenvolvimento
    ? "http://10.0.2.2:3000" // Use o IP da sua máquina local
    : "http://localhost:3000"; // Para outras plataformas (iOS/ Web)

const api = axios.create({ baseURL: API_URL });

// Função para armazenar usuário e token
export const saveUserData = async (user: { token: string; user: any }) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
  }
};

// Função para carregar o usuário e definir o token antes das requisições
const loadUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      api.defaults.headers.common["Authorization"] = `Bearer ${parsedData.token}`;
    }
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  }
};

// Interceptor para garantir que o token seja carregado antes da requisição
api.interceptors.request.use(
  async (config: any) => {
    await loadUserData();
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;