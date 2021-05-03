import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Button, TouchableOpacity } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";
import { Card } from "react-native-elements";

var subforumID;
var subforumTitle;

export default function HomePage({ navigation }) {
  const [subforums, setSubforums] = useState([]);

  axios
    .get("http://localhost:19007/subforums", {
      headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
    })
    .then((res) => {
      setSubforums(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  function subOnPress(sub) {
    subforumTitle = sub["Sub_title"];
    subforumID = sub["Sub_ID"];
    console.log(subforumID);
    console.log(subforumTitle);
    navigation.navigate("Subforum");
  }

  return (
    <View style={styles.container}>
      {subforums.map((subforum) => (
        <TouchableOpacity onPress={() => subOnPress(subforum)}>
          <Card>
            <Card.Title>{subforum["Sub_title"]}</Card.Title>
            <Card.Divider />
            <Card.Title>{subforum["Sub_description"]}</Card.Title>
          </Card>
        </TouchableOpacity>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}
export { subforumID };
