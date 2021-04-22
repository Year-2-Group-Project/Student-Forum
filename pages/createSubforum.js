import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";

export default function createSubforumPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const executeCreate = () => {
    axios
      .post("https://group-project-sql.herokuapp.com/subforum/create", {
        title: title,
        description: description,
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then(() => {
        console.log("Submit post successful");
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
      <Button title="Create SubForum" onPress={executeCreate} />
      <StatusBar style="auto" />
    </View>
  );
}
