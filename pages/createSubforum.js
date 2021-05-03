import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View, Button, CheckBox } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";
import { userID } from "./login";

var subforum_id;

export default function createSubforumPage({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setSelection] = useState(false);

  const executeCreate = () => {
    axios
      .post("https://group-project-sql.herokuapp.com/subforum/create", {
        title: title,
        description: description,
        isPrivate: isPrivate,
        userID: userID,
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then(() => {
        console.log("Submit post successful");
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("https://group-project-sql.herokuapp.com/subforum/getsubID", {
        title: title,
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then((res) => {
        subforum_id = res.data[0]["Sub_ID"];
        console.log("Sub ID: " + res.data[0]["Sub_ID"]);
        president();
      })
      .catch((err) => {
        console.log(err);
      });

    navigation.navigate("Home");
  };

  const president = () => {
    axios
      .post("https://group-project-sql.herokuapp.com/subforum/subPresident", {
        subforum_id: subforum_id,
        userID: userID,
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then((res) => {
        console.log("Succesfully completed.");
        console.log(subforum_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Post description"
        onChangeText={(text) => setDescription(text)}
      />
      <CheckBox
        value={isPrivate}
        onValueChange={setSelection}
        style={styles.checkbox}
      />
      <Text>Subforum Private: {isPrivate ? "👍" : "👎"}</Text>
      <Button title="Create SubForum" onPress={executeCreate} />
      <StatusBar style="auto" />
    </View>
  );
}
