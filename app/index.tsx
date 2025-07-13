import React, { useCallback, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface CelestialObjectState {
  isScanned: boolean;
  zoomFactor: number;
}

interface CelestialData {
  mapImage: ImageSourcePropType;
  revealedImage: ImageSourcePropType;
}

const galaxyMap: CelestialData[] = [
  { mapImage: require("../assets/images/gm1.png"), revealedImage: require("../assets/images/gm10.png") },
  { mapImage: require("../assets/images/gm2.png"), revealedImage: require("../assets/images/gm11.png") },
  { mapImage: require("../assets/images/gm3.png"), revealedImage: require("../assets/images/gm12.png") },
  { mapImage: require("../assets/images/gm4.png"), revealedImage: require("../assets/images/gm13.png") },
  { mapImage: require("../assets/images/gm5.png"), revealedImage: require("../assets/images/gm14.png") },
  { mapImage: require("../assets/images/gm6.png"), revealedImage: require("../assets/images/gm15.png") },
  { mapImage: require("../assets/images/gm7.png"), revealedImage: require("../assets/images/gm16.png") },
  { mapImage: require("../assets/images/gm8.png"), revealedImage: require("../assets/images/gm17.png") },
  { mapImage: require("../assets/images/gm9.png"), revealedImage: require("../assets/images/gm18.png") },
];


const generateInitialSystemState = (): CelestialObjectState[] =>
  galaxyMap.map(() => ({
    isScanned: false,
    zoomFactor: 1.2,
  }));

const ProfileInfoBlock = () => (
  <>
    <View style={sty.nm} />
    <View style={sty.nv}>
      <Text style={sty.nameplateText}>YOGI A.AMMAH</Text>
    </View>
    <View style={sty.pv}>
      <Text style={sty.pt}>105841108222</Text>
    </View>
    <View style={sty.ps}>
      <Image
        source={{ uri: "https://simak.unismuh.ac.id/upload/mahasiswa/105841108222_.jpg?1752430940" }}
        style={sty.ft}
      />
      <Image
        source={{ uri: "https://uploads-us-west-2.insided.com/figma-en/attachment/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif" }}
        style={sty.ft}
      />
    </View>
  </>
);

export default function MainScreen() {
  const [focusedObjectIndex, setFocusedObjectIndex] = useState<number | null>(null);
  const [systemState, setSystemState] = useState<CelestialObjectState[]>(generateInitialSystemState());

  const handleObjectSelection = useCallback((selectedIndex: number) => {
    setSystemState(currentState =>
      currentState.map((object, index) => {
        if (index === selectedIndex) {
          const newZoom = (object.zoomFactor || 1.2) + 0.4;
          return { 
            isScanned: !object.isScanned, 
            zoomFactor: newZoom > 2 ? 2 : newZoom 
          };
        }
        return { isScanned: false, zoomFactor: 1.2 };
      })
    );
    setFocusedObjectIndex(selectedIndex);
  }, []);

  const clearFocus = useCallback(() => {
    setFocusedObjectIndex(null);
    setSystemState(generateInitialSystemState());
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableWithoutFeedback onPress={clearFocus}>
        <View style={sty.screenContainer}>
          <ProfileInfoBlock />
          
          <View style={sty.artworkGridContainer}>
            {galaxyMap.map((celestial, index) => {
              const isFocused = index === focusedObjectIndex;
              const isAnotherObjectFocused = focusedObjectIndex !== null && !isFocused;
              const objectState = systemState[index];

              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={(e) => {
                    e.stopPropagation(); 
                    handleObjectSelection(index);
                  }}
                >
                  <View style={[sty.artworkWrapper, { zIndex: isFocused ? 1 : 0 }]}>
                    <Image
                      source={objectState.isScanned ? celestial.revealedImage : celestial.mapImage}
                      blurRadius={isAnotherObjectFocused ? 1 : 0}
                      style={[
                        sty.artworkImage,
                        { transform: [{ scale: objectState.zoomFactor }] },
                      ]}
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
const sty = StyleSheet.create({
  screenContainer: { flex: 1, alignItems: "center" },
  nm: {
    width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid",
    borderLeftWidth: 50, borderRightWidth: 50, borderBottomWidth: 100,
    borderLeftColor: "transparent", borderRightColor: "transparent",
    borderBottomColor: "#FF5733", marginBottom: 30,
  },
  nv: {
    width: 200, height: 60, backgroundColor: "#3498db", justifyContent: "center",
    alignItems: "center", borderRadius: 3, marginBottom: 30, paddingHorizontal: 15,
  },
  nameplateText: { fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center" },
  pv: {
    width: 250, height: 50, backgroundColor: "#2ecc71", justifyContent: "center",
    alignItems: "center", borderRadius: 25, paddingHorizontal: 20,
  },
  pt: { fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center" },
  ps: { flexDirection: "row", marginTop: 20, marginBottom: 20 },
  ft: { width: 200, height: 200, marginHorizontal: 5, borderRadius: 15, },
  artworkGridContainer: {
    marginTop: 30, flexDirection: "row", flexWrap: "wrap",
    justifyContent: "center", paddingBottom: 1, width: 500, paddingHorizontal: 10,
  },
  artworkWrapper: {
    width: "30%", aspectRatio: 1, margin: 2, paddingBottom: 2,
    alignItems: "center", justifyContent: "center",
  },
  artworkImage: { width: 120, height: 120, borderRadius: 10 },
});