
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { students } from "../../data/students";

// Helper untuk ambil inisial dari nama
function getInitials(name?: string) {
  if (!name) return "?";
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  // Ambil 2 huruf awal dari 2 kata pertama, atau 1 kalau cuma satu kata
  const letters = parts.slice(0, 2).map((p) => p[0]);
  return letters.join("").toUpperCase();
}

export default function Home() {
  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(it) => it.nim}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: "/student/[nim]", params: { nim: item.nim } }}
            asChild
          >
            <Pressable style={styles.row}>
              {/* Avatar Inisial */}
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                {/* <Text style={styles.nim}>NIM: {item.nim}</Text> */}
              </View>

              {/* Chevron tetap Ionicons */}
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </Pressable>
          </Link>
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}

const AVATAR_SIZE = 40;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F8FAFC",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#1565c0",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5
  },
  name: { fontSize: 16, fontWeight: "600", color: "#222" },
  nim: { fontSize: 12, opacity: 0.6, marginTop: 2 }
});
