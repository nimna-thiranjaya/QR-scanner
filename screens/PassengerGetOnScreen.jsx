import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";

import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";

const PassengerGetOnScreen = () => {
  const [value, setValue] = useState(null);
  const [getOnBusHolt, setgetOnBusHolt] = useState("");
  const [getOffBusHolt, setgetOffBusHolt] = useState("");
  const [data, setData] = useState([]);
  const [cardVisible, setcardVisible] = useState(false);
  const [getOnBusHoltName, setgetOnBusHoltName] = useState("");
  const [getOffBusHoltName, setgetOffBusHoltName] = useState("");
  const [travelCost, settravelCost] = useState(null);

  const route = useRoute();

  console.log(route.params.QRdata);

  useEffect(() => {
    const getHolts = async () => {
      await axios
        .get(
          "https://ticketing-backend.azurewebsites.net/api/helper/getHoltsInRote/1"
        )
        .then((res) => {
          if (res.data.status) {
            temp = [];
            for (var i = 0; i < res.data.holts.length; i++) {
              var data = {
                label: res.data.holts[i].holtName,
                value: res.data.holts[i].holtId,
              };
              temp.push(data);
            }
            //console.log(temp);
            setData(temp);
          } else {
            console.log(res.data.message);
          }
        });
    };
    getHolts();
  }, []);

  //console.log(data);

  // console.log("getOnBusHolt : ", getOnBusHolt);
  // console.log("getOffBusHolt : ", getOffBusHolt);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  const calculateFare = (totalLength) => {
    if (totalLength <= 5) {
      return 30;
    } else {
      return 30 + (totalLength - 5) * 3;
    }
  };

  const onSubmite = () => {
    if (getOnBusHolt === "" || getOffBusHolt === "") {
      return Alert.alert("Please Select Both Bus Holts");
    } else {
      setcardVisible(true);
      var totalLength = Math.abs((getOffBusHolt - getOnBusHolt) * 4);
      settravelCost(calculateFare(totalLength));
    }
  };

  const onGetOn = () => {
    return Alert.alert(
      "Are your sure?",
      "Is This passenger going to get on the bus ?",
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
  return (
    <View style={styles.container}>
      <Text>{route.params.QRdata}</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Add Travel Details</Title>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Get on Bus Stop"
            searchPlaceholder="Search..."
            statusBarIsTranslucent={true}
            value={value}
            renderItem={renderItem}
            onChange={(item) => {
              setgetOnBusHolt(item.value);
              setgetOnBusHoltName(item.label);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Get off Bus Stop"
            searchPlaceholder="Search..."
            value={value}
            renderItem={renderItem}
            statusBarIsTranslucent={true}
            onChange={(item) => {
              setgetOffBusHolt(item.value);
              setgetOffBusHoltName(item.label);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
          />
        </Card.Content>
        <Card.Actions style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.buttonok} onPress={onSubmite}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
      {cardVisible ? (
        <View>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>Travel Details</Title>
              <View style={styles.cardContent}>
                <Text style={styles.travelText}>
                  Get On Holt : {getOnBusHoltName}
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.travelText}>
                  Get Off Holt : {getOffBusHoltName}
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.travelText}>
                  Travel Cost : {travelCost}
                </Text>
              </View>
            </Card.Content>
            <Card.Actions style={styles.buttoncontainer}>
              <TouchableOpacity style={styles.buttonok} onPress={onGetOn}>
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        </View>
      ) : null}
    </View>
  );
};

export default PassengerGetOnScreen;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  travelText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  cardContent: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonok: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  card: {
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 20,
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderColor: "#FFBC26",
    borderWidth: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
