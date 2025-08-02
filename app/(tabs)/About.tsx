import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.bg}>
      <View style={styles.card}>
        <Text style={styles.title}>Tentang Aplikasi</Text>
        <Text style={styles.desc}>
          Aplikasi ini dibuat sebagai tugas Aplikasi Komputasi Bergerak menggunakan <Text style={styles.blue}>Expo Router</Text> dan <Text style={styles.blue}>React Native</Text>.
          {"\n\n"}Aplikasi ini mengimplementasi navigasi tab bar dengan tiga halaman utama.
        </Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Fungsi Setiap Halaman:</Text>
          <View style={styles.bulletBox}>
            <Bullet title="Home" desc="Menampilkan informasi tentang Unismuh Makassar beserta gambar pendukung." />
            <Bullet title="About" desc="Menjelaskan tujuan dan fungsi aplikasi, serta deskripsi singkat tiap halaman." />
            <Bullet title="Profil" desc="Menampilkan data diri pribadi dan foto profil." />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function Bullet({ title, desc }: { title: string; desc: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.dot} />
      <View style={{ flex: 1 }}>
        <Text style={styles.bulletTitle}>{title}</Text>
        <Text style={styles.bulletDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flexGrow: 1,
    backgroundColor: "#e3f0ff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    minHeight: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 24,
    width: "96%",
    maxWidth: 370,
    elevation: 5,
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1976d2",
    textAlign: "center",
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  desc: {
    color: "#233",
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 18,
    textAlign: "justify",
  },
  section: {
    marginTop: 10,
  },
  subtitle: {
    fontSize: 17,
    color: "#1976d2",
    fontWeight: "bold",
    marginBottom: 9,
  },
  bulletBox: {
    gap: 6,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 7,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#1976d2",
    marginTop: 7,
  },
  bulletTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1565c0",
    marginBottom: 1,
  },
  bulletDesc: {
    fontSize: 15,
    color: "#333",
    textAlign: "justify",
  },
  blue: {
    color: "#1976d2",
    fontWeight: "bold",
  },
});
