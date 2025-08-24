import React, { useState } from "react";
import { View } from "react-native";
import { Input, InputField } from "@presentation/components/ui/input";
import { Button, ButtonText } from "@presentation/components/ui/button";
import { Text } from "@presentation/components/ui/text";
import { useRouter } from "expo-router";
import { i18n } from "@presentation/lib/locales/i18n";
import { useRegisterStore } from "@presentation/lib/stores/registerStore";

export function RegisterPhysicalStep() {
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setPhysical = useRegisterStore((s) => s.setPhysical);

  const handleNext = () => {
    setError(null);
    const height = parseInt(heightCm, 10);
    const weight = parseInt(weightKg, 10);
    if (!height || !weight) {
      setError(
        i18n.t("register.physical.error.required", {
          defaultValue: "All fields are required.",
        })
      );
      return;
    }
    setPhysical({ heightCm: height, weightKg: weight });
    router.push("/register/career");
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
        {i18n.t("register.physical.title", {
          defaultValue: "Physical Information",
        })}
      </Text>
      <Input style={{ marginBottom: 12 }}>
        <InputField
          onChangeText={setHeightCm}
          value={heightCm}
          placeholder={i18n.t("register.physical.height", {
            defaultValue: "Height (cm)",
          })}
          keyboardType="numeric"
        />
      </Input>
      <Input style={{ marginBottom: 12 }}>
        <InputField
          onChangeText={setWeightKg}
          value={weightKg}
          placeholder={i18n.t("register.physical.weight", {
            defaultValue: "Weight (kg)",
          })}
          keyboardType="numeric"
        />
      </Input>
      {error && (
        <Text style={{ color: "#dc2626", marginBottom: 8 }}>{error}</Text>
      )}
      <Button onPress={handleNext} disabled={!heightCm || !weightKg}>
        <ButtonText>
          {i18n.t("register.physical.next", { defaultValue: "Next" })}
        </ButtonText>
      </Button>
    </View>
  );
}
