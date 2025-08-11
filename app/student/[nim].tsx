import { Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { students } from "../../data/students";

function getInitials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map(p => p[0]);
  return letters.join("").toUpperCase();
}

export default function StudentDetail() {
  const { nim } = useLocalSearchParams<{ nim: string }>();
  const student = useMemo(
    () => students.find((s) => s.nim === String(nim)),
    [nim]
  );

  const [imgError, setImgError] = useState(false);

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.headerGradient} />

      <Stack.Screen options={{ title: student ? student.name : "Detail Mahasiswa" }} />

      {!student ? (
        <View style={[styles.center, { zIndex: 1 }]}>
          <Text style={styles.notFound}>Mahasiswa tidak ditemukan.</Text>
        </View>
      ) : (
        <View style={{ width: "100%", zIndex: 1, paddingTop: 12 }}>
          <View style={styles.card}>
            <View style={styles.imageWrapper}>
              {!imgError && student.photo ? (
                <Image
                  source={{ uri: student.photo }}
                  style={styles.image}
                  resizeMode="contain"
                  onError={() => setImgError(true)}
                  accessibilityLabel={`Foto ${student.name}`}
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarText}>{getInitials(student.name)}</Text>
                </View>
              )}
            </View>

            <View style={styles.info}>

              <View style={styles.row}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <Text style={styles.value}>{student.name}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>NIM</Text>
                <Text style={styles.value}>{student.nim}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const AVATAR_SIZE = 120;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#eaf4ff",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100%"
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: "#1976d2",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    opacity: 0.16,
    zIndex: 0
  },

  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  notFound: { fontSize: 16, opacity: 0.7 },

  card: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },

  imageWrapper: {
    height: 260,
    width: "100%",
    backgroundColor: "#E2E8F0", 
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  },

  avatarFallback: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#1565c0",
    alignItems: "center",
    justifyContent: "center"
  },
  avatarText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: 1
  },

  info: { padding: 16 },
  title: { fontSize: 20, fontWeight: "700", color: "#0f172a" },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12
  },
  row: { marginBottom: 10 },
  label: { fontSize: 12, color: "#64748b" },
  value: { fontSize: 16, fontWeight: "600", color: "#111827", marginTop: 2 }
});
