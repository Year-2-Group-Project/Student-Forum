import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View, Button, CheckBox } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";

export default function createSubforumPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setSelection] = useState(false);

  const executeCreate = () => {
    axios
      .post("http://localhost:19007/subforum/create", {
        title: title,
        description: description,
        isPrivate: isPrivate,
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
