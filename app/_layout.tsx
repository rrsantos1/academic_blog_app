import { Slot } from "expo-router";
import { UserProvider } from "@/contexts/UserContext";

export default function Layout() {
  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  );
}