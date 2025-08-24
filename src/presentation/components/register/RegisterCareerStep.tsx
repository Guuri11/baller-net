import React, { useState } from "react";
import { View } from "react-native";
import { Input, InputField } from "@presentation/components/ui/input";
import { Button, ButtonText } from "@presentation/components/ui/button";
import { Text } from "@presentation/components/ui/text";
import { useRouter } from "expo-router";
import { i18n } from "@presentation/lib/locales/i18n";
import { useRegisterStore } from "@presentation/lib/stores/registerStore";
import { PlayerPosition } from "@domain/player/value-objects";
import { ChevronDownIcon } from "../ui/icon";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@presentation/components/ui/select";
export function RegisterCareerStep() {
  const [position, setPosition] = useState<PlayerPosition>(
    PlayerPosition.POINT_GUARD
  );
  const [team, setTeam] = useState("");
  const [league, setLeague] = useState("");
  const [pointsPerGame, setPointsPerGame] = useState("");
  const [assistsPerGame, setAssistsPerGame] = useState("");
  const [reboundsPerGame, setReboundsPerGame] = useState("");
  const [blocksPerGame, setBlocksPerGame] = useState("");
  const [stealsPerGame, setStealsPerGame] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setCareer = useRegisterStore((s) => s.setCareer);
  const handleNext = () => {
    setError(null);
    if (
      !position ||
      !pointsPerGame ||
      !assistsPerGame ||
      !reboundsPerGame ||
      !blocksPerGame ||
      !stealsPerGame
    ) {
      setError(
        i18n.t("register.career.error.required", {
          defaultValue: "All fields are required.",
        })
      );
      return;
    }
    setCareer({
      position,
      team,
      league,
      pointsPerGame: parseFloat(pointsPerGame),
      assistsPerGame: parseFloat(assistsPerGame),
      reboundsPerGame: parseFloat(reboundsPerGame),
      blocksPerGame: parseFloat(blocksPerGame),
      stealsPerGame: parseFloat(stealsPerGame),
    });
    router.push("/register/archetype");
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
      <Text
        size="xl"
        style={{
          marginBottom: 16,
        }}
      >
        {i18n.t("register.career.title", {
          defaultValue: "Career Information",
        })}
      </Text>
      <Select
        selectedValue={position}
        onValueChange={(value: string) => setPosition(value as PlayerPosition)}
        style={{ marginBottom: 12 }}
      >
        <SelectTrigger>
          <SelectInput
            placeholder={i18n.t("register.career.position", {
              defaultValue: "Position",
            })}
            value={i18n.t(`player.position.${position.toLowerCase()}`, {
              defaultValue: position.replace("_", " "),
            })}
            readOnly
          />
          <SelectIcon as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {Object.values(PlayerPosition).map((pos) => (
              <SelectItem
                key={pos}
                value={pos}
                label={i18n.t(`player.position.${pos.toLowerCase()}`, {
                  defaultValue: pos.replace("_", " "),
                })}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
      <Input
        style={{
          marginBottom: 12,
        }}
      >
        <InputField
          onChangeText={setTeam}
          value={team}
          placeholder={i18n.t("register.career.team", {
            defaultValue: "Team (optional)",
          })}
        />
      </Input>
      <Input
        style={{
          marginBottom: 12,
        }}
      >
        <InputField
          onChangeText={setLeague}
          value={league}
          placeholder={i18n.t("register.career.league", {
            defaultValue: "League (optional)",
          })}
        />
      </Input>
      <Input
        style={{
          marginBottom: 12,
        }}
      >
        <InputField
          onChangeText={setPointsPerGame}
          value={pointsPerGame}
          placeholder={i18n.t("register.career.points", {
            defaultValue: "Points per game",
          })}
          keyboardType="numeric"
        />
      </Input>
      <Input
        style={{
          marginBottom: 12,
        }}
      >
        <InputField
          onChangeText={setAssistsPerGame}
          value={assistsPerGame}
          placeholder={i18n.t("register.career.assists", {
            defaultValue: "Assists per game",
          })}
          keyboardType="numeric"
        />
      </Input>
      <Input
        style={{
          marginBottom: 12,
        }}
      >
        <InputField
          onChangeText={setReboundsPerGame}
          value={reboundsPerGame}
          placeholder={i18n.t("register.career.rebounds", {
            defaultValue: "Rebounds per game",
          })}
          keyboardType="numeric"
        />
      </Input>
      <Input
        style={{
          marginBottom: 12,
        }}
      >
        <InputField
          onChangeText={setBlocksPerGame}
          value={blocksPerGame}
          placeholder={i18n.t("register.career.blocks", {
            defaultValue: "Blocks per game",
          })}
          keyboardType="numeric"
        />
      </Input>
      <Input
        style={{
          marginBottom: 12,
        }}
      >
        <InputField
          onChangeText={setStealsPerGame}
          value={stealsPerGame}
          placeholder={i18n.t("register.career.steals", {
            defaultValue: "Steals per game",
          })}
          keyboardType="numeric"
        />
      </Input>
      {error && (
        <Text
          style={{
            color: "#dc2626",
            marginBottom: 8,
          }}
        >
          {error}
        </Text>
      )}
      <Button
        onPress={handleNext}
        disabled={
          !position ||
          !pointsPerGame ||
          !assistsPerGame ||
          !reboundsPerGame ||
          !blocksPerGame ||
          !stealsPerGame
        }
      >
        <ButtonText>
          {i18n.t("register.career.next", {
            defaultValue: "Next",
          })}
        </ButtonText>
      </Button>
    </View>
  );
}
