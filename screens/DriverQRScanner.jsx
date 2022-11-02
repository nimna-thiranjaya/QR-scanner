import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/core";

export default function DriverQRScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Waiting for QR code");
  const [QRdata, setQRdata] = useState("");

  const navigation = useNavigation();

  const UserGetonBtnClick = () => {
    navigation.navigate("Passenger Get On", { QRdata });
  };

  const userGetoff = () => {
    return Alert.alert(
      "Are your sure?",
      "Is This passenger going to get off the bus ?",
      [
        {
          text: "Yes",
          onPress: () => {
            console.log("Yes button pressed");
          },
        },
        {
          text: "No",
          onPress: () => {
            console.log("No button pressed");
          },
        },
      ]
    );
  };
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText("QR code scanned");
    setQRdata(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setText("Waiting for QR code");
    setQRdata("");
  };
  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>Scan Paasenger Smart Card From Here</Text>
      <Text style={styles.qrTextStatus}>{text}</Text>
      {scanned && (
        <View>
          <Button
            title={"Scan again?"}
            onPress={handleScanAgain}
            color="tomato"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={UserGetonBtnClick}
              style={[styles.button, styles.buttonOutliner]}
            >
              <Text style={styles.buttonText}>Get on the Bus</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={userGetoff}
              style={[styles.button, styles.buttonOutliner]}
            >
              <Text style={styles.buttonOutlineText}>Get off the Bus</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    marginTop: 20,
    fontSize: 16,
    margin: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  qrTextStatus: {
    marginTop: 10,
    fontSize: 16,
    margin: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#FFBC26",
    borderColor: "#FFBC26",
    borderWidth: 4,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutliner: {
    backgroundColor: "#FFBC26",
    marginTop: 10,
    borderColor: "black",
    borderWidth: 2,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "balck",
    fontWeight: "700",
    fontSize: 16,
  },
});
