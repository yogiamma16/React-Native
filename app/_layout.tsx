// app/_layout.tsx
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "ZillaSlab-Regular": require("../assets/fonts/ZillaSlab-Regular.ttf"),
    "Slabo27px-Regular": require("../assets/fonts/Slabo27px-Regular.ttf"),
    "ShareTech-Regular": require("../assets/fonts/ShareTech-Regular.ttf"),
    "Rowdies-Regular": require("../assets/fonts/Rowdies-Regular.ttf"),
    "EduQLDHand-Regular": require("../assets/fonts/EduQLDHand-Regular.ttf"),
    "Rubik-Variable": require("../assets/fonts/Rubik-Variable.ttf"),
    "PlusJakartaSans-Variable": require("../assets/fonts/PlusJakartaSans-Variable.ttf"),
    "Nunito-Variable": require("../assets/fonts/Nunito-Variable.ttf"),
    "Mulish-Variable": require("../assets/fonts/Mulish-Variable.ttf"),
    "Lexend-Variable": require("../assets/fonts/Lexend-Variable.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;
  if (error) {
    console.error("Font load error:", error);
    return <Text>Error loading fonts</Text>;
  }
  
  return <Slot />;
}
