import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

/* ── 9 gambar utama ── */
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

  const imageSize = 80; // ukuran awal

  const handleImagePress = (index: number) => {
    setToggled((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });

    setScales((prev) => {
      const next = [...prev];
      next[index] = Math.min(prev[index] * 1.2, 2); // maksimal 2x
      return next;
    });
  };

  // Grid 3 kolom x 3 baris: index 0-8
  const columns = [0, 1, 2].map((col) =>
    [0, 1, 2].map((row) => col + row * 3)
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header identitas */}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },

  /* Header Identitas */
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
  },
  idText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  profileImagesRow: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    marginHorizontal: 5,
    borderRadius: 10,
  },

  /* Grid Gambar */
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    overflow: "visible",
    position: "relative",
  },
  column: {
    flexDirection: "column",
    marginHorizontal: 3,
    overflow: "visible",
    position: "relative",
  },
  image: {
    marginVertical: 3,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
});
