import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons"; // Para o ícone do hambúrguer

const Header = () => {
  const router = useRouter();
  const userContext = useUser();
  const [menuVisible, setMenuVisible] = useState(false); // Controle de visibilidade do menu

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("userData");
    } catch (error) {
      console.error("Erro ao remover dados do usuário:", error);
    }
    userContext?.setUser(null);
    router.push("/login");
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Blog Acadêmico</Text>
        
        {/* Botão de hambúrguer visível em telas pequenas */}
        {Platform.OS === "ios" || Platform.OS === "android" ? (
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerButton}>
            <MaterialIcons name="menu" size={40} color="#fff" />
          </TouchableOpacity>
        ) : null}

        {/* Menu de navegação, visível somente quando a tela for pequena e o menu estiver aberto */}
        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => router.push("/posts")} style={styles.menuItem}>
              <Text style={styles.menuText}>Postagens</Text>
            </TouchableOpacity>
            {userContext?.user && userContext?.user.role_id === 1 && (
              <TouchableOpacity onPress={() => router.push("/admin")} style={styles.menuItem}>
                <Text style={styles.menuText}>Administração de postagens</Text>
              </TouchableOpacity>
            )}
            {userContext?.user && userContext?.user.role_id === 1 && (
              <TouchableOpacity onPress={() => router.push("/adminusers")} style={styles.menuItem}>
                <Text style={styles.menuText}>Administração de usuários</Text>
              </TouchableOpacity>
            )}
            {userContext?.user ? (
              <TouchableOpacity onPress={handleSignOut} style={styles.menuItem}>
                <Text style={styles.menuText}>Sair</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => router.push("/login")} style={styles.menuItem}>
                <Text style={styles.menuText}>Acesso de professor</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Menu horizontal para telas grandes */}
        {Platform.OS !== "ios" && Platform.OS !== "android" && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => router.push("/posts")} style={styles.button}>
              <Text style={styles.buttonText}>Postagens</Text>
            </TouchableOpacity>
            {userContext?.user && userContext?.user.role_id === 1 && (
              <TouchableOpacity onPress={() => router.push("/admin")} style={styles.button}>
                <Text style={styles.buttonText}>Administração de postagens</Text>
              </TouchableOpacity>
            )}
              {userContext?.user && userContext?.user.role_id === 1 && (
              <TouchableOpacity onPress={() => router.push("/adminusers")} style={styles.menuItem}>
                <Text style={styles.menuText}>Administração de usuários</Text>
              </TouchableOpacity>
            )}
            {userContext?.user ? (
              <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Sair</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => router.push("/login")} style={styles.button}>
                <Text style={styles.buttonText}>Acesso de professor</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#6200ee",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  hamburgerButton: {
    padding: 10,
  },
  menu: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#6200ee",
    width: 200,
    padding: 15,
    borderRadius: 5,
    zIndex: 10, // Para garantir que o menu fique acima dos outros elementos
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    marginLeft: 10,
    padding: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Header;