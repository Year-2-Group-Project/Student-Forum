import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";
import { Card, Icon, Button } from "react-native-elements";
import { subforumID } from "./home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

export default function ThreadPage({ navigation }) {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  axios
    .post("https://group-project-sql.herokuapp.com/getThreadPost", {
      subforumID: subforumID,
      headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
    })
    .then((res) => {
      // res.data should be all posts from specific subforum
      setPost(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  const commentOnPress = () => {
    navigation.navigate("Thread");
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardPosition}>
        <View style={styles.card}>
          <Card>
            <Text style={{ fontSize: 13, color: "grey", fontWeight: "500" }}>
              Subforum Title
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 13, color: "grey" }}>Username •</Text>
              <Text style={{ fontSize: 13, color: "grey" }}>
                {" "}
                Time Uploaded
              </Text>
            </View>
            <Card.Divider></Card.Divider>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Post Title</Text>
            <Text style={{ fontSize: 13 }}>Post Content</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.button} onPress={commentOnPress}>
                <Text>
                  <MaterialCommunityIcons
                    name="comment-text-outline"
                    size={15}
                    color="black"
                  />{" "}
                  Comments
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={commentOnPress}>
                <Text>
                  {" "}
                  <Ionicons name="flag-sharp" size={15} color="black" /> Report
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
          <StatusBar style="auto" />
        </View>
      </View>
    </View>
  );
}
