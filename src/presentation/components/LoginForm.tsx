import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { i18n } from "@presentation/lib/locales/i18n";
import { SignInUseCase } from "@application/usecases/sign-in";
import { sessionRepository } from "@infrastructure/repositories";
import { useSessionStore } from "@presentation/lib/stores/sessionStore";
import { Text } from "@presentation/components/ui/text";
import { Input, InputField } from "@presentation/components/ui/input";
import { Button, ButtonText } from "@presentation/components/ui/button";
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setSession = useSessionStore((s) => s.setSession);
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new SignInUseCase(sessionRepository);
      const session = await useCase.execute({
        email,
        password,
      });
      setSession(session);
      router.replace("/");
    } catch (e: any) {
      setError(i18n.t(e.message || "session.error.not_authenticated"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ width: "100%", maxWidth: 320 }}>
      <Text size="xl" style={{ marginBottom: 16 }}>
        {i18n.t("login.title")}
      </Text>
      <Input size="sm" variant="outline" style={{ marginBottom: 12 }}>
        <InputField
          onChangeText={setEmail}
          value={email}
          placeholder={i18n.t("login.email")}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </Input>
      <Input size="sm" variant="outline" style={{ marginBottom: 12 }}>
        <InputField
          onChangeText={setPassword}
          value={password}
          placeholder={i18n.t("login.password")}
          autoCapitalize="none"
          secureTextEntry
        />
      </Input>
      {error && (
        <Text style={{ color: "#dc2626", marginBottom: 8 }}>{error}</Text>
      )}
      <Button onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ButtonText>{i18n.t("login.submit")}</ButtonText>
        )}
      </Button>
      <Button
        variant="link"
        style={{ marginTop: 16, alignSelf: "center" }}
        onPress={() => router.push("/register")}
      >
        <ButtonText>
          {i18n.t("login.createAccount", { defaultValue: "Create Account" })}
        </ButtonText>
      </Button>
    </View>
  );
}
