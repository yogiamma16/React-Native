import { StyleSheet, Text, View } from 'react-native';

// --- Definisi Tipe (Interfaces) untuk Props Masing-Masing Komponen ---

interface TriangleShapeProps {
  color: string;
  size: number;
  label?: string; // label is optional
}

interface PillShapeProps {
  textContent: string;
  pillColor: string;
  textColor: string;
}

interface RectangleBoxProps {
  name: string;
  boxColor: string;
  nameColor: string;
}

// --- Komponen Segitiga Terpisah ---
// Kita mendefinisikan tipe props menggunakan interface TriangleShapeProps
const TriangleShape = ({ color, size, label }: TriangleShapeProps) => (
  <View
    style={[
      styles.triangleBase,
      {
        borderBottomWidth: size,
        borderLeftWidth: size / 2,
        borderRightWidth: size / 2,
        borderBottomColor: color,
      },
    ]}
  >
    {label && <Text style={styles.triangleLabel}>{label}</Text>}df
  </View>
);

// --- Komponen Tabung Terpisah ---
// Kita mendefinisikan tipe props menggunakan interface PillShapeProps
const PillShape = ({ textContent, pillColor, textColor }: PillShapeProps) => (
  <View style={[styles.pillContainer, { backgroundColor: pillColor }]}>
    <Text style={[styles.pillText, { color: textColor }]}>
      {textContent}
    </Text>
  </View>
);

// --- Komponen Persegi Panjang Terpisah ---
// Kita mendefinisikan tipe props menggunakan interface RectangleBoxProps
const RectangleBox = ({ name, boxColor, nameColor }: RectangleBoxProps) => (
  <View style={[styles.rectangleContainer, { backgroundColor: boxColor }]}>
    <Text style={[styles.rectangleText, { color: nameColor }]}>
      {name}
    </Text>
  </View>
);

export default function App() {
  return (
    <View style={styles.mainContainer}>
      {/* Deskripsi: Ini adalah komponen segitiga.
        Digunakan untuk menambahkan elemen visual yang menarik.
      */}
      <TriangleShape color="mediumseagreen" size={120} label="" />

      {/* Deskripsi: Komponen berbentuk tabung (pill).
        Digunakan untuk menampilkan Stambuk Mahasiswa.
      */}
      <PillShape
        textContent="105841108222"
        pillColor="darkorchid"
        textColor="white"
      />

      {/* Deskripsi: Komponen berbentuk persegi panjang.
        Digunakan untuk menampilkan Nama Mahasiswa.
      */}
      <RectangleBox
        name="YOGI A.AMMAH"
        boxColor="royalblue"
        nameColor="white"
      />
    </View>
  );
}

// --- StyleSheet untuk Mengorganisir Gaya ---
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 30,
  },
  triangleBase: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangleLabel: {
    position: 'absolute',
    top: '35%',
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  pillContainer: {
    width: 260,
    height: 85,
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  pillText: {
    fontSize: 26,
    fontWeight: "600",
  },
  rectangleContainer: {
    width: 290,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  rectangleText: {
    fontSize: 22,
    fontWeight: "700",
  },
});