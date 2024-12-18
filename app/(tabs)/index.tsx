import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { Camera } from "expo-camera";

const App: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = (e: any) => {
    console.error("WebView Error: ", e);
    setError("Error loading web page");
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
    console.log("WebView loaded successfully");
  };

  useEffect(() => {
    (async () => {
      // Request camera permissions
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    // Hide the navigation bar
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to the camera. Please enable permissions in settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text>{error}</Text>}
      <WebView
        source={{ uri: "https://8342-49-206-33-140.ngrok-free.app" }} // Use ngrok or your local IP
        style={styles.webview}
        onError={handleError}
        onLoad={handleLoad}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        // Enable camera access within WebView (if needed)
        originWhitelist={['*']}
      />
      <StatusBar hidden={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  webview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default App;
