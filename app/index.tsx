// IconGallery.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";


const daftarIkon = [
  { elemen: <Ionicons name="planet" size={38} color="#3A86FF" />, teks: "Planet" },
  { elemen: <FontAwesome name="car" size={38} color="#FFBE0B" />, teks: "Car" },
  { elemen: <MaterialIcons name="flight" size={38} color="#FB5607" />, teks: "Flight" },
  { elemen: <AntDesign name="apple1" size={38} color="#FF006E" />, teks: "Apple" },
  { elemen: <Feather name="music" size={38} color="#8338EC" />, teks: "Music" },
  { elemen: <Entypo name="game-controller" size={38} color="#2EC4B6" />, teks: "Game" },
  { elemen: <MaterialCommunityIcons name="ghost" size={38} color="#8D99AE" />, teks: "Ghost" },
  { elemen: <Foundation name="mountains" size={38} color="#E07A5F" />, teks: "Mountain" },
  { elemen: <Octicons name="star" size={38} color="#FFD166" />, teks: "Star" },
  { elemen: <SimpleLineIcons name="fire" size={38} color="#EF476F" />, teks: "Fire" },
];

const GaleriIkon: React.FC = () => {
  return (
    <View style={gaya.layar}>
      <Text style={gaya.judul}>YOGI A.AMMAH</Text>
      <Text style={gaya.judul}>10 Ikon</Text>
      <View style={gaya.tataLetak}>
        {daftarIkon.map((data, i) => (
          <View style={gaya.kotakIkon} key={i}>
            {data.elemen}
            <Text style={gaya.tulisan}>{data.teks}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const gaya = StyleSheet.create({
  layar: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 36,
  },
  judul: {
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 24,
    color: "#475569",
  },
  tataLetak: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "93%",
  },
  kotakIkon: {
    alignItems: "center",
    width: "20%",
    marginVertical: 16,
  },
  tulisan: {
    marginTop: 6,
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
  },
});

export default GaleriIkon;
