"use strict";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEFA",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#87CEFA",
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 10,
  },
  card: {
    width: width <= 400 ? "80%" : "80%",
    aspectRatio: 1,
    // flexShrink: 1
    // width: "80%",
  },
  cardPosition: {
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "lightgrey",
    marginTop: 5,
    textAlign: "center",
    width: "50%",
  },
});
