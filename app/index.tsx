import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Definisikan daftar aset gambar untuk galeri
// Pastikan path gambarnya sudah sesuai dengan struktur folder proyek Anda.
const dataGambarGaleri = [
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

// Komponen utama untuk menampilkan layar galeri
export default function LayarUtamaGaleri() {

  // State untuk mengelola properti visual dari setiap item di galeri
  const [statusSetiapGambar, setStatusSetiapGambar] = useState(
    dataGambarGaleri.map(() => ({
      isActiveState: false,     // Status apakah gambar sedang aktif/diklik
      currentVisualScale: 1.0,  // Skala zoom gambar saat ini, dimulai dari 1.0 (ukuran normal)
    }))
  );

  // State untuk melacak indeks item galeri yang sedang aktif
  const [indeksGambarAktif, setIndeksGambarAktif] = useState<number | null>(null);

  // Fungsi untuk menangani interaksi klik pada sebuah gambar
  const tanganiAksiKlikGambar = (indeksDipilih: number) => {
    setStatusSetiapGambar(statusSebelumnya => {
      // Buat array state baru berdasarkan state sebelumnya
      return statusSebelumnya.map((itemState, index) => {
        if (index === indeksDipilih) {
          // Jika ini adalah gambar yang diklik:
          // Tingkatkan skala zoom-nya, dengan batas maksimal 2.0
          const skalaBaru = Math.min(itemState.currentVisualScale + 0.4, 2.0);
          return { ...itemState, isActiveState: true, currentVisualScale: skalaBaru };
        } else {
          // Untuk semua gambar lainnya:
          // Cukup atur statusnya menjadi tidak aktif, JANGAN UBAH SKALANYA.
          return { ...itemState, isActiveState: false };
        }
      });
    });
    // Simpan indeks gambar yang baru saja diaktifkan
    setIndeksGambarAktif(indeksDipilih);
  };

  // Fungsi untuk mereset semua interaksi, mengembalikan semua gambar ke kondisi awal
  const resetSemuaGambar = () => {
    setStatusSetiapGambar(
      dataGambarGaleri.map(() => ({
        isActiveState: false,
        currentVisualScale: 1.0, // Kembalikan skala ke 1.0
      }))
    );
    setIndeksGambarAktif(null); // Hapus info gambar aktif
  };

  return (
    <ScrollView contentContainerStyle={gaya.kontenScroll}>
      <TouchableWithoutFeedback onPress={resetSemuaGambar}>
        <View style={gaya.wadahAplikasi}>
          
          {/* Elemen hiasan di bagian atas */}
          <View style={gaya.hiasanAtas} />

          {/* Panel untuk menampilkan nama pengguna */}
          <View style={gaya.panelInfoPengguna}>
            {/* Ganti dengan nama lengkap Anda */}
            <Text style={gaya.teksNama}>YOGI A.AMMAH</Text>
          </View>

          {/* Kotak untuk menampilkan ID/NIM */}
          <View style={gaya.kotakIdentitas}>
            {/* Ganti dengan NIM/ID Anda */}
            <Text style={gaya.teksId}>105841108222</Text>
          </View>

          {/* Baris untuk menampilkan gambar profil */}
          <View style={gaya.barisGambarProfil}>
            {/* Ganti URL ini dengan link gambar profil Anda */}
            <Image
              source={{ uri: "https://simak.unismuh.ac.id/upload/mahasiswa/105841108222_.jpg?1752430940" }}
              style={gaya.gambarProfil}
            />
            {/* Ganti URL ini dengan link gambar lain jika ada */}
            <Image
              source={{ uri: "https://uploads-us-west-2.insided.com/figma-en/attachment/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif" }}
              style={gaya.gambarProfil}
            />
          </View>

          {/* Area untuk menampilkan grid galeri gambar interaktif */}
          <View style={gaya.areaGrid}>
            {dataGambarGaleri.map((itemData, indeks) => {
              const statusItemIni = statusSetiapGambar[indeks];
              const apakahItemIniAktif = indeks === indeksGambarAktif;

              return (
                <TouchableWithoutFeedback
                  key={indeks}
                  onPress={() => tanganiAksiKlikGambar(indeks)}
                >
                  <View style={[gaya.pembungkusItemGrid, { zIndex: apakahItemIniAktif ? 1 : 0 }]}>
                    <Image
                      source={statusItemIni.isActiveState ? itemData.activeIgm : itemData.defaultIgm}
                      blurRadius={indeksGambarAktif !== null && !apakahItemIniAktif ? 4 : 0}
                      style={{
                        ...gaya.elemenGambarGrid,
                        transform: [{ scale: statusItemIni.currentVisualScale }],
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

// Kumpulan definisi style untuk komponen-komponen di atas
const gaya = StyleSheet.create({
  kontenScroll: {
    flexGrow: 1,
  },
  wadahAplikasi: {
    flex: 1,
    alignItems: "center",
  },
  hiasanAtas: {
    width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid",
    borderLeftWidth: 50, borderRightWidth: 50, borderBottomWidth: 100,
    borderLeftColor: "transparent", borderRightColor: "transparent",
    borderBottomColor: "#FF5733", marginBottom: 30,
  },
  panelInfoPengguna: {
    width: 200, height: 60, backgroundColor: "#3498db", justifyContent: "center",
    alignItems: "center", borderRadius: 3, marginBottom: 30, paddingHorizontal: 15,
  },
  teksNama: {
    fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center",
  },
  kotakIdentitas: {
    width: 250, height: 50, backgroundColor: "#2ecc71", justifyContent: "center",
    alignItems: "center", borderRadius: 25, paddingHorizontal: 20,
  },
  teksId: {
    fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center",
  },
  barisGambarProfil: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  gambarProfil: {
    width: 200,
    height: 200,
    marginHorizontal: 5,
  },
  areaGrid: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 1,
    width: 500,
    paddingHorizontal: 10,
  },
  pembungkusItemGrid: {
    width: "30%", 
    aspectRatio: 1, 
    margin: 2,
    paddingBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  elemenGambarGrid: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});