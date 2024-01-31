import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        console.error("Error getting location:", error);
        setErrorMsg("Error getting location");
      }
    })();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      (async () => {
        try {
          const currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
        } catch (error) {
          console.error("Error getting location:", error);
          setErrorMsg("Error getting location");
        }
      })();
    }, 5000); // Update location every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  let vehicleDetails = {
    name: "My Car",
    model: "XYZ",
    owner: "John Doe",
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Current Location"
            />
          </MapView>
        )}
      </View>
      <View style={styles.lowerHalf}>
        <View style={styles.vehicleDetails}>
          <Text style={styles.detailLabel}>
            Vehicle Name:{" "}
            <Text style={styles.detailValue}>{vehicleDetails.name}</Text>
          </Text>

          <Text style={styles.detailLabel}>
            Vehicle Model:{" "}
            <Text style={styles.detailValue}>{vehicleDetails.model}</Text>
          </Text>

          <Text style={styles.detailLabel}>
            Owner:{" "}
            <Text style={styles.detailValue}>{vehicleDetails.owner}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  upperHalf: {
    flex: 0.7,
  },
  lowerHalf: {
    flex: 0.3,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#eff1ed",
    paddingRight: 10,
    paddingLeft: 10,
    top: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  vehicleDetails: {
    backgroundColor: "#bcbd8b",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#bcbd8b",
    color: "#eff1ed",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#eff1ed",
  },
  detailValue: {
    fontSize: 16,
    color: "#eff1ed",
    marginBottom: 15,
  },
});
