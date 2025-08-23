import React from "react";
import { View } from "react-native";
import { LoginForm } from "@presentation/components/LoginForm";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <LoginForm />
    </View>
  );
}
