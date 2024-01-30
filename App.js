import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title="Car Location"
          />
        </MapView>
      </View>
      <View style={styles.bottomDrawer}>
        <Text style={styles.drawerText}>Car Instructions:</Text>
        <Text style={styles.drawerText}>- Keep a safe following distance.</Text>
        <Text style={styles.drawerText}>- Use turn signals.</Text>
        <Text style={styles.drawerText}>- Follow traffic rules.</Text>
        {/* Add more instructions as needed */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomDrawer: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5, // For Android elevation
  },
  drawerText: {
    fontSize: 16,
    // marginBottom: 10,
    borderRadius: 65,
  },
});
