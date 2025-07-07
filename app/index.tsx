import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
      }}
    >
      {/* 1. Segitiga*/}
      <View
        style={{
          width: 0,
          height: 0,
          backgroundColor: "transparent",
          borderStyle: "solid",
          borderLeftWidth: 60,
          borderRightWidth: 60,
          borderBottomWidth: 120,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "green",
          marginBottom: 20,
        }}
      ></View>

      {/* 2. Tabung*/}
      <View
        style={{
          backgroundColor: "darkred",
          width: 250,
          height: 80,
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: "white",
          }}
        >
          105841108222
        </Text>
      </View>

      {/* 3. Persegi Panjang*/}
      <View
        style={{
          backgroundColor: "darkblue",
          width: 280,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
          }}
        >
          YOGI A.AMMAH
        </Text>
      </View>
    </View>
  );
}