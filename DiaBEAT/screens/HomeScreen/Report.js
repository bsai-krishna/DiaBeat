import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Divider } from "react-native-elements";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default class Report extends Component {
  raiseRequest = async () => {
    await axios.get(
      "https://stormy-reaches-07388.herokuapp.com/newfundraiser?name=" +
        this.props.navigation.getParam("name") +
        "&amount=" +
        "100000"
    );
    this.props.navigation.navigate("FundRaiser");
  };

  render() {
    console.log(this.props.cancer_prob);
    return (
      <View
        style={{
          width: width * 0.8,
          flex: 1,
          justifyContent: "center",
          alignSelf: "center"
        }}
      >
        <Image
          style={{ height: 60, width: 60 }}
          source={require("../../assets/images/logo.png")}
        />
        <Divider
          style={{
            backgroundColor: "grey",
            height: 2,
            marginBottom: 20,
            marginTop: 20
          }}
        />
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20
            }}
          >
            Hypertext Assassins Lab
          </Text>
          <Text>JIIT Noida</Text>
          <Text
            style={{
              marginTop: 20,
              fontWeight: "bold",
              fontSize: 14
            }}
          >
            Diabetic Retinopathy Report for Patient{" "}
            {this.props.navigation.getParam("name")}
          </Text>
        </View>
        <Divider
          style={{
            backgroundColor: "grey",
            height: 2,
            marginBottom: 20,
            marginTop: 20
          }}
        />
        <View>
          <View
            style={{
              alignItems: "flex-start"
            }}
          >
            <Text
              style={{
                fontSize: 18
              }}
            >
              Clinical Diagnosis:{" "}
              <Text
                style={{
                  fontWeight: "bold"
                }}
              >
                {parseFloat(this.props.navigation.getParam("cancer_prob")) > 60
                  ? "Cancer Detected"
                  : "Cancer Not Detected"}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 15
              }}
            >
              Date of birth: 01-08-1998
            </Text>
          </View>
          <Divider
            style={{
              backgroundColor: "grey",
              height: 2,
              marginBottom: 20,
              marginTop: 20
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 20
            }}
          >
            Treatment Cost: $100000
          </Text>
          {parseFloat(this.props.navigation.getParam("cancer_prob")) > 60 && (
            <TouchableOpacity
              style={{
                backgroundColor: "#eee",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20
              }}
              onPress={() => {
                this.raiseRequest();
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  alignSelf: "center",
                  padding: 20,
                  fontSize: 20
                }}
              >
                Dont have funds!?
              </Text>
            </TouchableOpacity>
          )}
          <Divider
            style={{
              backgroundColor: "transparent",
              height: 2,
              marginBottom: 20,
              marginTop: 20
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

Report.navigationOptions = {
  header: null
};
