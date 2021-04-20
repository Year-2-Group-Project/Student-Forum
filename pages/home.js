import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";

export default function HomePage({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = () => {
    axios
      .post("https://group-project-sql.herokuapp.com/submit", {
        title: title,
        content: content,
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
        placeholder="Post content"
        onChangeText={(text) => setContent(text)}
      />
      <Button title="Create Post" onPress={createPost} />
      <Button
        title="Create SubForum"
        onPress={() => navigation.navigate("CreateSubforum")}
      />
      <StatusBar style="auto" />
    </View>
  );
}
