import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "@presentation/lib/stores/onboardingStore";
import OnboardingScreen from "@presentation/components/OnboardingScreen";

export default function Onboarding() {
  const router = useRouter();
  const setHasSeenOnboarding = useOnboardingStore(
    (s) => s.setHasSeenOnboarding
  );

  const handleFinish = () => {
    setHasSeenOnboarding(true);
    router.replace("./");
  };

  return <OnboardingScreen onFinish={handleFinish} />;
}
