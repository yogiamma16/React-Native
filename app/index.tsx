import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Student = {
  name: string;
  stambuk: number;
};

// Data nama dan stambuk
const students: Student[] = [
  { name: "MUH FIKRIR MAULANA", stambuk: 105841108201 },
  { name: "MUHAMMAD HASRADDIN HASNAN", stambuk: 105841108202 },
  { name: "Muhammad Dzulfikar Hidayat", stambuk: 105841108203 },
  { name: "AHMAD YANI", stambuk: 105841108204 },
  { name: "Rosfika Awalia", stambuk: 105841108205 },
  { name: "YOGI A. AMMAH", stambuk: 105841108222 }, // target
  { name: "Usran", stambuk: 105841108223 },
  { name: "Rika Armayani", stambuk: 105841108224 },
  { name: "ANNAS URBACH NINGRUM", stambuk: 105841108225 },
  { name: "Besse Taleha", stambuk: 105841108226 },
];

// 10 font (5 statis + 5 variable)
const fonts: string[] = [
  "ZillaSlab-Regular",
  "Slabo27px-Regular",
  "ShareTech-Regular",
  "Rowdies-Regular",
  "EduQLDHand-Regular",
  "Rubik-Variable",
  "PlusJakartaSans-Variable",
  "Nunito-Variable",
  "Mulish-Variable",
  "Lexend-Variable",
];

// Fungsi pengurutan 5 sebelum & 5 sesudah berdasarkan stambuk, secara melingkar
function getOrderedStudents(students: Student[], targetStambuk: number): Student[] {
  const index: number = students.findIndex((s: Student) => s.stambuk === targetStambuk);
  if (index === -1) return [];

  const before: Student[] = [];
  const after: Student[] = [];

  for (let i = 1; i <= 5; i++) {
    before.push(students[(index - i + students.length) % students.length]);
    after.push(students[(index + i) % students.length]);
  }

  return [...before.reverse(), students[index], ...after];
}

// Gambar
const mainImages = [
  require("../assets/images/gm1.png"),
  require("../assets/images/gm2.png"),
  require("../assets/images/gm3.png"),
  require("../assets/images/gm4.png"),
  require("../assets/images/gm5.png"),
  require("../assets/images/gm6.png"),
  require("../assets/images/gm7.png"),
  require("../assets/images/gm8.png"),
  require("../assets/images/gm9.png"),
];

const altImages = [
  require("../assets/images/gm10.png"),
  require("../assets/images/gm11.png"),
  require("../assets/images/gm12.png"),
  require("../assets/images/gm13.png"),
  require("../assets/images/gm14.png"),
  require("../assets/images/gm15.png"),
  require("../assets/images/gm16.png"),
  require("../assets/images/gm17.png"),
  require("../assets/images/gm18.png"),
];

export default function InteractiveGalleryScreen() {
  const [toggled, setToggled] = useState<boolean[]>(Array(9).fill(false));
  const [scales, setScales] = useState<number[]>(Array(9).fill(1));
  const imageSize: number = 80;

  const handleImagePress = (index: number) => {
    setToggled((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });

    setScales((prev) => {
      const next = [...prev];
      next[index] = Math.min(prev[index] * 1.2, 2);
      return next;
    });
  };

  const columns = [0, 1, 2].map((col) => [0, 1, 2].map((row) => col + row * 3));
  const ordered: Student[] = getOrderedStudents(students, 105841108222);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.headerDecoration} />
      <View style={styles.infoPanel}>
        <Text style={styles.nameText}>YOGI A. AMMAH</Text>
      </View>
      <View style={styles.idBox}>
        <Text style={styles.idText}>105841108222</Text>
      </View>

      {/* Profil */}
      <View style={styles.profileImagesRow}>
        <Image
          source={{
            uri: "https://simak.unismuh.ac.id/upload/mahasiswa/105841108222_.jpg",
          }}
          style={styles.profileImage}
        />
        <Image
          source={{
            uri: "https://uploads-us-west-2.insided.com/figma-en/attachment/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif",
          }}
          style={styles.profileImage}
        />
      </View>

      {/* Grid */}
      <Text style={styles.headerText}>Grid 3×3</Text>
      <View style={styles.row}>
        {columns.map((col, colIdx) => (
          <View key={colIdx} style={styles.column}>
            {col.map((imgIdx) => (
              <Pressable key={imgIdx} onPress={() => handleImagePress(imgIdx)}>
                <Image
                  source={toggled[imgIdx] ? altImages[imgIdx] : mainImages[imgIdx]}
                  style={[
                    styles.image,
                    {
                      width: imageSize,
                      height: imageSize,
                      transform: [{ scale: scales[imgIdx] }],
                      position: "relative",
                      zIndex: scales[imgIdx] > 1 ? 99 : 0,
                    },
                  ]}
                />
              </Pressable>
            ))}
          </View>
        ))}
      </View>

      {/* Nama dan Font */}
      <Text style={styles.headerText}>10 Nama Sesuai Stambuk</Text>
      {ordered.map((s: Student, index: number) => (
        <View key={index} style={styles.nameBox}>
          <Text style={[styles.namePreview, { fontFamily: fonts[index % fonts.length] }]}>
            {s.name}
          </Text>
          <Text style={styles.fontLabel}>Stambuk: {s.stambuk}</Text>
        </View>
      ))}

      {/* Screenshot */}
      <Text style={styles.headerText}>Screenshot Tampilan</Text>
      <Image
        source={require("../assets/screenshots/tampilan_akhir.png")}
        style={{ width: 320, height: 180, borderRadius: 8, marginBottom: 20 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f9f9f9",
  },
  headerDecoration: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FF5733",
    marginBottom: 30,
  },
  infoPanel: {
    width: 200,
    height: 60,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  idBox: {
    width: 250,
    height: 50,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  idText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  profileImagesRow: {
    flexDirection: "row",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    overflow: "visible",
  },
  column: {
    flexDirection: "column",
    marginHorizontal: 3,
  },
  image: {
    marginVertical: 3,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  nameBox: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
    elevation: 2,
    backgroundColor: "#fff",
  },
  namePreview: {
    fontSize: 22,
    textAlign: "center",
  },
  fontLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});
