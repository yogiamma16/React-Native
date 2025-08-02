import { View, Text, Image, StyleSheet, ScrollView, Platform } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.bg}>
      <View style={styles.cardOuter}>
        <View style={styles.neoCard}>
          <Image
            source={require("../../assets/images/unismuh.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.uniName}>
            Universitas{"\n"}Muhammadiyah Makassar
          </Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Makassar</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Lokasi</Text>
            <Text style={styles.text}>
              Jl. Sultan Alauddin No.259, Makassar, Sulawesi Selatan
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Deskripsi Singkat</Text>
            <Text style={styles.text}>
              Unismuh Makassar adalah salah satu perguruan tinggi swasta terkemuka di Indonesia Timur, berlandaskan nilai-nilai Islam dan berkomitmen mencetak generasi unggul, berilmu, dan berakhlak mulia.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3f0ff",
    paddingVertical: 36,
    minHeight: "100%",
  },
  cardOuter: {
    width: "96%",
    alignItems: "center",
  },
  neoCard: {
    backgroundColor: "#f6fbff",
    borderRadius: 32,
    padding: 26,
    alignItems: "center",
    width: "100%",
    maxWidth: 380,
    // NeoMorphism shadow
    ...Platform.select({
      ios: {
        shadowColor: "#8ab6f9",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.16,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  image: {
    width: "100%",
    height: 175,
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 2.5,
    borderColor: "#1976d2",
  },
  uniName: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#1976d2",
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 32,
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "AvenirNext-DemiBold" : "sans-serif-medium",
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 2,
  },
  badge: {
    backgroundColor: "#c6e1ff",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 14,
    marginHorizontal: 5,
    shadowColor: "#1976d2",
    shadowOpacity: 0.10,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#bbdefb",
  },
  badgeText: {
    color: "#1976d2",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.4,
  },
  section: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    fontWeight: "700",
    color: "#1976d2",
    fontSize: 16,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  text: {
    color: "#38404b",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "justify",
  },
});
