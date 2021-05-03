"use strict";
import { StyleSheet } from "react-native";

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
    width: "40%",
  },
  cardHeader: {
    fontSize: 13,
    color: "grey",
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
  statusText: {
    fontWeight: 'bold',
    color: 'red'
  },
});
