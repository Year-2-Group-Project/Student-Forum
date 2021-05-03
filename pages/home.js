import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";
import { Card, Button } from "react-native-elements";

var subforumID;
var subforumTitle;

export default function HomePage({ navigation }) {
  const [subforums, setSubforums] = useState([]);

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

  function subOnPress(sub) {
    subforumTitle = sub["Sub_title"];
    subforumID = sub["Sub_ID"];
    console.log(subforumID);
    console.log(subforumTitle);
    navigation.navigate("Subforum");
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 10 }}>
        <Button
          title="Create Subforum"
          onPress={() => navigation.navigate("CreateSubforum")}
        />
      </View>
      <View style={styles.card}>
        {subforums.map((subforum) => (
          <TouchableOpacity onPress={() => subOnPress(subforum)}>
            <Card>
              <Card.Title>{subforum["Sub_title"]}</Card.Title>
              <Card.Divider />
              <Card.Title>{subforum["Sub_description"]}</Card.Title>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
      <StatusBar style="auto" Title="hello " />
    </View>
  );
}
export { subforumID };
