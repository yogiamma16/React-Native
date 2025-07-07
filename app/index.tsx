import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Latar belakang abu-abu muda
      }}
    >
      {/* Bentuk Segitiga */}
      <View
        style={{
          width: 0,
          height: 0,
          backgroundColor: "transparent",
          borderStyle: "solid",
          borderLeftWidth: 50,
          borderRightWidth: 50,
          borderBottomWidth: 100,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "#FF5733", // Warna oranye
          marginBottom: 30, // Jarak ke bawah
        }}
      />

      {/* Bentuk Persegi Panjang dengan Teks Nama */}
      <View
        style={{
          width: 200,
          height: 60,
          backgroundColor: "#3498db", // Warna biru
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8, // Sudut sedikit membulat
          marginBottom: 30, // Jarak ke bawah
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          {/* NAMA LENGKAP */}
          YOGI A.AMMAH
        </Text>
      </View>

      {/* Bentuk Pil (Capsule) dengan Teks Stambuk/NIM */}
      <View
        style={{
          width: 250,
          height: 50,
          backgroundColor: "#2ecc71", // Warna hijau
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50 / 2, // Ujung membulat penuh
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          {/* NIM/STAMBUK */}
          105841108222
        </Text>
      </View>
    </View>
  );
}