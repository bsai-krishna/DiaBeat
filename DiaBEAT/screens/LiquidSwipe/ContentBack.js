import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  title1: {
    fontSize: 48,
    fontWeight: "300"
  },
  title2: {
    fontSize: 48,
    fontWeight: "600"
  },
  description: {
    opacity: 0.5,
    fontSize: 24
  }
});

export default ({ color, backgroundColor, source, title1, title2 }) => {
  return (
    <ScrollView
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor,
        width,
        height,
        marginTop: 50
      }}
    >
      <Image {...{ source }} style={{ width, height: height * 0.6 }} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 32
        }}
      >
        <Text style={[styles.title1, { color }]}>{title1}</Text>
        <Text style={[styles.title2, { color }]}>{title2}</Text>
      </View>
    </ScrollView>
  );
};
