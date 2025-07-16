import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";


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

/* ── 9 gambar alternatif ── */
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

  const imageSize = 80;

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

  const columns = [0, 1, 2].map((col) =>
    [0, 1, 2].map((row) => col + row * 3)
  );

  // ── Data 10 Nama & 10 Font ──
  const names = [
    "MUH FIKRIR MAULANA",
    "MUHAMMAD HASRADDIN HASNAN",
    "Muhammad Dzulfikar Hidayat",
    "AHMAD YANI",
    "Rosfika Awalia",
    "YOGI A. AMMAH",
    "Usran",
    "Rika Armayani",
    "ANNAS URBACH NINGRUM",
    "Besse Taleha",
  ];

  const fonts = [
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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Identitas */}
      <View style={styles.headerDecoration} />
      <View style={styles.infoPanel}>
        <Text style={styles.nameText}>YOGI A.AMMAH</Text>
      </View>
      <View style={styles.idBox}>
        <Text style={styles.idText}>105841108222</Text>
      </View>
      <View style={styles.profileImagesRow}>
        <Image
          source={{
            uri: "https://simak.unismuh.ac.id/upload/mahasiswa/105841108222_.jpg?1752430940",
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

      {/* Grid Gambar */}
      <Text style={styles.headerText}>Grid 3×3</Text>
      <View style={styles.row}>
        {columns.map((col, colIdx) => (
          <View key={colIdx} style={styles.column}>
            {col.map((imgIdx) => (
              <Pressable key={imgIdx} onPress={() => handleImagePress(imgIdx)}>
                <Image
                  source={
                    toggled[imgIdx] ? altImages[imgIdx] : mainImages[imgIdx]
                  }
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

      {/* 10 Nama + 10 Font */}
      <Text style={styles.headerText}>10 Nama dengan 10 Font</Text>
      {names.map((name, index) => (
        <View key={index} style={styles.nameBox}>
          <Text style={[styles.namePreview, { fontFamily: fonts[index] }]}>
            {name}
          </Text>
          <Text style={styles.fontLabel}>({fonts[index]})</Text>
        </View>
      ))}
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
