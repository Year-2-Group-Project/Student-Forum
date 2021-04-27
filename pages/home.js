import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button, TouchableOpacity } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";
import { Card } from "react-native-elements";

export default function HomePage({ navigation }) {
  const [subforums, setSubforums] = useState([]);

  const showSubforums = () => {
    axios
      .get("https://group-project-sql.herokuapp.com/subforums", {
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then((res) => {
        setSubforums(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {subforums.map((subforum) => (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Card>
            <Card.Title>{subforum["Sub_title"]}</Card.Title>
            <Card.Divider />
            <Card.Title>{subforum["Sub_description"]}</Card.Title>
          </Card>
        </TouchableOpacity>
      ))}
      <Button title="Log In" onPress={showSubforums} />
      <StatusBar style="auto" />
    </View>
  );
}
