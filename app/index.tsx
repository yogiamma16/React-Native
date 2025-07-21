import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// Type untuk data siswa
type Student = {
  name: string;
  stambuk: number;
};

// Array 10 nama siswa
const students: Student[] = [
  { name: "MUH FIKRIR MAULANA", stambuk: 105841108201 },
  { name: "MUHAMMAD HASRADDIN HASNAN", stambuk: 105841108202 },
  { name: "Muhammad Dzulfikar Hidayat", stambuk: 105841108203 },
  { name: "AHMAD YANI", stambuk: 105841108204 },
  { name: "Rosfika Awalia", stambuk: 105841108205 },
  { name: "YOGI A. AMMAH", stambuk: 105841108222 }, // Target
  { name: "Usran", stambuk: 105841108223 },
  { name: "Rika Armayani", stambuk: 105841108224 },
  { name: "ANNAS URBACH NINGRUM", stambuk: 105841108225 },
  { name: "Besse Taleha", stambuk: 105841108226 },
];

// 10 font yang sudah diimport di _layout.tsx
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

// Fungsi untuk ambil 5 sebelum, target, dan 5 sesudah (melingkar)
function getCircularNeighbors(
  arr: Student[],
  targetStambuk: number,
  jumlah: number = 5
): { before: Student[]; target: Student; after: Student[] } {
  const idx: number = arr.findIndex((s: Student) => s.stambuk === targetStambuk);
  if (idx === -1) throw new Error("Target stambuk tidak ditemukan!");
  let before: Student[] = [];
  for (let i = jumlah; i >= 1; i--) {
    before.push(arr[(idx - i + arr.length) % arr.length]);
  }
  let after: Student[] = [];
  for (let i = 1; i <= jumlah; i++) {
    after.push(arr[(idx + i) % arr.length]);
  }
  return { before, target: arr[idx], after };
}

export default function StudentScreen() {
  const targetStambuk: number = 105841108222;
  const { before, target, after } = getCircularNeighbors(students, targetStambuk, 5);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 5 Nama Sebelum Target */}
      <Text style={styles.sectionTitle}>5 Nama Sebelum Stambuk Target</Text>
      {before.map((s: Student, idx: number) => (
        <View key={s.stambuk} style={styles.nameBox}>
          <Text style={[styles.nameText, { fontFamily: fonts[idx % fonts.length] }]}>{s.name}</Text>
          <Text style={styles.stambukText}>Stambuk: {s.stambuk}</Text>
        </View>
      ))}

      {/* Stambuk Target */}
      <Text style={[styles.sectionTitle, { color: "#3498db" }]}>Stambuk Target</Text>
      <View style={[styles.nameBox, { backgroundColor: "#e3f2fd" }]}>
        <Text style={[styles.nameText, { fontFamily: fonts[5], fontWeight: "bold" }]}>{target.name}</Text>
        <Text style={[styles.stambukText, { fontWeight: "bold" }]}>Stambuk: {target.stambuk}</Text>
      </View>

      {/* 5 Nama Sesudah Target */}
      <Text style={styles.sectionTitle}>5 Nama Sesudah Stambuk Target</Text>
      {after.map((s: Student, idx: number) => (
        <View key={s.stambuk} style={styles.nameBox}>
          <Text style={[styles.nameText, { fontFamily: fonts[(idx + 6) % fonts.length] }]}>{s.name}</Text>
          <Text style={styles.stambukText}>Stambuk: {s.stambuk}</Text>
        </View>
      ))}

      {/* Screenshot */}
      <Text style={styles.sectionTitle}>Screenshot Tampilan</Text>
      <Image
        source={require("../assets/screenshots/tampilan_akhir.png")}
        style={styles.screenshot}
      />
      <Text style={styles.noteText}>
        (File screenshot harus ada pada /assets/screenshots/tampilan_akhir.png)
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  nameBox: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    width: 320,
    alignItems: "center",
    elevation: 1,
  },
  nameText: {
    fontSize: 20,
    textAlign: "center",
  },
  stambukText: {
    fontSize: 12,
    color: "#555",
    marginTop: 3,
  },
  screenshot: {
    width: 320,
    height: 180,
    borderRadius: 8,
    marginVertical: 14,
    borderWidth: 2,
    borderColor: "#888",
  },
  noteText: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    marginBottom: 30,
  },
});
