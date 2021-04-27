import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";
import { Card } from "react-native-elements";

export default function SubforumPage() {
  const [posts, setPosts] = useState([]);

  const showPosts = () => {
    axios
      .get("https://group-project-sql.herokuapp.com/posts", {
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {posts.map((post) => (
        <Card>
          <Card.Title>{post["Post_title"]}</Card.Title>
          <Card.Divider />
          <Card.Title>{post["Post_content"]}</Card.Title>
          <Card.Divider />
          <Card.Title>{post["Post_date"]}</Card.Title>
        </Card>
      ))}
      <Button title="Log In" onPress={showPosts} />
      <StatusBar style="auto" />
    </View>
  );
}
