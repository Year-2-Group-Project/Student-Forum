import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View, Button, CheckBox } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";
import { userID } from "./login";
import { subforumID } from "./home";

export default function createPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = () => {
    const currentDateTime = require("moment")().format("YYYY-MM-DD HH:mm:ss");
    axios
      .post("https://group-project-sql.herokuapp.com/post/create", {
        title: title,
        content: content,
        currentDateTime: currentDateTime,
        userID: userID,
        subforumID: subforumID,
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
        placeholder="Text"
        onChangeText={(text) => setContent(text)}
      />
      <Button title="Create Post" onPress={createPost} />
      <StatusBar style="auto" />
    </View>
  );
}
