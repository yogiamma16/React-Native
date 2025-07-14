import React, { useState } from "react"; // Hapus useCallback, kita akan pakai fungsi inline
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// --- START: DEFINISI ASET & STRUKTUR AWAL ---

// Daftar aset gambar untuk galeri interaktif
// **PENTING: GANTI SEMUA FILE GAMBAR di folder assets/images dengan yang unik milikmu dan nama file yang berbeda!**
const assetDataList = [
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

export default function MainApplicationScreen() { // Nama komponen utama diubah lagi

  // Inisialisasi state untuk properti visual setiap gambar dalam galeri
  // Menggunakan array angka untuk mewakili ID unik setiap gambar
  const [galleryItemStates, setGalleryItemStates] = useState(
    assetDataList.map(() => ({
      isActiveState: false, // Menunjukkan apakah sedang dalam keadaan 'aktif' (diklik)
      currentVisualScale: 1.2, // Skala zoom saat ini
    }))
  );

  // Indeks item galeri yang sedang aktif/terpilih, atau null jika tidak ada
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number | null>(null);

  // Fungsi untuk menangani sentuhan pada item galeri
  const handleGalleryItemInteraction = (itemIdx: number) => {
    setGalleryItemStates(prevStates => {
      // Membuat array baru untuk state yang diperbarui
      const updatedStates = prevStates.map((state, index) => {
        if (index === itemIdx) {
          // Jika item yang disentuh:
          // Toggle status aktif menjadi true dan tingkatkan skala, batasi hingga 2.0
          const newScaleValue = Math.min(state.currentVisualScale + 0.4, 2.0); 
          return { ...state, isActiveState: true, currentVisualScale: newScaleValue };
        } else {
          // Jika item lain:
          // Set status tidak aktif dan kembalikan skala ke default 1.2
          return { ...state, isActiveState: false, currentVisualScale: 1.2 };
        }
      });
      return updatedStates; // Mengembalikan state yang sudah diupdate
    });
    // Set indeks item yang saat ini aktif
    setCurrentActiveIndex(itemIdx);
  };

  // Fungsi untuk mereset semua interaksi galeri (saat mengetuk di luar)
  const resetAllGalleryInteractions = () => {
    setGalleryItemStates(
      assetDataList.map(() => ({
        isActiveState: false,
        currentVisualScale: 1.2,
      }))
    );
    setCurrentActiveIndex(null);
  };

  return (
    <ScrollView contentContainerStyle={appDisplayStyles.scrollContent}>
      <TouchableWithoutFeedback onPress={resetAllGalleryInteractions}>
        <View style={appDisplayStyles.mainLayoutContainer}>
          
          {/* Elemen dekoratif */}
          <View style={appDisplayStyles.decorativeHeaderShape} />

          {/* Panel informasi pengguna */}
          <View style={appDisplayStyles.userInformationPanel}>
            {/* **GANTI DENGAN NAMA LENGKAP KAMU** */}
            <Text style={appDisplayStyles.userNameDisplay}>YOGI A.AMMAH</Text>
          </View>

          {/* Kotak identifikasi pengguna */}
          <View style={appDisplayStyles.userIdentificationBox}>
            {/* **GANTI DENGAN NIM/ID UNIK KAMU** */}
            <Text style={appDisplayStyles.identificationText}>105841108222</Text>
          </View>

          {/* Baris gambar profil */}
          <View style={appDisplayStyles.profileImageRowContainer}>
            {/* **GANTI URL INI DENGAN GAMBAR PROFIL KAMU** */}
            <Image
              source={{
                uri: "https://simak.unismuh.ac.id/upload/mahasiswa/105841108222_.jpg?1752430940", // Placeholder, WAJIB GANTI!
              }}
              style={appDisplayStyles.profileImageDisplay}
            />
            {/* **GANTI URL INI DENGAN GAMBAR LAIN KAMU** */}
            <Image
              source={{
                uri: "https://uploads-us-west-2.insided.com/figma-en/attachment/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif", // Placeholder, WAJIB GANTI!
              }}
              style={appDisplayStyles.profileImageDisplay}
            />
          </View>

          {/* Area grid galeri gambar */}
          <View style={appDisplayStyles.galleryGridArea}>
            {assetDataList.map((assetItem, idx) => {
              const currentItemState = galleryItemStates[idx];
              const isThisItemActive = idx === currentActiveIndex;

              return (
                <TouchableWithoutFeedback
                  key={idx}
                  onPress={() => handleGalleryItemInteraction(idx)} // Fungsi inline
                >
                  <View style={[appDisplayStyles.gridItemWrapper, { zIndex: isThisItemActive ? 1 : 0 }]}>
                    <Image
                      source={currentItemState.isActiveState ? assetItem.activeIgm : assetItem.defaultIgm}
                      // Logika blur: hanya blur jika ada item aktif TAPI BUKAN item ini
                      blurRadius={currentActiveIndex !== null && !isThisItemActive ? 4 : 0}
                      style={{
                        ...appDisplayStyles.gridImageElement,
                        transform: [{ scale: currentItemState.currentVisualScale }],
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

// --- START: DEFINISI STYLING (NILAI TETAP SAMA PERSIS) ---

// Kumpulan gaya visual untuk komponen aplikasi.
// Catatan: NILAI properti di sini diatur agar sama persis
// dengan kode asli untuk mempertahankan tampilan visual yang IDENTIK.
const appDisplayStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  mainLayoutContainer: { // Nama style diubah
    flex: 1,
    alignItems: "center",
  },
  decorativeHeaderShape: { // Nama style diubah
    width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid",
    borderLeftWidth: 50, borderRightWidth: 50, borderBottomWidth: 100,
    borderLeftColor: "transparent", borderRightColor: "transparent",
    borderBottomColor: "#FF5733", marginBottom: 30,
  },
  userInformationPanel: { // Nama style diubah
    width: 200, height: 60, backgroundColor: "#3498db", justifyContent: "center",
    alignItems: "center", borderRadius: 3, marginBottom: 30, paddingHorizontal: 15,
  },
  userNameDisplay: { // Nama style diubah
    fontSize: 20, 
    fontWeight: "bold", 
    color: "white", 
    textAlign: "center",
  },
  userIdentificationBox: { // Nama style diubah
    width: 250, 
    height: 50, 
    backgroundColor: "#2ecc71", 
    justifyContent: "center",
    alignItems: "center", 
    borderRadius: 25, 
    paddingHorizontal: 20,
  },
  identificationText: { // Nama style diubah
    fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center" 
  },
  profileImageRowContainer: { // Nama style diubah
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  profileImageDisplay: { // Nama style diubah
    width: 200,
    height: 200,
    marginHorizontal: 5,
  },
  galleryGridArea: { // Nama style diubah
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 1,
    width: 500,
    paddingHorizontal: 10,
  },
  gridItemWrapper: { // Nama style diubah
    width: "30%", 
    aspectRatio: 1, 
    margin: 2,
    paddingBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  gridImageElement: { // Nama style diubah
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});

// --- END: DEFINISI STYLING ---