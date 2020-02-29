import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Dimensions
} from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ListItem } from "react-native-elements";
import axios from "axios";

const { height, width } = Dimensions.get("window");

export default class index extends Component {
  state = {
    money: null,
    loading: true,
    res_history: null
  };

  update = async () => {
    let res = await axios.get(
      "https://stormy-reaches-07388.herokuapp.com/getbalance"
    );
    let res_history = await axios.get(
      "https://stormy-reaches-07388.herokuapp.com/history"
    );

    let data = [];
    Object.keys(res_history.data).forEach(key => {
      data.push({
        amount: res_history.data[key].details.from,
        given_to: res_history.data[key].details.to,
        type: res_history.data[key].details.status
      });
    });
    console.log("updating");
    this.setState({
      money: res.data.balance,
      loading: false,
      res_history: data
    });
  };
  async componentDidMount() {
    this.setState({
      loading: true
    });

    let res = await axios.get(
      "https://stormy-reaches-07388.herokuapp.com/getbalance"
    );
    let res_history = await axios.get(
      "https://stormy-reaches-07388.herokuapp.com/history"
    );
    setInterval(() => {
      this.update();
    }, 10000);
    let data = [];
    Object.keys(res_history.data).forEach(key => {
      data.push({
        amount: res_history.data[key].details.from,
        given_to: res_history.data[key].details.to,
        type: res_history.data[key].details.status
      });
    });
    this.setState({
      money: res.data.balance,
      loading: false,
      res_history: data
    });
  }
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <LinearGradient
          start={[0, 0]}
          end={[1, 0]}
          colors={["#429dd3", "#9c6fe9"]}
        >
          <View
            style={{
              height: height / 3,
              width,
              paddingTop: Constants.statusBarHeight
            }}
          >
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "#eee",
                  textAlign: "center",
                  fontFamily: "monti",
                  fontWeight: "bold"
                }}
              >
                WALLET
              </Text>
            </View>
            <View
              style={{
                flex: 4,
                paddingHorizontal: 40
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: "monti"
                }}
              >
                YOUR BALANCE
              </Text>
              {this.state.loading && <ActivityIndicator size="small" />}
              {!this.state.loading && (
                <Text
                  style={{
                    fontSize: 55,
                    color: "white",
                    fontWeight: "300",
                    fontFamily: "monti"
                  }}
                >
                  ₹{this.state.money}
                </Text>
              )}
            </View>
          </View>
        </LinearGradient>
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              height: 100,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <LinearGradient
                start={[0, 0]}
                end={[1, 0]}
                colors={["#429dd3", "#9c6fe9"]}
                style={{
                  borderRadius: 30
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 25,
                    shadowOffset: { width: 2, height: 2 },
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                    borderRadius: 30
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("PaymentQRScreen", {
                      key: this.props.navigation.getParam("key")
                    })
                  }
                >
                  <Ionicons
                    style={{
                      color: "#eee"
                    }}
                    size={30}
                    name="ios-arrow-up"
                  />
                  <Text
                    style={{
                      fontFamily: "monti",
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#eee"
                    }}
                  >
                    {"  "}PAY
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <LinearGradient
                start={[0, 0]}
                end={[1, 0]}
                colors={["#429dd3", "#9c6fe9"]}
                style={{
                  borderRadius: 30
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 25,
                    shadowOffset: { width: 2, height: 2 },
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                    borderRadius: 30
                  }}
                  onPress={() => this.props.navigation.navigate("CardInput")}
                >
                  <Ionicons
                    style={{
                      color: "#eee"
                    }}
                    size={30}
                    name="ios-add"
                  />
                  <Text
                    style={{
                      fontFamily: "monti",
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#eee"
                    }}
                  >
                    {"  "}ADD
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          {/* Pay and add ends here */}
          <ScrollView>
            {!this.state.res_history && (
              <ActivityIndicator
                size="small"
                style={{
                  marginTop: 20
                }}
              />
            )}
            {this.state.res_history &&
              this.state.res_history.reverse().map((item, i) => (
                <ListItem
                  key={i}
                  subtitle={`₹${item.amount}`}
                  title={`${item.given_to}`}
                  leftIcon={{
                    name: item.type == false ? "add" : "remove",
                    color: item.type == false ? "green" : "red"
                  }}
                  bottomDivider
                  chevron
                  subtitleStyle={{
                    color: item.type == false ? "green" : "red",
                    fontFamily: "monti"
                  }}
                  titleStyle={{
                    fontFamily: "monti",
                    fontWeight: "bold"
                  }}
                  containerStyle={{
                    width
                  }}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

index.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({});
