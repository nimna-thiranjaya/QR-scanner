import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";

const PassengerGetOnScreen = () => {
  const [value, setValue] = useState(null);
  const [getOnBusHolt, setgetOnBusHolt] = useState("");
  const [getOffBusHolt, setgetOffBusHolt] = useState("");
  const [data, setData] = useState([]);

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
            console.log(temp);
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
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default PassengerGetOnScreen;

const styles = StyleSheet.create({
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
