import React from "react";
import { StyleSheet, Image, SafeAreaView } from "react-native";
import Box from "../assets/box.png";

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image source={Box} resizeMode="contain" style={{ height: 50 }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default Header;