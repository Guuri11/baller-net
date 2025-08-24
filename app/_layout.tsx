// Polyfill for crypto.getRandomValues (Expo/React Native)
import "@presentation/lib/polyfills/crypto";
import "@/global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useRouter, Slot, usePathname } from "expo-router";
import { useSession } from "@presentation/lib/session";
import { useOnboardingStore } from "@presentation/lib/stores/onboardingStore";
import { GluestackUIProvider } from "@presentation/components/ui/gluestack-ui-provider";
import { Fab, FabIcon } from "@presentation/components/ui/fab";
import { MoonIcon, SunIcon } from "@presentation/components/ui/icon";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [onboardingLoaded, setOnboardingLoaded] = useState(false);
  const hasSeenOnboarding = useOnboardingStore((s) => s.hasSeenOnboarding);
  const loadOnboarding = useOnboardingStore((s) => s.loadOnboarding);
  const router = useRouter();
  const pathname = usePathname();
  const { session, loading: sessionLoading } = useSession();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    loadOnboarding().then(() => setOnboardingLoaded(true));
  }, []);

  useEffect(() => {
    if (onboardingLoaded && !hasSeenOnboarding) {
      router.replace("/onboarding");
    }
  }, [onboardingLoaded, hasSeenOnboarding]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Route protection: allow onboarding and login without auth
  useEffect(() => {
    if (
      !sessionLoading &&
      onboardingLoaded &&
      hasSeenOnboarding &&
      !session?.isAuthenticated &&
      pathname !== "/onboarding" &&
      pathname !== "/login" &&
      pathname !== "/register" &&
      pathname !== "/register/personal" &&
      pathname !== "/register/physical" &&
      pathname !== "/register/career" &&
      pathname !== "/register/archetype"
    ) {
      router.replace("/login");
    }
  }, [
    sessionLoading,
    onboardingLoaded,
    hasSeenOnboarding,
    session,
    pathname,
    router,
  ]);

  // Wait for onboarding state and session to load before rendering
  if (!loaded || !onboardingLoaded || sessionLoading) return null;
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const pathname = usePathname();
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  return (
    <GluestackUIProvider mode={colorMode}>
      <ThemeProvider value={colorMode === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
        {pathname === "/" && (
          <Fab
            onPress={() =>
              setColorMode(colorMode === "dark" ? "light" : "dark")
            }
            className="m-6"
            size="lg"
          >
            <FabIcon as={colorMode === "dark" ? MoonIcon : SunIcon} />
          </Fab>
        )}
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
