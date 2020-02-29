import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

import Main from "./Main";

export default class HomeScreen extends Component {
  render() {
    return <Main {...this.props} />;
  }
}

const styles = StyleSheet.create({});

HomeScreen.navigationOptions = {
  header: null
};
