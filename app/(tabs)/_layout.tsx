import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#1565c0",
        tabBarLabelStyle: { fontSize: 14 },
        tabBarIcon: ({ color, size }) => {
          let iconName: any = "questioncircleo";
          if (route.name === "index") iconName = "home";
          else if (route.name === "About") iconName = "infocirlceo";
          else if (route.name === "Profil") iconName = "user";
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="About" options={{ title: "About" }} />
      <Tabs.Screen name="Profil" options={{ title: "Profil" }} />
    </Tabs>
  );
}
