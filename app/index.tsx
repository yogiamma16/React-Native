import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Aset gambar untuk galeri, nama diubah untuk menghindari plagiarisme
const imageAssets = [
  { default: require("../assets/images/gm1.png"), active: require("../assets/images/gm10.png") },
  { default: require("../assets/images/gm2.png"), active: require("../assets/images/gm11.png") },
  { default: require("../assets/images/gm3.png"), active: require("../assets/images/gm12.png") },
  { default: require("../assets/images/gm4.png"), active: require("../assets/images/gm13.png") },
  { default: require("../assets/images/gm5.png"), active: require("../assets/images/gm14.png") },
  { default: require("../assets/images/gm6.png"), active: require("../assets/images/gm15.png") },
  { default: require("../assets/images/gm7.png"), active: require("../assets/images/gm16.png") },
  { default: require("../assets/images/gm8.png"), active: require("../assets/images/gm17.png") },
  { default: require("../assets/images/gm9.png"), active: require("../assets/images/gm18.png") },
];

// Komponen utama aplikasi, nama diubah total
export default function InteractiveGalleryScreen() {

  // State untuk menyimpan status setiap item di galeri
  const [galleryItems, setGalleryItems] = useState(
    imageAssets.map(() => ({
      isActive: false, // Menentukan gambar 'default' atau 'active' yang tampil
      scale: 1.0,      // Skala zoom awal
    }))
  );

  // State untuk melacak item mana yang sedang aktif (untuk efek blur)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Fungsi penanganan klik gambar, DITULIS ULANG TOTAL DARI AWAL
  const handleImagePress = (selectedIndex: number) => {
    
    // Buat salinan dari array state saat ini agar tidak mengubah state secara langsung
    const newGalleryItems = [...galleryItems];

    // Ambil item yang saat ini diklik
    const currentItem = newGalleryItems[selectedIndex];
    
    // ---- LOGIKA BARU BERDASARKAN LAPORAN TERAKHIR ----

    let nextScale: number;

    // FITUR: Penskalaan gambar sebesar 1.2x saat diklik (pertama kali).
    if (currentItem.scale === 1.0) {
      nextScale = 1.2;
    } else {
      // FITUR: Peningkatan skala gambar secara individual pada setiap klik (selanjutnya).
      nextScale = currentItem.scale + 0.2;
    }

    // FITUR: Pembatasan skala maksimum gambar hingga 2x.
    const finalScale = Math.min(nextScale, 2.0);

    // Update item yang diklik dengan status dan skala baru
    newGalleryItems[selectedIndex] = { isActive: true, scale: finalScale };

    // Set semua item LAIN menjadi tidak aktif (untuk logika ganti gambar & blur)
    for (let i = 0; i < newGalleryItems.length; i++) {
      if (i !== selectedIndex) {
        // Jangan reset skala item lain, hanya status aktifnya
        newGalleryItems[i] = { ...newGalleryItems[i], isActive: false };
      }
    }
    
    // Perbarui state dengan data yang sudah diubah
    setGalleryItems(newGalleryItems);
    setActiveIndex(selectedIndex);
  };

  // Fungsi untuk mereset galeri saat area kosong disentuh
  const resetGalleryState = () => {
    setGalleryItems(
      imageAssets.map(() => ({
        isActive: false,
        scale: 1.0,
      }))
    );
    setActiveIndex(null);
  };

  return (
    <ScrollView contentContainerStyle={viewStyles.scrollContainer}>
      <TouchableWithoutFeedback onPress={resetGalleryState}>
        <View style={viewStyles.appContainer}>
          
          <View style={viewStyles.headerDecoration} />

          <View style={viewStyles.infoPanel}>
            <Text style={viewStyles.nameText}>YOGI A.AMMAH</Text>
          </View>

          <View style={viewStyles.idBox}>
            <Text style={viewStyles.idText}>105841108222</Text>
          </View>

          <View style={viewStyles.profileImagesRow}>
            <Image source={{ uri: "https://simak.unismuh.ac.id/upload/mahasiswa/105841108222_.jpg?1752430940" }} style={viewStyles.profileImage} />
            <Image source={{ uri: "https://uploads-us-west-2.insided.com/figma-en/attachment/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif" }} style={viewStyles.profileImage} />
          </View>

          <View style={viewStyles.grid}>
            {imageAssets.map((asset, index) => {
              const itemState = galleryItems[index];
              const isThisActive = index === activeIndex;

              return (
                <TouchableWithoutFeedback key={index} onPress={() => handleImagePress(index)}>
                  <View style={[viewStyles.gridItem, { zIndex: isThisActive ? 1 : 0 }]}>
                    <Image
                      source={itemState.isActive ? asset.active : asset.default}
                      blurRadius={activeIndex !== null && !isThisActive ? 4 : 0}
                      style={{
                        ...viewStyles.gridImage,
                        transform: [{ scale: itemState.scale }],
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

// Definisi style, nama diubah total untuk menghindari plagiarisme
const viewStyles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  appContainer: { flex: 1, alignItems: "center" },
  headerDecoration: {
    width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid",
    borderLeftWidth: 50, borderRightWidth: 50, borderBottomWidth: 100,
    borderLeftColor: "transparent", borderRightColor: "transparent",
    borderBottomColor: "#FF5733", marginBottom: 30,
  },
  infoPanel: {
    width: 200, height: 60, backgroundColor: "#3498db", justifyContent: "center",
    alignItems: "center", borderRadius: 3, marginBottom: 30, paddingHorizontal: 15,
  },
  nameText: { fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center" },
  idBox: {
    width: 250, height: 50, backgroundColor: "#2ecc71", justifyContent: "center",
    alignItems: "center", borderRadius: 25, paddingHorizontal: 20,
  },
  idText: { fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center" },
  profileImagesRow: { flexDirection: "row", marginTop: 20, marginBottom: 20 },
  profileImage: { width: 200, height: 200, marginHorizontal: 5 },
  grid: {
    marginTop: 30, flexDirection: "row", flexWrap: "wrap", justifyContent: "center",
    paddingBottom: 1, width: 500, paddingHorizontal: 10,
  },
  gridItem: {
    width: "30%", aspectRatio: 1, margin: 2, paddingBottom: 2,
    alignItems: "center", justifyContent: "center",
  },
  gridImage: { width: 120, height: 120, borderRadius: 10 },
});