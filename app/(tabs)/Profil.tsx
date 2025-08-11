import { Image, Platform, StyleSheet, Text, View } from "react-native";

export default function ProfilScreen() {
  return (
    <View style={styles.bg}>
      <View style={styles.headerGradient} />
      <View style={styles.profileCard}>
        {/* Foto Profil */}
        <Image
          source={require("../../assets/images/105841108222_.jpg")}
          style={styles.avatar}
        />
        {/* Nama & NIM */}
        <Text style={styles.name}>YOGI A.AMMAH</Text>
        <Text style={styles.nim}>105841108222</Text>
        <View style={styles.line} />

        {/* Info utama */}
        <View style={styles.infoBox}>
          <Info label="Kelas" value="6C" />
          <Info label="Jurusan" value="Informatika" />
          <Info label="Fakultas" value="Teknik" />
        </View>

        <Text style={styles.footerNote}>
          * Data Informasi saya.*
        </Text>
      </View>
    </View>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#eaf4ff",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100%",
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
    zIndex: 0,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    width: 330,
    marginTop: 55,
    elevation: 6,
    shadowColor: "#1565c0",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 60,
    marginBottom: 14,
    borderWidth: 4,
    borderColor: "#1976d2",
    backgroundColor: "#f4f7fa",
    ...Platform.select({
      ios: {
        shadowColor: "#1565c0",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.11,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  name: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#1565c0",
    letterSpacing: 0.4,
    textAlign: "center",
    marginBottom: 1,
  },
  nim: {
    fontSize: 15.5,
    color: "#2473d7",
    fontWeight: "600",
    marginBottom: 10,
    letterSpacing: 1,
    textAlign: "center",
  },
  line: {
    width: 70,
    height: 2,
    backgroundColor: "#1565c0",
    marginVertical: 8,
    borderRadius: 2,
    alignSelf: "center",
  },
  infoBox: {
    width: "100%",
    marginTop: 2,
    gap: 9,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#e7eaf1",
    paddingBottom: 6,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#1565c0",
    fontSize: 15.5,
    flex: 1.2,
  },
  infoValue: {
    fontWeight: "600",
    color: "#222",
    fontSize: 15.5,
    flex: 1.6,
    textAlign: "right",
  },
  footerNote: {
    color: "#b7b7b7",
    fontSize: 12.7,
    marginTop: 18,
    textAlign: "center",
    fontStyle: "italic",
  },
});
