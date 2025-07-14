import React, { useCallback, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";


type VisualAssetEntry = {
  initialAsset: any;
  interactiveAsset: any;
};

const visualAssetCollection: VisualAssetEntry[] = [
  { initialAsset: require("../assets/images/gm1.png"), interactiveAsset: require("../assets/images/gm10.png") },
  { initialAsset: require("../assets/images/gm2.png"), interactiveAsset: require("../assets/images/gm11.png") },
  { initialAsset: require("../assets/images/gm3.png"), interactiveAsset: require("../assets/images/gm12.png") },
  { initialAsset: require("../assets/images/gm4.png"), interactiveAsset: require("../assets/images/gm13.png") },
  { initialAsset: require("../assets/images/gm5.png"), interactiveAsset: require("../assets/images/gm14.png") },
  { initialAsset: require("../assets/images/gm6.png"), interactiveAsset: require("../assets/images/gm15.png") },
  { initialAsset: require("../assets/images/gm7.png"), interactiveAsset: require("../assets/images/gm16.png") },
  { initialAsset: require("../assets/images/gm8.png"), interactiveAsset: require("../assets/images/gm17.png") },
  { initialAsset: require("../assets/images/gm9.png"), interactiveAsset: require("../assets/images/gm18.png") },
];

// --- END: DEFINISI ASET & TIPE ---


// --- START: KOMPONEN UTAMA ---

export default function InteractiveVisualApp() { 

 
  const initialDisplayProperties = useMemo(() => {
    return visualAssetCollection.map((_, index) => ({
      showInteractiveVersion: false, 
      currentZoomLevel: 1.2,       
      uniqueId: `asset-${index}`, 
    }));
  }, []); 

  
  const [assetDisplayStates, setAssetDisplayStates] = useState(initialDisplayProperties);
  const [focusedAssetIndex, setFocusedAssetIndex] = useState<number | null>(null);


  const handleVisualAssetInteraction = useCallback((touchedIndex: number) => { 
    setAssetDisplayStates(prevStates => {
      const newStates = [...prevStates]; 

      newStates.forEach((item, idx) => {
        if (idx === touchedIndex) {
          const nextScale = item.currentZoomLevel + 0.4;
          item.currentZoomLevel = Math.min(nextScale, 2.0); 
          item.showInteractiveVersion = true;
        } else {
          item.currentZoomLevel = 1.2;
          item.showInteractiveVersion = false;
        }
      });
      return newStates; 
    });
    setFocusedAssetIndex(touchedIndex); 
  }, []); 

  const resetAllVisualInteractions = useCallback(() => { 
    setAssetDisplayStates(initialDisplayProperties); 
    setFocusedAssetIndex(null); 
  }, [initialDisplayProperties]); 

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableWithoutFeedback onPress={resetAllVisualInteractions}>
        <View style={visualComponentStyles.mainAppLayout}>
          
          {/* Elemen*/}
          <View style={visualComponentStyles.topDecorativeSection} />

          {/* Bagian header */}
          <View style={visualComponentStyles.userInfoPanel}>
            {/* NAMA*/}
            <Text style={visualComponentStyles.userNameDisplay}>YOGI A.AMMAH</Text>
          </View>

          {/* NIM */}
          <View style={visualComponentStyles.userIdentifierBox}>
            
            <Text style={visualComponentStyles.identifierText}>105841108222</Text>
          </View>

          {/* gambar profil */}
          <View style={visualComponentStyles.profileGraphicsRow}>
            <Image
              source={{
                uri: "https://simak.unismuh.ac.id/upload/mahasiswa/105841108222_.jpg?1752430940",
              }}
              style={visualComponentStyles.profileGraphicUnit}
            />
            <Image
              source={{
                uri: "https://uploads-us-west-2.insided.com/figma-en/attachment/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif",
              }}
              style={visualComponentStyles.profileGraphicUnit}
            />
          </View>

          <View style={visualComponentStyles.interactiveGridArea}>
            {visualAssetCollection.map((assetDefinition, assetIndex) => {
              const isCurrentAssetFocused = assetIndex === focusedAssetIndex;
              const currentAssetProps = assetDisplayStates[assetIndex];

              return (
                <TouchableWithoutFeedback
                  key={assetIndex}
                  onPress={(eventOrigin) => { 
                    eventOrigin.stopPropagation();
                    handleVisualAssetInteraction(assetIndex);
                  }}
                >
                  <View style={[visualComponentStyles.gridDisplayElement, { zIndex: isCurrentAssetFocused ? 1 : 0 }]}>
                    <Image
                      source={currentAssetProps.showInteractiveVersion ? assetDefinition.interactiveAsset : assetDefinition.initialAsset}
                      blurRadius={focusedAssetIndex !== null && !isCurrentAssetFocused ? 4 : 0}
                      style={{
                        ...visualComponentStyles.gridImageContent,
                        transform: [{ scale: currentAssetProps.currentZoomLevel }],
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


const visualComponentStyles = StyleSheet.create({
  mainAppLayout: { 
    flex: 1,
    alignItems: "center",
  },
  topDecorativeSection: { 
    width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid",
    borderLeftWidth: 50, borderRightWidth: 50, borderBottomWidth: 100,
    borderLeftColor: "transparent", borderRightColor: "transparent",
    borderBottomColor: "#FF5733", marginBottom: 30,
  },
  userInfoPanel: {
    width: 200, height: 60, backgroundColor: "#3498db", justifyContent: "center",
    alignItems: "center", borderRadius: 3, marginBottom: 30, paddingHorizontal: 15,
  },
  userNameDisplay: {
    fontSize: 20, 
    fontWeight: "bold", 
    color: "white", 
    textAlign: "center",
  },
  userIdentifierBox: {
    width: 250, 
    height: 50, 
    backgroundColor: "#2ecc71", 
    justifyContent: "center",
    alignItems: "center", 
    borderRadius: 25, 
    paddingHorizontal: 20,
  },
  identifierText: { 
    fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center" 
  },
  profileGraphicsRow: { 
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  profileGraphicUnit: { 
    width: 200,
    height: 200,
    marginHorizontal: 5,
  },
  interactiveGridArea: { 
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 1,
    width: 500,
    paddingHorizontal: 10,
  },
  gridDisplayElement: { 
    width: "30%", 
    aspectRatio: 1, 
    margin: 2,
    paddingBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  gridImageContent: { 
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});
