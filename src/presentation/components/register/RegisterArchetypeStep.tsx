import React from "react";
import { View } from "react-native";
import { Text } from "@presentation/components/ui/text";
import { Button, ButtonText } from "@presentation/components/ui/button";
import { useRouter } from "expo-router";
import { i18n } from "@presentation/lib/locales/i18n";
import { useRegisterStore } from "@presentation/lib/stores/registerStore";
import { CalculateArchetypeUseCase } from "@application/usecases/calculate-archetype";
import { useSessionStore } from "@presentation/lib/stores/sessionStore";
import { Session } from "@domain/session/model";
import { Archetype } from "@domain/player/value-objects";
import { CreatePlayerUseCase } from "@application/usecases/create-player";
import { playerRepository, userRepository } from "@infrastructure/repositories";
import { v4 as uuidv4 } from "uuid";

export function RegisterArchetypeStep() {
  const router = useRouter();
  const { user, personal, physical, career } = useRegisterStore();
  const setSession = useSessionStore((s) => s.setSession);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  let archetype: Archetype | string = "-";
  if (physical && career) {
    try {
      const useCase = new CalculateArchetypeUseCase();
      archetype = useCase.execute(
        {
          heightCm: Number(physical.heightCm),
          weightKg: Number(physical.weightKg),
        },
        {
          position: career.position,
          team: career.team,
          league: career.league,
          pointsPerGame: Number(career.pointsPerGame),
          assistsPerGame: Number(career.assistsPerGame),
          reboundsPerGame: Number(career.reboundsPerGame),
          blocksPerGame: Number(career.blocksPerGame),
          stealsPerGame: Number(career.stealsPerGame),
        }
      );
    } catch (e) {
      archetype = "-";
    }
  }

  const handleFinish = async () => {
    setError(null);
    setLoading(true);
    try {
      if (!user || !personal || !physical || !career) {
        setError(
          i18n.t("register.archetype.error.incomplete", {
            defaultValue: "Registration data is incomplete.",
          })
        );
        setLoading(false);
        return;
      }
      // Fetch the full user object to get the UUID
      const registeredUser = await userRepository.findByEmail(user.email);
      if (!registeredUser) {
        setError(i18n.t("user.error.registration_failed"));
        setLoading(false);
        return;
      }
      const useCase = new CreatePlayerUseCase(playerRepository);
      const now = new Date();
      await useCase.execute({
        id: uuidv4(),
        userId: registeredUser.id, // use UUID
        personal: {
          gender: personal.gender as "MALE" | "FEMALE" | "OTHER",
          birthday: new Date(personal.birthday),
          username: personal.username,
        },
        physical: {
          heightCm: Number(physical.heightCm),
          weightKg: Number(physical.weightKg),
        },
        career: {
          ...career,
          pointsPerGame: Number(career.pointsPerGame),
          assistsPerGame: Number(career.assistsPerGame),
          reboundsPerGame: Number(career.reboundsPerGame),
          blocksPerGame: Number(career.blocksPerGame),
          stealsPerGame: Number(career.stealsPerGame),
        },
        archetype: typeof archetype === "string" ? undefined : archetype,
        createdAt: now,
        updatedAt: now,
      });
      setSession(new Session({ user: registeredUser, isAuthenticated: true }));
      router.push("/");
    } catch (e: any) {
      setError(i18n.t(e.message || "player.validation_error.unknown"));
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
        {i18n.t("register.archetype.title", { defaultValue: "Your Archetype" })}
      </Text>
      <Text style={{ marginBottom: 12 }}>
        {i18n.t("register.archetype.result", {
          defaultValue: "Based on your info, your archetype is:",
        })}
      </Text>
      <Text size="2xl" style={{ fontWeight: "bold", marginBottom: 24 }}>
        {typeof archetype === "string"
          ? archetype
          : i18n.t(
              `player.archetype.${String(Archetype[archetype]).toLowerCase()}`,
              {
                defaultValue: Archetype[archetype]?.replace(/_/g, " ") || "-",
              }
            )}
      </Text>
      <Text style={{ marginBottom: 24 }}>
        {i18n.t("register.archetype.summary", {
          defaultValue:
            "Thank you for registering! You can now start using Baller Net.",
        })}
      </Text>
      <Button onPress={handleFinish} disabled={loading}>
        <ButtonText>
          {loading
            ? i18n.t("register.archetype.loading", {
                defaultValue: "Saving...",
              })
            : i18n.t("register.archetype.finish", { defaultValue: "Finish" })}
        </ButtonText>
      </Button>
      {error && <Text style={{ color: "#dc2626", marginTop: 8 }}>{error}</Text>}
    </View>
  );
}
