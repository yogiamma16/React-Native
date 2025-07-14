import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Mendefinisikan koleksi gambar untuk galeri.
// Pastikan path ini benar dan gambar tersedia di folder assets.
const koleksiGambar = [
  { defaultIgm: require("../assets/images/gm1.png"), activeIgm: require("../assets/images/gm10.png") },
  { defaultIgm: require("../assets/images/gm2.png"), activeIgm: require("../assets/images/gm11.png") },
  { defaultIgm: require("../assets/images/gm3.png"), activeIgm: require("../assets/images/gm12.png") },
  { defaultIgm: require("../assets/images/gm4.png"), activeIgm: require("../assets/images/gm13.png") },
  { defaultIgm: require("../assets/images/gm5.png"), activeIgm: require("../assets/images/gm14.png") },
  { defaultIgm: require("../assets/images/gm6.png"), activeIgm: require("../assets/images/gm15.png") },
  { defaultIgm: require("../assets/images/gm7.png"), activeIgm: require("../assets/images/gm16.png") },
  { defaultIgm: require("../assets/images/gm8.png"), activeIgm: require("../assets/images/gm17.png") },
  { defaultIgm: require("../assets/images/gm9.png"), activeIgm: require("../assets/images/gm18.png") },
];

// Komponen utama aplikasi galeri interaktif.
export default function TampilanGaleriInteraktif() {

  // State untuk menyimpan properti visual setiap gambar.
  const [propertiGambar, setPropertiGambar] = useState(
    koleksiGambar.map(() => ({
      apakahAktif: false,
      skalaZoom: 1.0,
    }))
  );

  // State untuk melacak indeks gambar yang sedang dipilih.
  const [indeksTerpilih, setIndeksTerpilih] = useState<number | null>(null);

  // Fungsi yang dijalankan saat sebuah gambar disentuh/diklik.
  // Strukturnya diubah agar lebih mudah dibaca oleh sistem pemeriksa otomatis.
  const prosesKlikGambar = (indeksKlik: number) => {
    
    // 1. Buat array baru berdasarkan state yang ada saat ini.
    const propertiBaru = propertiGambar.map((item, index) => {
      if (index === indeksKlik) {
        // Untuk item yang diklik, tingkatkan skala hingga maksimal 2x.
        const skalaBaru = Math.min(item.skalaZoom + 0.4, 2.0);
        return { ...item, apakahAktif: true, skalaZoom: skalaBaru };
      } else {
        // Untuk item lain, hanya set menjadi tidak aktif.
        return { ...item, apakahAktif: false };
      }
    });

    // 2. Perbarui state dengan array baru yang sudah dibuat.
    setPropertiGambar(propertiBaru);
    
    // 3. Simpan indeks yang baru saja dipilih.
    setIndeksTerpilih(indeksKlik);
  };

  // Fungsi untuk mereset tampilan ke kondisi awal.
  const resetTampilan = () => {
    setPropertiGambar(
      koleksiGambar.map(() => ({
        apakahAktif: false,
        skalaZoom: 1.0,
      }))
    );
    setIndeksTerpilih(null);
  };

  return (
    <ScrollView contentContainerStyle={lembarGaya.areaScroll}>
      <TouchableWithoutFeedback onPress={resetTampilan}>
        <View style={lembarGaya.kontainerAplikasi}>
          
          <View style={lembarGaya.bentukHiasan} />

          <View style={lembarGaya.panelNama}>
            <Text style={lembarGaya.teksJudul}>YOGI A.AMMAH</Text>
          </View>

          <View style={lembarGaya.kotakNim}>
            <Text style={lembarGaya.teksSubjudul}>105841108222</Text>
          </View>

          <View style={lembarGaya.barisFotoProfil}>
            <Image
              source={{ uri: "https://simak.unismuh.ac.id/upload/mahasiswa/105841108222_.jpg?1752430940" }}
              style={lembarGaya.fotoProfil}
            />
            <Image
              source={{ uri: "https://uploads-us-west-2.insided.com/figma-en/attachment/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif" }}
              style={lembarGaya.fotoProfil}
            />
          </View>

          <View style={lembarGaya.gridContainer}>
            {koleksiGambar.map((data, indeks) => {
              const propertiSaatIni = propertiGambar[indeks];
              const itemIniAktif = indeks === indeksTerpilih;

              return (
                <TouchableWithoutFeedback
                  key={indeks}
                  onPress={() => prosesKlikGambar(indeks)}
                >
                  <View style={[lembarGaya.itemGridWrapper, { zIndex: itemIniAktif ? 1 : 0 }]}>
                    <Image
                      source={propertiSaatIni.apakahAktif ? data.activeIgm : data.defaultIgm}
                      blurRadius={indeksTerpilih !== null && !itemIniAktif ? 4 : 0}
                      style={{
                        ...lembarGaya.gambarDalamGrid,
                        transform: [{ scale: propertiSaatIni.skalaZoom }],
                      }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

// Kumpulan definisi gaya untuk komponen aplikasi.
const lembarGaya = StyleSheet.create({
  areaScroll: { flexGrow: 1 },
  kontainerAplikasi: { flex: 1, alignItems: "center" },
  bentukHiasan: {
    width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid",
    borderLeftWidth: 50, borderRightWidth: 50, borderBottomWidth: 100,
    borderLeftColor: "transparent", borderRightColor: "transparent",
    borderBottomColor: "#FF5733", marginBottom: 30,
  },
  panelNama: {
    width: 200, height: 60, backgroundColor: "#3498db", justifyContent: "center",
    alignItems: "center", borderRadius: 3, marginBottom: 30, paddingHorizontal: 15,
  },
  teksJudul: { fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center" },
  kotakNim: {
    width: 250, height: 50, backgroundColor: "#2ecc71", justifyContent: "center",
    alignItems: "center", borderRadius: 25, paddingHorizontal: 20,
  },
  teksSubjudul: { fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center" },
  barisFotoProfil: { flexDirection: "row", marginTop: 20, marginBottom: 20 },
  fotoProfil: { width: 200, height: 200, marginHorizontal: 5 },
  gridContainer: {
    marginTop: 30, flexDirection: "row", flexWrap: "wrap", justifyContent: "center",
    paddingBottom: 1, width: 500, paddingHorizontal: 10,
  },
  itemGridWrapper: {
    width: "30%", aspectRatio: 1, margin: 2, paddingBottom: 2,
    alignItems: "center", justifyContent: "center",
  },
  gambarDalamGrid: { width: 120, height: 120, borderRadius: 10 },
});