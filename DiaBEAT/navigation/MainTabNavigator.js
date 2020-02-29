import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import FundRaiserScreen from "../screens/FundRaiserScreen";
import NearbyScreen from "../screens/NearbyScreen";
import Details from "../screens/HomeScreen/Details";
import LiquidSwipe from "../screens/LiquidSwipe";
import WalletScreen from "../screens/FundRaiserScreen/Payment";
import PaymentQRScreen from "../screens/FundRaiserScreen/Payment/PaymentQRScreen";
import Report from "../screens/HomeScreen/Report";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: Details,
    Report: Report
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />
};

HomeStack.path = "";

const FundRaiserStack = createStackNavigator(
  {
    FundRaiser: FundRaiserScreen,
    LiquidSwipe: LiquidSwipe,
    WalletScreen: WalletScreen,
    PaymentQRScreen: PaymentQRScreen
  },
  config
);

FundRaiserStack.navigationOptions = {
  tabBarLabel: "Fund Raiser",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-trending-up" />
  )
};

FundRaiserStack.path = "";

const NearbyStack = createStackNavigator(
  {
    Nearby: NearbyScreen
  },
  config
);

NearbyStack.navigationOptions = {
  tabBarLabel: "Near You",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-navigate" />
  )
};

NearbyStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  FundRaiserStack,
  NearbyStack
});

tabNavigator.path = "";

export default tabNavigator;
