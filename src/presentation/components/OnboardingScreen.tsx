import React from "react";
import { i18n } from "@/lib/locales/i18n";
import { Box } from "./ui/box";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { Button, ButtonText } from "./ui/button";
interface OnboardingScreenProps {
  onFinish: () => void;
}
export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onFinish,
}) => {
  return (
    <Box className="flex-1 justify-center items-center px-6">
      <VStack className="space-y-8 items-center">
        <Text size="2xl" className="font-bold">
          {i18n.t("onboarding.title")}
        </Text>
        <Text size="md" className="text-center">
          {i18n.t("onboarding.description")}
        </Text>
        <Button onPress={onFinish} className="mt-8">
          <ButtonText>{i18n.t("onboarding.getStarted")}</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};
export default OnboardingScreen;
