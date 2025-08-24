import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";

interface AppScreenProps {
  children: React.ReactNode;
  style?: any;
}

export const AppScreen: React.FC<AppScreenProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, style]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
});
