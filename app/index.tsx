import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, } from "react-native";

const galleryImageDefinitions = [
  { defaultAsset: require("../assets/images/gm1.png"), alternateAsset: require("../assets/images/gm10.png") },
  { defaultAsset: require("../assets/images/gm2.png"), alternateAsset: require("../assets/images/gm11.png") },
  { defaultAsset: require("../assets/images/gm3.png"), alternateAsset: require("../assets/images/gm12.png") },
  { defaultAsset: require("../assets/images/gm4.png"), alternateAsset: require("../assets/images/gm13.png") },
  { defaultAsset: require("../assets/images/gm5.png"), alternateAsset: require("../assets/images/gm14.png") },
  { defaultAsset: require("../assets/images/gm6.png"), alternateAsset: require("../assets/images/gm15.png") },
  { defaultAsset: require("../assets/images/gm7.png"), alternateAsset: require("../assets/images/gm16.png") },
  { defaultAsset: require("../assets/images/gm8.png"), alternateAsset: require("../assets/images/gm17.png") },
  { defaultAsset: require("../assets/images/gm9.png"), alternateAsset: require("../assets/images/gm18.png") },
];

export default function MainAppDisplay() {
  const initialInteractiveProps = galleryImageDefinitions.map(() => ({
    displayAlternate: false,
    currentVisualScale: 1.2,
  }));

  const [interactiveImageProps, setInteractiveImageProps] = useState(initialInteractiveProps);
  const [currentlySelectedImageIdx, setCurrentlySelectedImageIdx] = useState<number | null>(null);

  const handleImageGridItemTap = (tappedIndex: number) => {
    setInteractiveImageProps((previousProps) => {
      return previousProps.map((itemProp, idx) => {
        if (idx === tappedIndex) {
          const newScaleVal = itemProp.currentVisualScale + 0.4;
          return {
            displayAlternate: true,
            currentVisualScale: Math.min(newScaleVal, 2), 
          };
        } else {
          return {
            displayAlternate: false,
            currentVisualScale: 1.2, 
          };
        }
      });
    });
    setCurrentlySelectedImageIdx(tappedIndex);
  };

  const resetAllInteractions = () => {
    setInteractiveImageProps(initialInteractiveProps);
    setCurrentlySelectedImageIdx(null);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableWithoutFeedback onPress={resetAllInteractions}>
        <View style={visualStyles.mainScreenContainer}>
          
          <View style={visualStyles.decorativeTriangleElement} />

          <View style={visualStyles.headerSection}>
            <Text style={visualStyles.headerTextContent}>YOGI A.AMMAH</Text>
          </View>

          <View style={visualStyles.idInformationBox}>
            <Text style={visualStyles.idTextContent}>105841108222</Text>
          </View>

          <View style={visualStyles.profileImagesRow}>
            <Image
              source={{
                uri: "https://uploads-us-west-2.insided.com/figma-en/attachment/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif",
              }}
              style={visualStyles.profilePictureStyle}
            />
            <Image
              source={{
                uri: "https://simak.unismuh.ac.id/upload/mahasiswa/105841108222_.jpg?1752430940",
              }}
              style={visualStyles.profilePictureStyle}
            />
          </View>

          <View style={visualStyles.galleryGridContainer}>
            {galleryImageDefinitions.map((imageDef, idx) => {
              const isThisItemSelected = idx === currentlySelectedImageIdx;
              return (
                <TouchableWithoutFeedback
                  key={idx}
                  onPress={(event) => { 
                    event.stopPropagation();
                    handleImageGridItemTap(idx);
                  }}
                >
                  <View style={[visualStyles.gridImageWrapper, { zIndex: isThisItemSelected ? 1 : 0 }]}>
                    <Image
                      source={interactiveImageProps[idx].displayAlternate ? imageDef.alternateAsset : imageDef.defaultAsset}
                      blurRadius={currentlySelectedImageIdx !== null && !isThisItemSelected ? 3 : 0}
                      style={{
                        ...visualStyles.gridImageStyle,
                        transform: [{ scale: interactiveImageProps[idx].currentVisualScale }],
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

const visualStyles = StyleSheet.create({
  mainScreenContainer: {
    flex: 1,
    alignItems: "center",
  },
  decorativeTriangleElement: {
    width: 1, height: 1, backgroundColor: "transparent", borderStyle: "solid",
    borderLeftWidth: 51, borderRightWidth: 51, borderBottomWidth: 101,
    borderLeftColor: "transparent", borderRightColor: "transparent",
    borderBottomColor: "#5cb5e9", marginBottom: 31,
  },
  headerSection: {
    width: 201, height: 61, backgroundColor: "#a5bfc0", justifyContent: "center",
    alignItems: "center", borderRadius: 2, marginBottom: 31, paddingHorizontal: 14,
  },
  headerTextContent: {
    fontSize: 21, 
    fontWeight: "bold", 
    color: "white", 
    textAlign: "center",
  },
  idInformationBox: {
    width: 251, 
    height: 51, 
    backgroundColor: "#73dba0", 
    justifyContent: "center",
    alignItems: "center", 
    borderRadius: 21, 
    paddingHorizontal: 21,
  },
  idTextContent: {
    fontSize: 21, fontWeight: "bold", color: "white", textAlign: "center" 
  },
  profileImagesRow: {
    flexDirection: "row",
    marginTop: 21,
    marginBottom: 21,
  },
  profilePictureStyle: {
    width: 201,
    height: 201,
    marginHorizontal: 4,
  },
  galleryGridContainer: {
    marginTop: 29,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 2,
    width: 501,
    paddingHorizontal: 10,
  },
  gridImageWrapper: {
    width: "29%", 
    aspectRatio: 1, 
    margin: 3,
    paddingBottom: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  gridImageStyle: {
    width: 119,
    height: 119,
    borderRadius: 10,
  },
});