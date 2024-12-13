import React from "react";
//import { BASE_URI } from "@env";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";

export default function App() {
  //console.log("BASE_URI", BASE_URI);
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "http://192.168.0.152:3000" }} // Replace with your web app URL
        style={{ flex: 1 }}
      />
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // Adjust for status bar if necessary
  },
});
