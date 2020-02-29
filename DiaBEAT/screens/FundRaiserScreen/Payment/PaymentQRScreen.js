import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  BackHandler,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import querystring from "querystring";

const { height, width } = Dimensions.get("window");
import Button from "./Button";

export default class App extends React.Component {
  state = {
    scanned: null,
    hasPermission: null,
    loading: false,
    vendor_id: null,
    amount: "0"
  };

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({
      hasPermission: status === "granted"
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      loading: true
    });

    console.log(type, data);

    let res_history = await axios.get(
      "https://stormy-reaches-07388.herokuapp.com/transaction?id=" +
        this.props.navigation.getParam("key") +
        "&amount=" +
        this.state.amount +
        "200000"
    );
    this.setState({ loading: false });
    alert(`Donation Successfull, Thank you!`);

    this.props.navigation.navigate("WalletScreen");
  };
  handlePayment = async () => {
    this.setState({
      loading: true
    });
    console.log(
      "https://stormy-reaches-07388.herokuapp.com/transaction?id=" +
        this.props.navigation.getParam("key") +
        "&amount=" +
        this.state.amount
    );
    let res_history = await axios.get(
      "https://stormy-reaches-07388.herokuapp.com/transaction?id=" +
        this.props.navigation.getParam("key") +
        "&amount=" +
        this.state.amount
    );
    this.setState({ loading: false });
    alert(`Payment Successfull`);

    this.props.navigation.navigate("WalletScreen");
  };

  render() {
    let { hasPermission, scanned } = this.state;
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 4,
            paddingTop: 40
          }}
        >
          <Text
            style={{
              fontSize: 28,
              paddingHorizontal: 20
            }}
          >
            Send Money
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Enter Amount"
            placeholderTextColor="grey"
            keyboardType="numeric"
            onChangeText={amount => this.setState({ amount })}
            style={{
              fontWeight: "700",
              borderRadius: 20,
              height: 50,
              paddingHorizontal: 20,
              fontSize: 20,
              marginTop: 20
            }}
          />
          <Button gradient onPress={() => this.handlePayment()}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                Pay
              </Text>
            )}
          </Button>
        </View>
        <Text
          style={{
            fontSize: 18,
            position: "absolute",
            top: height * 0.45,
            zIndex: 2,
            textAlign: "center",
            color: "white",
            width
          }}
        >
          Scan your Crypto Wallet QR
        </Text>
        <View
          style={{
            position: "absolute",
            top: height * 0.5,
            zIndex: 2,
            borderWidth: 2,
            borderColor: "#fff",
            height: 200,
            width: 200,
            left: width / 2 - 100
          }}
        ></View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{ flex: 6, width }}
        />
      </View>
    );
  }
}

App.navigationOptions = {
  header: null
};
