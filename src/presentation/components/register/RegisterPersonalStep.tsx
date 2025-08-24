import React, { useState } from "react";
import { View } from "react-native";
import { Input, InputField } from "@presentation/components/ui/input";
import { Button, ButtonText } from "@presentation/components/ui/button";
import { Text } from "@presentation/components/ui/text";
import { useRouter } from "expo-router";
import { i18n } from "@presentation/lib/locales/i18n";
import { useRegisterStore } from "@presentation/lib/stores/registerStore";

const genderOptions = [
  {
    value: "MALE",
    label: i18n.t("register.personal.gender.male", { defaultValue: "Male" }),
  },
  {
    value: "FEMALE",
    label: i18n.t("register.personal.gender.female", {
      defaultValue: "Female",
    }),
  },
  {
    value: "OTHER",
    label: i18n.t("register.personal.gender.other", { defaultValue: "Other" }),
  },
];

export function RegisterPersonalStep() {
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthdayError, setBirthdayError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setPersonal = useRegisterStore((s) => s.setPersonal);

  // Helper: auto-format birthday as YYYY-MM-DD
  const handleBirthdayChange = (text: string) => {
    // Only allow numbers and '-'
    let cleaned = text.replace(/[^0-9-]/g, "");
    // Auto-insert '-' after year and month
    if (cleaned.length === 4 && birthday.length === 3) cleaned += "-";
    if (cleaned.length === 7 && birthday.length === 6) cleaned += "-";
    // Prevent more than 10 chars
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
    setBirthday(cleaned);
    // Validate live
    if (cleaned.length === 10) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
        setBirthdayError(
          i18n.t("register.personal.birthday_invalid", {
            defaultValue: "Invalid date format.",
          })
        );
        return;
      }
      const [year, month, day] = cleaned.split("-").map(Number);
      const date = new Date(cleaned);
      const now = new Date();
      if (
        date.getFullYear() !== year ||
        date.getMonth() + 1 !== month ||
        date.getDate() !== day ||
        isNaN(date.getTime())
      ) {
        setBirthdayError(
          i18n.t("register.personal.birthday_invalid", {
            defaultValue: "Invalid date.",
          })
        );
        return;
      }
      if (date > now) {
        setBirthdayError(
          i18n.t("register.personal.birthday_future", {
            defaultValue: "Date must be in the past.",
          })
        );
        return;
      }
      setBirthdayError(null);
    } else {
      setBirthdayError(null);
    }
  };

  const handleNext = () => {
    setError(null);
    if (!gender || !birthday || !username) {
      setError(
        i18n.t("register.personal.error.required", {
          defaultValue: "All fields are required.",
        })
      );
      return;
    }
    if (birthdayError) {
      setError(birthdayError);
      return;
    }
    setPersonal({ gender, birthday: new Date(birthday), username });
    router.push("/register/physical");
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
        {i18n.t("register.personal.title", {
          defaultValue: "Personal Information",
        })}
      </Text>
      <Text style={{ marginBottom: 8 }}>
        {i18n.t("register.personal.gender.label", { defaultValue: "Gender" })}
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        {genderOptions.map((opt) => (
          <Button
            key={opt.value}
            onPress={() => setGender(opt.value)}
            variant={gender === opt.value ? "solid" : "outline"}
            style={{ marginRight: 8 }}
          >
            <ButtonText>{opt.label}</ButtonText>
          </Button>
        ))}
      </View>
      <Input style={{ marginBottom: 12 }}>
        <InputField
          onChangeText={handleBirthdayChange}
          value={birthday}
          placeholder={i18n.t("register.personal.birthday", {
            defaultValue: "YYYY-MM-DD",
          })}
          keyboardType="numeric"
          maxLength={10}
        />
      </Input>
      {birthdayError && (
        <Text style={{ color: "#dc2626", marginBottom: 8 }}>
          {birthdayError}
        </Text>
      )}
      <Input style={{ marginBottom: 12 }}>
        <InputField
          onChangeText={setUsername}
          value={username}
          placeholder={i18n.t("register.personal.username", {
            defaultValue: "Username",
          })}
        />
      </Input>
      {error && (
        <Text style={{ color: "#dc2626", marginBottom: 8 }}>{error}</Text>
      )}
      <Button onPress={handleNext} disabled={!gender || !birthday || !username}>
        <ButtonText>
          {i18n.t("register.personal.next", { defaultValue: "Next" })}
        </ButtonText>
      </Button>
    </View>
  );
}
