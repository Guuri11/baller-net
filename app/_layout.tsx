import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { useRouter, Slot, usePathname } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
// ...existing code...
import { StatusBar } from 'expo-status-bar';
import { Fab, FabIcon } from '@/components/ui/fab';
import { MoonIcon, SunIcon } from '@/components/ui/icon';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [onboardingLoaded, setOnboardingLoaded] = useState(false);
  const hasSeenOnboarding = useOnboardingStore(s => s.hasSeenOnboarding);
  const loadOnboarding = useOnboardingStore(s => s.loadOnboarding);
  const router = useRouter();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    loadOnboarding().then(() => setOnboardingLoaded(true));
  }, []);

  useEffect(() => {
    if (onboardingLoaded && !hasSeenOnboarding) {
  router.replace('./onboarding');
    }
  }, [onboardingLoaded, hasSeenOnboarding]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Wait for onboarding state to load before rendering
  if (!loaded || !onboardingLoaded) return null;
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const pathname = usePathname();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  return (
    <GluestackUIProvider mode={colorMode}>
      <ThemeProvider value={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
        {pathname === '/' && (
          <Fab
            onPress={() =>
              setColorMode(colorMode === 'dark' ? 'light' : 'dark')
            }
            className="m-6"
            size="lg"
          >
            <FabIcon as={colorMode === 'dark' ? MoonIcon : SunIcon} />
          </Fab>
        )}
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
