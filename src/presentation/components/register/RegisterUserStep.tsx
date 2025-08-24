import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Input, InputField } from "@presentation/components/ui/input";
import { Button, ButtonText } from "@presentation/components/ui/button";
import { Text } from "@presentation/components/ui/text";
import { useRouter } from "expo-router";
import { i18n } from "@presentation/lib/locales/i18n";
import { useRegisterStore } from "@presentation/lib/stores/registerStore";
import { RegisterUserUseCase } from "@application/usecases/register-user";
import { userRepository } from "@infrastructure/repositories";

export function RegisterUserStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setUser = useRegisterStore((s) => s.setUser);

  const handleNext = async () => {
    setError(null);
    if (!name || !email || !password) {
      setError(
        i18n.t("register.user.error.required", {
          defaultValue: "All fields are required.",
        })
      );
      return;
    }
    setLoading(true);
    try {
      const useCase = new RegisterUserUseCase(userRepository);
      await useCase.execute({ name, email, password });
      setUser({ name, email, password });
      router.push("/register/personal");
    } catch (e: any) {
      setError(i18n.t(e.message || "user.validation_error.unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        maxWidth: 340,
        alignSelf: "center",
        marginTop: 32,
      }}
    >
      <Text size="xl" style={{ marginBottom: 16 }}>
        {i18n.t("register.user.title", { defaultValue: "Create your account" })}
      </Text>
      <Input style={{ marginBottom: 12 }}>
        <InputField
          onChangeText={setName}
          value={name}
          placeholder={i18n.t("register.user.name", { defaultValue: "Name" })}
        />
      </Input>
      <Input style={{ marginBottom: 12 }}>
        <InputField
          onChangeText={setEmail}
          value={email}
          placeholder={i18n.t("register.user.email", { defaultValue: "Email" })}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </Input>
      <Input style={{ marginBottom: 12 }}>
        <InputField
          onChangeText={setPassword}
          value={password}
          placeholder={i18n.t("register.user.password", {
            defaultValue: "Password",
          })}
          secureTextEntry
        />
      </Input>
      {error && (
        <Text style={{ color: "#dc2626", marginBottom: 8 }}>{error}</Text>
      )}
      <Button
        onPress={handleNext}
        disabled={loading}
        style={{ marginBottom: 8 }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ButtonText>
            {i18n.t("register.user.next", { defaultValue: "Next" })}
          </ButtonText>
        )}
      </Button>
      <Button
        variant="link"
        style={{ alignSelf: "center" }}
        onPress={() => router.replace("/login")}
      >
        <ButtonText>
          {i18n.t("register.user.backToLogin", {
            defaultValue: "Back to login",
          })}
        </ButtonText>
      </Button>
    </View>
  );
}
